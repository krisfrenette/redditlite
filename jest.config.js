module.exports = {
    automock: false,
    bail: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)spec)\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleDirectories: ['.', 'src', 'node_modules'],
    coverageDirectory: `${__dirname}/coverage`,
    coverageReporters: ['lcov', 'json-summary', 'cobertura'],
    collectCoverageFrom: [
        '**/src/utils/**',
        '**/src/store/**',
        '!**/__tests__/**',
        '!**/node_modules/**'
    ],
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [151001, 2339]
            }
        }
    }
};
