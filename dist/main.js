"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app/app.module");
const consumer_config_1 = require("./app/events/consumers/consumer.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice(Object.assign({ transport: microservices_1.Transport.KAFKA }, consumer_config_1.CONSUMER_CONFIG));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.startAllMicroservicesAsync();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map