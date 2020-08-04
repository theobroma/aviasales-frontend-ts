import React from 'react';
import { Ticket } from '../../core/types';

import './TicketsList.css';

import { TicketFC } from '../Ticket/Ticket';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

interface TicketsListProps {
  tickets: Ticket[];
}

export const TicketsList = React.memo(function TicketsList({
  tickets,
}: TicketsListProps): JSX.Element {
  return (
    <>
      <VisuallyHidden>
        <h2>Список билетов</h2>
      </VisuallyHidden>

      <ul className="ticketsList_List">
        {tickets.map((ticket: Ticket) => (
          <li
            key={ticket.price + ticket.carrier + ticket.segments.length}
            className="ticketsList_Item"
          >
            <TicketFC ticket={ticket} />
          </li>
        ))}
      </ul>
    </>
  );
});
export default TicketsList;
