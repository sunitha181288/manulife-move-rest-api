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
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const producer_config_1 = require("../events/producers/producer.config");
const topic_constant_1 = require("../constants/topic.constant");
let KafkaService = class KafkaService {
    async connect(topic) {
        this.client.subscribeToResponseOf(topic);
        await this.client.connect();
    }
    sendTopic(topic, payload) {
        return this.client.send(topic, payload);
    }
};
__decorate([
    microservices_1.Client(Object.assign({ transport: microservices_1.Transport.KAFKA }, producer_config_1.PRODUCER_CONFIG)),
    __metadata("design:type", microservices_1.ClientKafka)
], KafkaService.prototype, "client", void 0);
KafkaService = __decorate([
    common_1.Injectable()
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map