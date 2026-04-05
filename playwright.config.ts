import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev --host 127.0.0.1 --port 4321",
    port: 4321,
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "chrome-beta",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome-beta",
      },
    },
  ],
});
