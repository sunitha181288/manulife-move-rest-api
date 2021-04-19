import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalesService } from '@services/sales.service';
import { KafkaService } from '@services/kafka.service';
import { SalesReportDto } from '@models/sales.model';
import { uploadOptions } from '@configs/upload.config';
import { TOPICS } from '@constants/topic.constant';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private kafkaService: KafkaService,
  ) { }

  async onModuleInit() {
    this.kafkaService.connect(TOPICS.SALES_RECORD);
  }

  /**
   * This Resource method is used to store the CSV file
   *  and send a message to kafka
   * @Param {file}
   */
  @Post('/record')
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  async saveRecord(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(`File is missing`, HttpStatus.BAD_REQUEST);
    }
    return this.kafkaService.sendTopic(TOPICS.SALES_RECORD, file);
  }

  /**
   * This Resource method is used to get Reports based on the request
   * @Param {startDate}
   * @Param {endDate}
   */
  @Get('/report')
  getReports(@Query() query: SalesReportDto) {
    return this.salesService.getRecords(query);
  }

  /**
   * This method is used to listen the message for sales record topic
   */
  @MessagePattern(TOPICS.SALES_RECORD)
  subscribeSalesRecordTopic(@Payload() message) {
    this.salesService.processSalesRecord(message.value);
  }
}
