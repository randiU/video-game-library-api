const request = require('supertest');
const app = require('../app');

describe('GET /reviews', () => {
  it('returns 200 and a list of reviews', async () => {
    const res = await request(app).get('/reviews');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /reviews', () => {
  it('returns 401 when logged out', async () => {
    const res = await request(app)
      .post('/reviews')
      .send({ gameId: '000000000000000000000000', rating: 5 });

    expect(res.statusCode).toBe(401);
  });
});
