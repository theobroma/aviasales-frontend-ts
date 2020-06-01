import React from 'react';

import './Checkbox.css';

interface Props {
  [key: string]: any;
}

function Checkbox({ ...props }: Props): JSX.Element {
  return (
    <>
      <input className="checkbox_Native" type="checkbox" {...props} />

      <span className="checkbox_Visual" />
    </>
  );
}

export default Checkbox;
