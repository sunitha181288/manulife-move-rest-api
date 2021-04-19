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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const microservices_1 = require("@nestjs/microservices");
const sales_service_1 = require("../services/sales.service");
const kafka_service_1 = require("../services/kafka.service");
const sales_model_1 = require("../models/sales.model");
const upload_config_1 = require("../configs/upload.config");
const topic_constant_1 = require("../constants/topic.constant");
let SalesController = class SalesController {
    constructor(salesService, kafkaService) {
        this.salesService = salesService;
        this.kafkaService = kafkaService;
    }
    async onModuleInit() {
        this.kafkaService.connect(topic_constant_1.TOPICS.SALES_RECORD);
    }
    async saveRecord(file) {
        if (!file) {
            throw new common_1.HttpException(`File is missing`, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.kafkaService.sendTopic(topic_constant_1.TOPICS.SALES_RECORD, file);
    }
    getReports(query) {
        return this.salesService.getRecords(query);
    }
    subscribeSalesRecordTopic(message) {
        this.salesService.processSalesRecord(message.value);
    }
};
__decorate([
    common_1.Post('/record'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', upload_config_1.uploadOptions)),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "saveRecord", null);
__decorate([
    common_1.Get('/report'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sales_model_1.SalesReportDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getReports", null);
__decorate([
    microservices_1.MessagePattern(topic_constant_1.TOPICS.SALES_RECORD),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "subscribeSalesRecordTopic", null);
SalesController = __decorate([
    common_1.Controller('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService,
        kafka_service_1.KafkaService])
], SalesController);
exports.SalesController = SalesController;
//# sourceMappingURL=sales.controller.js.map