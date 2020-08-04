import React, { useCallback } from 'react';

import './Sort.css';

import { SortType } from '../../core/types';

interface Props {
  onChange: (type: SortType) => void;
}

const Sort = React.memo(function Sort(props: Props) {
  const onChange = useCallback(
    (ev) => props.onChange(ev.target.value as SortType),
    [props],
  );

  return (
    <div className="ticketList_SortContainer">
      <label className="ticketsList_SortButton">
        <input
          className="ticketsList_SortCheckbox"
          name="sort-type"
          type="radio"
          value="cheap"
          onChange={onChange}
          defaultChecked
        />
        <span className="ticketsList_SortButtonText">Самый дешевый</span>
      </label>

      <label className="ticketsList_SortButton">
        <input
          className="ticketsList_SortCheckbox"
          name="sort-type"
          type="radio"
          value="fast"
          onChange={onChange}
        />
        <span className="ticketsList_SortButtonText">Самый быстрый</span>
      </label>
    </div>
  );
});
export default Sort;
