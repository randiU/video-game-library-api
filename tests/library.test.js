const request = require('supertest');
const app = require('../app');

describe('POST /library', () => {
  it('returns 401 when logged out', async () => {
    const res = await request(app)
      .post('/library')
      .send({ gameId: '000000000000000000000000' });

    expect(res.statusCode).toBe(401);
  });
});
