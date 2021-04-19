import { Document } from 'mongoose';
export declare type SalesRecordDocument = SalesRecord & Document;
export declare class SalesRecord {
    userName: string;
    age: number;
    height: number;
    gender: string;
    sale: number;
    amount: number;
    lastPurchaseDate: Date;
}
export declare const SalesRecordSchema: import("mongoose").Schema<Document<SalesRecord, {}>, import("mongoose").Model<any, any>, undefined>;
