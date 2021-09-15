import { NextFunction, Response, Request } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

// src/middlewares/require-auth.ts
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
