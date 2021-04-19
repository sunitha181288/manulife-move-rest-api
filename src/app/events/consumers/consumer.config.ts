import { environment } from '@environments/environment';
export const CONSUMER_CONFIG = {
  options: {
    client: {
      brokers: [environment.KAFKA_BROKER_URI],
    },
    consumer: {
      groupId: environment.KAFKA_GROUP_ID,
    },
  },
};
