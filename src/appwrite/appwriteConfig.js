import { Client, Account, Databases } from "appwrite";
import config from "../config/config"

export const client = new Client();

client
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

  export const account = new Account(client)

//   Database
  export const databases = new Databases(client, config.appwriteDatabaseId)
