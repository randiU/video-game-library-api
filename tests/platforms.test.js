const request = require('supertest');
const app = require('../app');

describe('GET /platforms', () => {
  it('returns 200 and a list of platforms', async () => {
    const res = await request(app).get('/platforms');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
