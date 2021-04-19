import { CsvParser } from 'nest-csv-parser';
import { Model } from 'mongoose';
import { SalesRecordDocument } from '@schemas/sales/sales.schema';
export declare class SalesService {
    private readonly salesDocModel;
    private readonly csvParser;
    private readonly logger;
    constructor(salesDocModel: Model<SalesRecordDocument>, csvParser: CsvParser);
    getRecords(params: any): Promise<SalesRecordDocument[]>;
    processSalesRecord(file: any): Promise<void>;
    private parseCSVRecords;
    private saveRecord;
    private getRowData;
}
