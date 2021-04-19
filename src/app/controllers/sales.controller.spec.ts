import { Test } from '@nestjs/testing';
import { SalesModule } from '@modules/sales.module';
import { CsvModule } from 'nest-csv-parser';
import { SalesController } from '@controllers/sales.controller';
import { SalesService } from '@services/sales.service';
import { KafkaService } from '@services/kafka.service';
import { SalesRecord, SalesRecordSchema } from '@schemas/sales/sales.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { environment } from '@environments/environment';

describe('UserController', () => {
  let app: INestApplication;
  let controller: SalesController;
  let salesService: SalesService;
  let kafkaService: KafkaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SalesModule,
        CsvModule,
        MongooseModule.forRoot(environment.DB_CLIENT_URI),
        MongooseModule.forFeature([
          {
            name: SalesRecord.name,
            schema: SalesRecordSchema,
          },
        ]),
      ],
      controllers: [SalesController],
      providers: [SalesService, KafkaService],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    salesService = module.get<SalesService>(SalesService);
    kafkaService = module.get<KafkaService>(KafkaService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Sales Service should be defined', () => {
    expect(salesService).toBeDefined();
  });

  it('Kafka Service should be defined', () => {
    expect(kafkaService).toBeDefined();
  });
});
