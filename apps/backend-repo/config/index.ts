import * as dotenv from "dotenv";
import { DEV } from "./environments/dev";
import { PROD } from "./environments/prod";
dotenv.config();

const { NODE_ENV } = process.env;

export type Configuration = {
  NODE_ENV: string;
  PORT: number;
  APP_NAME: string;
  APP_LOG_LEVEL: string;
  FIREBASE: {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
  };
};

let currentConfig: Configuration = DEV;

switch (NODE_ENV) {
  case "production":
    currentConfig = PROD;
    break;
  default:
    currentConfig = DEV;
}

export { currentConfig as config };
