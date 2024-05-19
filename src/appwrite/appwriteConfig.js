import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6648c7b7000ca3e7da31");

  export const account = new Account(client)

//   Database
  export const databases = new Databases(client,"6648c89f00135cfcab19")

  // collection id: 6648c8b6001e2ac3de30