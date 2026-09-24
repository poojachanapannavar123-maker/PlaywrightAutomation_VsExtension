import credentials from "../testdata/credentials.json";

export const testUsers = process.env.CI
  ? [
      {
        userName: process.env.CI_USERNAME!,
        password: process.env.CI_PASSWORD!,
      },
    ]
  : credentials.users;
