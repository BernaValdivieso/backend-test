import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.spec.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

export default config;
