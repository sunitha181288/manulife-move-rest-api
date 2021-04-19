"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSUMER_CONFIG = void 0;
const environment_1 = require("../../../environments/environment");
exports.CONSUMER_CONFIG = {
    options: {
        client: {
            brokers: [environment_1.environment.KAFKA_BROKER_URI],
        },
        consumer: {
            groupId: environment_1.environment.KAFKA_GROUP_ID,
        },
    },
};
//# sourceMappingURL=consumer.config.js.map