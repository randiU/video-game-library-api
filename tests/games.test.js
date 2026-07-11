const request = require('supertest');
const app = require('../app');

describe('GET /games', () => {
  it('returns 200 and a list of games', async () => {
    const res = await request(app).get('/games');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /games/:id', () => {
  it('returns 400 for a malformed id', async () => {
    const res = await request(app).get('/games/bad-id');

    expect(res.statusCode).toBe(400);
  });
});

describe('POST /games', () => {
  it('returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/games')
      .send({ title: 'Incomplete Game' });

    expect(res.statusCode).toBe(400);
  });
});
