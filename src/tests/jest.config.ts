import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};

export default config;

// /** @type {import('jest').Config} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   roots: ['<rootDir>/src'],
//   setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
//   testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
//   transform: {
//     '^.+\\.(ts|tsx)$': [
//       'ts-jest',
//       {
//         tsconfig: '<rootDir>/tsconfig.jest.json',
//       },
//     ],
//   },
// };

// testEnvironment: 'jsdom' é o que deixa componente React funcionar no teste
// setupFilesAfterEnv geralmente importa @testing-library/jest-dom
// testMatch define quais arquivos são testes