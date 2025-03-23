import {
  RequestHandler as Middleware,
  NextFunction,
  Request,
  Response,
} from "express";
import { ErrorHandler } from "../../domain/ErrorHandler";
import { IAuthorizer } from "../../domain/IAuthorizer";
import { FirebaseTokenVerifier } from "./FirebaseTokenVerifier";

export class Authorizer
  implements IAuthorizer<Request, Response, NextFunction>
{
  constructor(private jwtVerifier: FirebaseTokenVerifier) {}

  public authorize: Middleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new ErrorHandler("Unauthorized: No token provided", 401));
    }

    const tokenArray =
      authorization !== undefined ? authorization.split(" ") : [];
    const token = tokenArray[1];

    try {
      if (!token) {
        return next(new ErrorHandler("Unauthorized: Token not provided", 401));
      }

      await this.jwtVerifier.verify(token).then((validation) => {
        if (!validation.isValid) {
          return next(
            new ErrorHandler(`Unauthorized: ${validation.error}`, 401),
          );
        }
        req.headers.user_id = validation.userName;
        return next();
      });
    } catch (err: any) {
      return next(new ErrorHandler(`Unauthorized: ${err.message}`, 401));
    }
  };
}
