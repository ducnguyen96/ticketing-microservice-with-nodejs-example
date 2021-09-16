import { NotFoundError } from "@ducnguyen96/ticketing-common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});

export { router as readTicketRouter };
