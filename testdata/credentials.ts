import credentials from "../testdata/credentials.json";

const env = (process.env.ENV || "qa").toLowerCase() as "qa" | "uat";

export const testUsers = process.env.CI
  ? [
      {
        userName: process.env.USERNAME!,
        password: process.env.PASSWORD!,
      },
    ]
  : credentials[env].users;
