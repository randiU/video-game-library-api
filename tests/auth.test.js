const request = require('supertest');
const app = require('../app');

describe('GET /auth/status', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/auth/status');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('authenticated');
  });
});
