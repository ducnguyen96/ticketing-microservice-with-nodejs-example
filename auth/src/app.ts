import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import "express-async-errors";
import cookieSession from "cookie-session";
import { NotFoundEror, errorHandler } from "@ducnguyen96/ticketing-common";

const app = express();
app.use(json());

app.set("trust proxy", true); // trust nginx
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("*", async () => {
  throw new NotFoundEror();
});

app.use(errorHandler);

export { app };
