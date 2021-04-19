import { IsOptional, IsDateString } from 'class-validator';

export class SalesReportDto {
  @IsOptional()
  @IsDateString()
  startDate: string;
  @IsOptional()
  @IsDateString()
  endDate: string;
}

export class SalesRecordDto {
  userName: string;
  age: number;
  height: number;
  gender: string;
  sale: number;
  saleAmount: number;
  lastPurchaseDate: Date;
}
