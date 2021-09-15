import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundEror } from "./errors/not-found-error";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(json());

// index.ts
app.set("trust proxy", true); // trust nginx
app.use(cookieSession({ signed: false, secure: true }));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("*", async () => {
  throw new NotFoundEror();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("connected to mongoose");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 !");
  });
};

start();
