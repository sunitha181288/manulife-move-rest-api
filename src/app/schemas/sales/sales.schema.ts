import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalesRecordDocument = SalesRecord & Document;

@Schema()
export class SalesRecord {
  @Prop()
  userName: string;
  @Prop()
  age: number;
  @Prop()
  height: number;
  @Prop()
  gender: string;
  @Prop()
  sale: number;
  @Prop()
  amount: number;
  @Prop()
  lastPurchaseDate: Date;
}

export const SalesRecordSchema = SchemaFactory.createForClass(SalesRecord);
