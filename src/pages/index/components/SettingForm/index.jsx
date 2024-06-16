import { Steps } from 'antd';
import React, { useState } from 'react';
import FormFooter from './FormFooter';
import StructureSetting from './StructureSetting';
import './index.scss';

const SettingForm = (props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const stepSetting = [
    {
      title: '设置结构',
      content: <StructureSetting />,
      footerSetting: [
        {
          key: 'next',
          type: 'NEXT',
          onClick: () => goPage(1),
        }
      ]
    },
    {
      title: '设置字段类型',
      content: <></>,
      footerSetting: [
        {
          key: 'back',
          type: 'BACK',
          onClick: () => goPage(-1),
        },
        {
          key: 'next',
          type: 'NEXT',
          onClick: () => goPage(1),
        },
      ]
    },
    {
      title: '生成mock结构',
      content: <></>,
      footerSetting: [
        {
          key: 'back',
          type: 'BACK',
          onClick: () => goPage(-1),
        },
      ]
    },
  ]

  function goPage(num) {
    setCurrentStep((pre) => (pre + num))
  }



  return (
    <div className='setting-form'>
      <div className='stepper'>
        <Steps
          current={currentStep}
          items={stepSetting}
          size='small'
        />
      </div>
      <div className='content'>
        {stepSetting?.[currentStep]?.content}
      </div>
      <div className='footer'>
        <FormFooter
          current={currentStep}
          settings={stepSetting?.[currentStep]?.footerSetting}
        />
      </div>
    </div>
  )
}

export default SettingForm;