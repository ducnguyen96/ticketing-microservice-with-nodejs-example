import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  currentUser,
  NotFoundError,
} from "@ducnguyen96/ticketing-common";
import { createTicketRouter } from "./routes/create";
import { readTicketRouter } from "./routes/read";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.use(json());

app.set("trust proxy", true); // trust nginx
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(readTicketRouter);
app.use(updateTicketRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
