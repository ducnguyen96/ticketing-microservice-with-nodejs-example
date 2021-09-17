import { Publisher, Subjects, TicketCreatedEvent } from "@ducnguyen96/ticketing-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
