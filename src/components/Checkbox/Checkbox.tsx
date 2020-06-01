import React from 'react';

import './Checkbox.css';

interface Props {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
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
