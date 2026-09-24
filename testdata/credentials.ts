import credentials from "../testdata/credentials.json";

export const testUsers = process.env.CI
  ? [
      {
        userName: process.env.USERNAME!,
        password: process.env.PASSWORD!,
      },
    ]
  : credentials.users;
