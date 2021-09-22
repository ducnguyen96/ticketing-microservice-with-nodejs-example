import { Ticket } from "../ticket";
import mongoose from "mongoose";

it("implements optimistic concurrency control", async () => {
  // Create an instancee of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  // Save the ticket to the database
  await ticket.save();

  // Fetch the ticket twice
  const first = await Ticket.findById(ticket.id);
  const second = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  first!.set({ price: 10 });
  second!.set({ price: 20 });

  // Save the first fetched ticket;
  await first!.save();

  // Save the second fetched ticket and expect an error;
  try {
    await second!.save();
  } catch (error) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  // Create an instancee of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  // Save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0);

  ticket.set({ version: ticket.version + 1 });
  await ticket.save();
  expect(ticket.version).toEqual(1);

  ticket.set({ version: ticket.version + 1 });
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
