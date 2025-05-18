// jest.config.cjs
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.ts?$': 'ts-jest', // Only match .ts files, not .tsx
    },
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: {},
    setupFilesAfterEnv: [],
};
