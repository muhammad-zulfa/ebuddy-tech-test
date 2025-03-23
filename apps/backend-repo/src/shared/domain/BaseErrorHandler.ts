export type BaseErrorHandlerContent = {
  message: string;
  context?: { [key: string]: any };
};

export abstract class BaseErrorHandler extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: BaseErrorHandlerContent[];
  abstract readonly logging: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BaseErrorHandler.prototype);
  }
}
