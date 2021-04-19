/// <reference types="multer" />
import { SalesService } from '@services/sales.service';
import { KafkaService } from '@services/kafka.service';
import { SalesReportDto } from '@models/sales.model';
export declare class SalesController {
    private readonly salesService;
    private kafkaService;
    constructor(salesService: SalesService, kafkaService: KafkaService);
    onModuleInit(): Promise<void>;
    saveRecord(file: Express.Multer.File): Promise<import("rxjs").Observable<any>>;
    getReports(query: SalesReportDto): Promise<import("../schemas/sales/sales.schema").SalesRecordDocument[]>;
    subscribeSalesRecordTopic(message: any): void;
}
