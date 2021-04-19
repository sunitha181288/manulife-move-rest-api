"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SalesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const nest_csv_parser_1 = require("nest-csv-parser");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sales_model_1 = require("../models/sales.model");
const sales_schema_1 = require("../schemas/sales/sales.schema");
let SalesService = SalesService_1 = class SalesService {
    constructor(salesDocModel, csvParser) {
        this.salesDocModel = salesDocModel;
        this.csvParser = csvParser;
        this.logger = new common_1.Logger(SalesService_1.name);
    }
    async getRecords(params) {
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
        }
        else if (startDate && !endDate) {
            query = {
                lastPurchaseDate: {
                    $gte: startDate,
                },
            };
        }
        else if (!startDate && endDate) {
            query = {
                lastPurchaseDate: {
                    $lte: endDate,
                },
            };
        }
        return this.salesDocModel.find(query).exec();
    }
    async processSalesRecord(file) {
        try {
            const parsedData = await this.parseCSVRecords(file.path);
            const salesRecords = parsedData.list.map((item) => {
                return this.saveRecord(item);
            });
            Promise.all(salesRecords).then(() => {
                this.logger.log('Sales Record Sync Sucessfully');
            }, (err) => {
                this.logger.error(`Error while sync :: ${err}`);
            });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async parseCSVRecords(filePath) {
        const directoryName = process.mainModule.path;
        const appRoot = directoryName.substr(0, directoryName.lastIndexOf('/') + 1);
        const fullFilePath = `${appRoot}/${filePath}`;
        const stream = fs_1.createReadStream(fullFilePath);
        return this.csvParser.parse(stream, sales_model_1.SalesRecordDto).then((result) => {
            fs_1.unlink(fullFilePath, (error) => {
                if (error) {
                    this.logger.error(`Error while deleting csv file :: ${error}`);
                }
            });
            return result;
        }, (err) => {
            this.logger.error(`Error while parse csv file :: ${err}`);
            return err;
        });
    }
    saveRecord(item) {
        const rowData = this.getRowData(item);
        const salesRecord = new sales_model_1.SalesRecordDto();
        salesRecord.userName = rowData['USER_NAME'];
        salesRecord.age = Number(rowData['AGE']);
        salesRecord.height = Number(rowData['HEIGHT']);
        salesRecord.gender = rowData['GENDER'];
        salesRecord.saleAmount = Number(rowData['SALE_AMOUNT']);
        salesRecord.lastPurchaseDate = new Date(rowData['LAST_PURCHASE_DATE']);
        const salesRecordModel = new this.salesDocModel(salesRecord);
        return salesRecordModel.save();
    }
    getRowData(rowItem) {
        const record = {};
        const rowkey = Object.keys(rowItem)[0];
        const headers = rowkey.split(',');
        const records = rowItem[rowkey].split(',');
        headers.map((headerTitle, index) => {
            record[headerTitle] = records[index];
        });
        return record;
    }
};
SalesService = SalesService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(sales_schema_1.SalesRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nest_csv_parser_1.CsvParser])
], SalesService);
exports.SalesService = SalesService;
//# sourceMappingURL=sales.service.js.map