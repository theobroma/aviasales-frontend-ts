import React, { useCallback, useState } from 'react';
import './assets/styles/index.scss';
// import { Layout } from './components/Layout/Layout';
// import { Sort } from './components/Sort/Sort';
// import { Filters } from './components/Filters/Filters';
import { TicketsList } from './components/TicketsList/TicketsList';
import { Ticket } from './core/types/Ticket';

// import { Filter } from './core/types/Filter';
// import { SortType } from './core/types/Sort.type';
// import { plural } from './core/lib/plural';
// import { useTickets } from './core/hooks/useTickets';

import Logo from './components/Logo/Logo';

interface Props {
  // activeTodoCount: number;
}

const TicketsData: Ticket[] = [
  {
    price: 26090,
    carrier: 'EK',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2020-06-10T05:36:00.000Z',
        stops: ['AUH', 'SIN', 'KUL'],
        duration: 1494,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2020-06-30T08:07:00.000Z',
        stops: ['BKK'],
        duration: 702,
      },
    ],
  },
  {
    price: 26090,
    carrier: 'EK',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKT',
        date: '2020-06-10T05:36:00.000Z',
        stops: ['AUH', 'SIN', 'KUL'],
        duration: 1494,
      },
      {
        origin: 'HKT',
        destination: 'MOW',
        date: '2020-06-30T08:07:00.000Z',
        stops: ['BKK'],
        duration: 702,
      },
    ],
  },
];

const App: React.FC<Props> = () => {
  return (
    <div>
      <Logo />
      <TicketsList tickets={TicketsData} />
    </div>
  );
};

export default App;
