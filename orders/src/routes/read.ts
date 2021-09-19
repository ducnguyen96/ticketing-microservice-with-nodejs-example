import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
} from "@ducnguyen96/ticketing-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );

  res.send(orders);
});

router.get(
  "/api/orders/:id",
  requireAuth,
  [
    body("ticketID")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);
export { router as readOrderRouter };
