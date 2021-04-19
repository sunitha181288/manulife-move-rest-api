import * as request from 'supertest';
import { environment } from '@environments/environment';

describe('AppController (e2e)', () => {

  it(`/Get Sales Report`, async () => {
    await request(environment.ENDPOINT)
      .get(`/sales/report`)
      .expect(200);
  });

  it(`/Get Sales Report with date range`, async () => {
    await request(environment.ENDPOINT)
      .get(`/sales/report`)
      .query({
        startDate: '2019-12-05',
        endDate: '2020-11-06'
      }).expect(200);
  });

  it(`/Get Sales Report with wrong params`, async () => {
    await request(environment.ENDPOINT)
      .get(`/sales/report`)
      .query({
        startDate: '19/04/2021',
        endDate: '19/04/2021'
      }).expect(400);
  });
});
