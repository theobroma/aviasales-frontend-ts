export interface TicketSegment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: [TicketSegment, TicketSegment]; // back and forth
}
