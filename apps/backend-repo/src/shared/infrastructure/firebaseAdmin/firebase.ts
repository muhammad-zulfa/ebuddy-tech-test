import { cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import admin from "firebase-admin";
const rootPath = require("app-root-path");
const serviceAccount = require(rootPath + "/serviceAccountKey.json");
import { config } from "../../../../config";
const { projectId } = config.FIREBASE;

const app = admin.initializeApp({
  credential: cert(serviceAccount),
  projectId,
});

export const db = admin.firestore();
export const auth = getAuth(app);
