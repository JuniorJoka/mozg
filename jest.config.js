module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/modules/**/*.{ts,js}'],
};

process.env = Object.assign(process.env, {
  JWT_SECRET: 'super test secret',
});
