import { environment } from '@environments/environment';
export const PRODUCER_CONFIG = {
  options: {
    client: {
      clientId: environment.KAFKA_CLIENT_ID,
      brokers: [environment.KAFKA_BROKER_URI],
    },
    consumer: {
      groupId: environment.KAFKA_GROUP_ID,
    },
  },
};
