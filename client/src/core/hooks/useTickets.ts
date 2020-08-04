import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import {
  pluck,
  repeat,
  retry,
  scan,
  switchMap,
  takeWhile,
} from 'rxjs/operators';

import { useEffect, useState } from 'react';
import { Ticket, Filter, SortType } from '../types';

const API_URL = 'https://front-test.beta.aviasales.ru';

interface ResponseSearch {
  searchId: string;
}

interface ResponseTicketPool {
  stop: boolean;
  tickets: Ticket[];
}

function fetch<T>(url: string): Observable<T> {
  return fromFetch(url, {}).pipe(
    switchMap((response) => response.json()),
    retry(3),
  );
}

export function loadTickets(): Observable<Ticket[]> {
  return fetch<ResponseSearch>(`${API_URL}/search`).pipe(
    pluck('searchId'),
    switchMap((searchId) =>
      fetch<ResponseTicketPool>(`${API_URL}/tickets?searchId=${searchId}`).pipe(
        repeat(),
        takeWhile(({ stop }) => !stop, true),
      ),
    ),
    scan((acc, { tickets }) => acc.concat(tickets || []), [] as Ticket[]),
  );
}

export function hasTicketFitsTheFilter(
  filters: Filter[],
  ticket: Ticket,
): boolean {
  return ticket.segments.reduce((allSegmentFits, { stops }) => {
    const haveFitsFilterForSegment = filters
      .filter((filter) => filter.selected)
      .map((filter) => filter.count === -1 || filter.count === stops.length)
      .some((hasValid) => hasValid);

    return allSegmentFits && haveFitsFilterForSegment;
  }, true as boolean);
}

export function compareTickets(sort: SortType, a: Ticket, b: Ticket): number {
  const getDuration = (segment: Ticket): number => {
    return segment.segments.reduce((acc, el) => acc + el.duration, 0);
  };

  const byFast = () => getDuration(a) - getDuration(b);
  const byCheap = () => a.price - b.price;
  const byCompanyName = () => {
    /* eslint-disable no-nested-ternary */
    return a.carrier > b.carrier ? 1 : a.carrier < b.carrier ? -1 : 0; // if tickets the equals
    /* eslint-enable no-nested-ternary */
  };
  switch (sort) {
    case 'cheap':
      return byCheap() || byFast() || byCompanyName();

    case 'fast':
      return byFast() || byCheap() || byCompanyName();

    default:
      console.error(`Unknow SortType "${sort}"`);
      return 0;
  }
}

export function useTickets(
  sort: SortType,
  filters: Filter[],
): [Ticket[], boolean, boolean, boolean] {
  const [hasFail, setFail] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setLoading(true);

    const subscribe = loadTickets().subscribe({
      next(ticketsArr: Ticket[]) {
        setAllTickets(ticketsArr);
      },
      error() {
        setFail(true);
        setLoading(false);
      },
      complete() {
        setLoading(false);
      },
    });

    return () => subscribe.unsubscribe();
  }, []);

  useEffect(() => {
    setTickets(
      allTickets
        .sort(compareTickets.bind(null, sort))
        .filter(hasTicketFitsTheFilter.bind(null, filters))
        .slice(0, 5),
    );
  }, [allTickets, sort, filters]);

  return [tickets, isLoading, !!allTickets.length && !tickets.length, hasFail];
}
