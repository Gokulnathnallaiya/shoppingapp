import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({
  children,
  buynow,
  inverted,
  googlesignin,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted' : ''} ${
      googlesignin ? 'buynow' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
