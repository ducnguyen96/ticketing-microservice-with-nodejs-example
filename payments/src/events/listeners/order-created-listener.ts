import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@ducnguyen96/ticketing-common";
import { Order } from "../../models/order";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.ticket.version,
    });

    await order.save();

    // Ack the message
    msg.ack();
  }
}
