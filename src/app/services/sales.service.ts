import { Logger, Injectable } from '@nestjs/common';
import { createReadStream, unlink } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalesRecordDto } from '@models/sales.model';
import { SalesRecord, SalesRecordDocument } from '@schemas/sales/sales.schema';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);
  constructor(
    @InjectModel(SalesRecord.name)
    private readonly salesDocModel: Model<SalesRecordDocument>,
    private readonly csvParser: CsvParser,
  ) { }

  /**
   * This method is used to query and fetch the records
   */
  public async getRecords(params) {
    let query;
    const startDate = params.startDate ? new Date(params.startDate) : null;
    const endDate = params.endDate ? new Date(params.endDate) : null;
    if (startDate && endDate) {
      query = {
        lastPurchaseDate: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else if (startDate && !endDate) {
      query = {
        lastPurchaseDate: {
          $gte: startDate,
        },
      };
    } else if (!startDate && endDate) {
      query = {
        lastPurchaseDate: {
          $lte: endDate,
        },
      };
    }
    return this.salesDocModel.find(query).exec();
  }

  /**
   * This method is used to process sales record CSV file
   * @Param {file}
   */
  public async processSalesRecord(file) {
    try {
      const parsedData = await this.parseCSVRecords(file.path);
      const salesRecords = parsedData.list.map((item) => {
        return this.saveRecord(item);
      });
      Promise.all(salesRecords).then(
        () => {
          this.logger.log('Sales Record Sync Sucessfully');
        },
        (err) => {
          this.logger.error(`Error while sync :: ${err}`);
        },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * This method is used to parse CSV records
   * @Param {filePath}
   */
  private async parseCSVRecords(filePath) {
    const directoryName = process.mainModule.path;
    const appRoot = directoryName.substr(0, directoryName.lastIndexOf('/') + 1);
    const fullFilePath = `${appRoot}/${filePath}`;
    const stream = createReadStream(fullFilePath);
    return this.csvParser.parse(stream, SalesRecordDto).then(
      (result) => {
        unlink(fullFilePath, (error) => {
          if (error) {
            this.logger.error(`Error while deleting csv file :: ${error}`);
          }
        });
        return result;
      },
      (err) => {
        this.logger.error(`Error while parse csv file :: ${err}`);
        return err;
      },
    );
  }

  /**
   * This method is used to save record to db
   */
  private saveRecord(item) {
    const rowData = this.getRowData(item);
    const salesRecord = new SalesRecordDto();
    salesRecord.userName = rowData['USER_NAME'];
    salesRecord.age = Number(rowData['AGE']);
    salesRecord.height = Number(rowData['HEIGHT']);
    salesRecord.gender = rowData['GENDER'];
    salesRecord.saleAmount = Number(rowData['SALE_AMOUNT']);
    salesRecord.lastPurchaseDate = new Date(rowData['LAST_PURCHASE_DATE']);
    const salesRecordModel = new this.salesDocModel(salesRecord);
    return salesRecordModel.save();
  }

  /**
   * This method is used to get row data from csv data
   */
  private getRowData(rowItem) {
    const record = {};
    const rowkey = Object.keys(rowItem)[0];
    const headers = rowkey.split(',');
    const records = rowItem[rowkey].split(',');
    headers.map((headerTitle, index) => {
      record[headerTitle] = records[index];
    });
    return record;
  }
}
