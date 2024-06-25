import { Button } from 'antd';
import React from 'react';

const ButtonGroup = (props) => {
  const {
    buttonSettings,
  } = props;
  return (
    <div>
      {buttonSettings.map(({ label, key, ...buttonProps }) => (
        <Button
          key={key}
          style={{ margin: '5px' }}
          {...buttonProps}
        >{label}</Button>
      ))}
    </div>
  )
}

export default ButtonGroup;