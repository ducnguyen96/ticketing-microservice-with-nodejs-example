import { currentUser } from "@ducnguyen96/ticketing-common";
import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // current-user.ts
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
