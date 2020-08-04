import { Ticket } from '../types';

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
export default TicketsData;
