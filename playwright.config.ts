import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";

const env = (process.env.ENV || "qa").toLowerCase();

if (!["qa", "uat"].includes(env)) {
  throw new Error(`unsupported environment:${env}`);
}
dotenv.config({ path: `.env.${env}` });

if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is missing for ${env}`);
}

export default defineConfig({
  testDir: "./tests",

  timeout: 10000,
  expect: { timeout: 5000 },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 2,

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: "only-on-failure",

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile safari",
      use: { ...devices["iPhone 17"] },
    },
  ],
});
