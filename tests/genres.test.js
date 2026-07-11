const request = require('supertest');
const app = require('../app');

describe('GET /genres', () => {
  it('returns 200 and a list of genres', async () => {
    const res = await request(app).get('/genres');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
