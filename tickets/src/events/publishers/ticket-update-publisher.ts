import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@ducnguyen96/ticketing-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
