import { Button } from 'antd';
import React from 'react';

const FormFooter = (props) => {
  const {
    settings = [],
  } = props;



  const BUTTON_TEXT = {
    NEXT: "下一步",
    BACK: "上一步",
    COPY: "复制",
  }

  return (
    <div>
      {settings?.map((setting) => {
        const {
          key,
          type,
          onClick,
        } = setting;
        return (
          <Button
            key={key}
            onClick={onClick}
          >
            {BUTTON_TEXT[type]}
          </Button>
        );
      })}
    </div>
  )
}

export default FormFooter;