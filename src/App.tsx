import React, { useCallback, useState } from 'react';
import './assets/styles/index.scss';
// import { Layout } from './components/Layout/Layout';
// import { Sort } from './components/Sort/Sort';
// import { Filters } from './components/Filters/Filters';
// import { TicketsList } from './components/TicketsList/TicketsList';

// import { Filter } from './core/types/Filter';
// import { SortType } from './core/types/Sort.type';
// import { plural } from './core/lib/plural';
// import { useTickets } from './core/hooks/useTickets';

import Logo from './components/Logo/Logo';

interface Props {
  // activeTodoCount: number;
}

const App: React.FC<Props> = () => {
  return (
    <div>
      <Logo />
    </div>
  );
};

export default App;
