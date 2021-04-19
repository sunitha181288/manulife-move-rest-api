import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { PRODUCER_CONFIG } from '@events/producers/producer.config';
import { TOPICS } from '@constants/topic.constant';
@Injectable()
export class KafkaService {
  @Client({
    transport: Transport.KAFKA,
    ...PRODUCER_CONFIG,
  })
  client: ClientKafka;

  /**
   * This method used to subscribe and connect to the topic
   */
  public async connect(topic) {
    this.client.subscribeToResponseOf(topic);
    await this.client.connect();
  }

  /**
   * This method used to send message to a topic
   */
  public sendTopic(topic, payload) {
    return this.client.send(topic, payload);
  }
}
