import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from "@ducnguyen96/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
