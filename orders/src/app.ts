import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  currentUser,
  NotFoundError,
} from "@ducnguyen96/ticketing-common";
import { createOrderRouter } from "./routes/create";
import { readOrderRouter } from "./routes/read";
import { deleteOrderRouter } from "./routes/delete";

const app = express();
app.use(json());

app.set("trust proxy", true); // trust nginx
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
app.use(createOrderRouter);
app.use(readOrderRouter);
app.use(deleteOrderRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
