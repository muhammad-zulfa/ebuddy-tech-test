import { NextFunction, Request, Response } from "express";
import { ErrorFormatter, validationResult } from "express-validator";
import { ErrorHandler } from "../../domain/ErrorHandler";

export const RequestValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const errorFormatter: ErrorFormatter = ({ msg, type }) => {
    return { parameter: type, message: msg };
  };

  const errors = validationResult(req)
    .formatWith(errorFormatter)
    .array({ onlyFirstError: true });
  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
    next(new ErrorHandler("Validation failed", 400));
  }
  next();
};
