// Runs automatically before/after every test file (see "setupFilesAfterEnv" in package.json).
// Opens one Mongoose connection per test file and closes it when that file's tests finish,
// so individual test files don't need their own connection boilerplate.

require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
