import { test as base } from "@playwright/test";
import { PageObjectManager } from "../pages/pageObjectManager";

type MyFixtures = {
  PageObjectManager: PageObjectManager;
};

export const test = base.extend<MyFixtures>({
  PageObjectManager: async ({ page }, use) => {
    const pageObjectManagerObject = new PageObjectManager(page);
    await use(pageObjectManagerObject);
  },
});
