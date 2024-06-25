import React from 'react';
import StructureSetting from './StructureSetting';
import './index.scss';

const SettingForm = (props) => {

  return (
    <div className='setting-form'>
      <div className='content'>
        <StructureSetting />
      </div>
    </div>
  )
}

export default SettingForm;