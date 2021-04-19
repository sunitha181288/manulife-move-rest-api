import { ClientKafka } from '@nestjs/microservices';
export declare class KafkaService {
    client: ClientKafka;
    connect(topic: any): Promise<void>;
    sendTopic(topic: any, payload: any): import("rxjs").Observable<any>;
}
