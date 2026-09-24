import { test as base } from "@playwright/test";
import { PageObjectManager } from "../../pages/pageObjectManager";

export const testBase = base.extend<{
  BaseContext: any;
  PageObjectManager: any;
}>({
  BaseContext: async ({ browser }, use: any) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use({ context, page });
    await context.close();
  },

  PageObjectManager: async ({ page }, use: any) => {
    const pageObjectManagerObject = new PageObjectManager(page);
    await use(pageObjectManagerObject);
  },
});
