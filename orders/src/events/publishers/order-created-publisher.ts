import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from "@ducnguyen96/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
