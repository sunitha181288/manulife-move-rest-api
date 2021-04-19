import { Module } from '@nestjs/common';
import { SalesController } from '@controllers/sales.controller';
import { SalesService } from '@services/sales.service';
import { KafkaService } from '@services/kafka.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from 'nest-csv-parser';
import { SalesRecord, SalesRecordSchema } from '@schemas/sales/sales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SalesRecord.name,
        schema: SalesRecordSchema,
      },
    ]),
    CsvModule,
  ],
  controllers: [SalesController],
  providers: [SalesService, KafkaService],
})
export class SalesModule { }
