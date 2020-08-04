import React, { useCallback, useState } from 'react';
import './assets/styles/index.scss';
import Layout from './components/Layout/Layout';
import Filters from './components/Filters/Filters';
import { TicketsList } from './components/TicketsList/TicketsList';
import { SortType } from './core/types/Sort.type';
import { Filter } from './core/types/Filter';
import { plural } from './core/lib/plural';
import { useTickets } from './core/hooks/useTickets';

import Sort from './components/Sort/Sort';
// Mock data for tickets if needed
// import TicketsData from './core/mock/TicketsMock';

interface Props {
  // none;
}

const App: React.FC<Props> = () => {
  const stopsPlural = plural(
    ['пересадка', 'пересадки', 'пересадок'],
    'Без пересадок',
  );

  // Sort and filtering
  const [sort, setSort] = useState<SortType>('cheap');
  const [filters, setFilters] = useState<Filter[]>([
    {
      count: -1,
      selected: true,
      label: 'Все',
    },
    ...Array(4)
      .fill(0)
      .map(
        (_, count): Filter => ({
          count,
          selected: true,
          label: stopsPlural(count),
        }),
      ),
  ]);

  const onSortChange = useCallback((type: SortType) => setSort(type), []);
  const onFiltersChange = useCallback(
    (count: number, value: boolean) => {
      // If change `all`, change all filters
      if (count === -1) {
        setFilters(
          filters.map((filter) => Object.assign(filter, { selected: value })),
        );
        return;
      }

      // Set new value in filter
      const newFilters: Filter[] = filters.map((filter) => {
        if (count === filter.count) {
          filter.selected = value;
        }

        return filter;
      });

      // Check and update the `all` filter
      const isCanNotSelected = !!newFilters.find(
        (el) => el.count !== -1 && !el.selected,
      );
      setFilters(
        filters.map((filter) => {
          if (filter.count === -1) {
            filter.selected = !isCanNotSelected;
          }

          return filter;
        }),
      );
    },
    [filters],
  );

  // Loading tickets
  const [tickets, isLoading, noFiltered, hasFail] = useTickets(sort, filters);
  return (
    <Layout
      fail={hasFail}
      loading={isLoading}
      noFiltered={noFiltered}
      sort={<Sort onChange={onSortChange} />}
      filters={<Filters filters={filters} onChange={onFiltersChange} />}
      tickets={<TicketsList tickets={tickets} />}
    />
  );
};

export default App;
