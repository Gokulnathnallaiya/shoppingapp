import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({
  children,
  buynow,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      buynow ? 'buynow' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
