import React from 'react';

import './Card.css';

interface Props {
  children: React.ReactNode;
}

function Card({ children }: Props): JSX.Element {
  return <div className="card_Container">{children}</div>;
}

export default Card;
