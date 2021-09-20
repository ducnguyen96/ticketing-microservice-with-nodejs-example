import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@ducnguyen96/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
