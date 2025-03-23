import * as dotenv from "dotenv";
import { firebaseConfig } from "../firebaseConfig";
dotenv.config();

const { KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT } = process.env;
export const PROD = {
  NODE_ENV: "production",
  PORT: 3030,
  APP_NAME: "My App",
  APP_LOG_LEVEL: "info",
  FIREBASE: {
    ...firebaseConfig,
  },
};
