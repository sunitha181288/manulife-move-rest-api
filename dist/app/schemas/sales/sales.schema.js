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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRecordSchema = exports.SalesRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SalesRecord = class SalesRecord {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], SalesRecord.prototype, "userName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], SalesRecord.prototype, "age", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], SalesRecord.prototype, "height", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], SalesRecord.prototype, "gender", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], SalesRecord.prototype, "sale", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], SalesRecord.prototype, "amount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], SalesRecord.prototype, "lastPurchaseDate", void 0);
SalesRecord = __decorate([
    mongoose_1.Schema()
], SalesRecord);
exports.SalesRecord = SalesRecord;
exports.SalesRecordSchema = mongoose_1.SchemaFactory.createForClass(SalesRecord);
//# sourceMappingURL=sales.schema.js.map