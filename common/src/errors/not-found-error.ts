import { CustomError } from "./custom-error";

export class NotFoundEror extends CustomError {
  statusCode = 404;

  constructor() {
    super("Not Found Error");

    Object.setPrototypeOf(this, NotFoundEror.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
