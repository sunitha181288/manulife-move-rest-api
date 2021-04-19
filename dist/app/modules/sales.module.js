"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const sales_controller_1 = require("../controllers/sales.controller");
const sales_service_1 = require("../services/sales.service");
const kafka_service_1 = require("../services/kafka.service");
const mongoose_1 = require("@nestjs/mongoose");
const nest_csv_parser_1 = require("nest-csv-parser");
const sales_schema_1 = require("../schemas/sales/sales.schema");
let SalesModule = class SalesModule {
};
SalesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: sales_schema_1.SalesRecord.name,
                    schema: sales_schema_1.SalesRecordSchema,
                },
            ]),
            nest_csv_parser_1.CsvModule,
        ],
        controllers: [sales_controller_1.SalesController],
        providers: [sales_service_1.SalesService, kafka_service_1.KafkaService],
    })
], SalesModule);
exports.SalesModule = SalesModule;
//# sourceMappingURL=sales.module.js.map