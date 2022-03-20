module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

process.env = Object.assign(process.env, {
  JWT_SECRET: 'super test secret',
});
