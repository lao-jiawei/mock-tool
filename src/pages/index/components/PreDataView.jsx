import { Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mock } from 'mockjs';
import React from 'react';
import { useStore } from '../../../hooks';
const { TextArea } = Input;

const PreDataView = (props) => {
  const { } = props;
  const { indexStore: store } = useStore();
  const treeData = toJS(store.treeData);
  const mockPreView = mock(treeData) || {};
  return (
    <>
      <TextArea
        value={JSON.stringify(mockPreView, null, '\t')}
        style={{ height: '60vh' }}
      />
    </>
  )
}

export default observer(PreDataView);