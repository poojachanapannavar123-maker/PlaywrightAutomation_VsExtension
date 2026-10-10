import { testUsers } from "../testdata/credentials";
import { test } from "../fixtures/contextFixture";

for (const user of testUsers) {
  test(
    `TID001 Successful Login ${user.userName}`,
    { tag: ["@login", "@smoke"] },
    async ({ loginAs, productsPage }) => {
      await loginAs(user.userName, user.password);
      await productsPage.verifyproductListVisible();
    }
  );
}

test(
  `TID002 Invalid Login`,
  { tag: ["@login", "@regression"] },
  async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.invalidLoginMethod("invalid_user", "Test@123");
  }
);
test(
  `TID003 Lockedoutuser login`,
  { tag: ["@login", "@regression"] },
  async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.lockedoutUserMethod("locked_out_user", "secret_sauce");
  }
);
