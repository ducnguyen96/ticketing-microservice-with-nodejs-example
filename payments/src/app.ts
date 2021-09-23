import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  currentUser,
  NotFoundError,
} from "@ducnguyen96/ticketing-common";
import { createChargeRouter } from "./routes/create";

const app = express();
app.use(json());

app.set("trust proxy", true); // trust nginx
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(createChargeRouter);

app.use(errorHandler);

export { app };
