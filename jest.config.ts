module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        // This regex tells Jest that any import starting with "@" should be mapped
        // to the "src/" directory, mirroring the Vite alias.
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
