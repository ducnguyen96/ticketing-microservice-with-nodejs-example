import nats, { Message } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const listener = new TicketCreatedListener(stan);
  listener.listen();
});
