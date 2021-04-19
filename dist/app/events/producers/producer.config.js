"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCER_CONFIG = void 0;
const environment_1 = require("../../../environments/environment");
exports.PRODUCER_CONFIG = {
    options: {
        client: {
            clientId: environment_1.environment.KAFKA_CLIENT_ID,
            brokers: [environment_1.environment.KAFKA_BROKER_URI],
        },
        consumer: {
            groupId: environment_1.environment.KAFKA_GROUP_ID,
        },
    },
};
//# sourceMappingURL=producer.config.js.map