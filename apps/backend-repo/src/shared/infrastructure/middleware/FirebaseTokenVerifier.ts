import { Auth } from "firebase-admin/auth";
interface ClaimVerifyResult {
  readonly userName: string;
  readonly clientId: string;
  readonly isValid: boolean;
  readonly error?: any;
}
export class FirebaseTokenVerifier {
  constructor(private auth: Auth) {}

  public async verify(token: string): Promise<ClaimVerifyResult> {
    return this.auth
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        return {
          userName: uid,
          clientId: "firebase",
          isValid: true,
        };
      })
      .catch((error) => {
        return {
          userName: "",
          clientId: "",
          isValid: false,
          error: error,
        };
      });
  }
}
