import { Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mock } from 'mockjs';
import React from 'react';
import ButtonGroup from '../../../components/ButtonGroup';
import { useStore } from '../../../hooks';
const { TextArea } = Input;

const PreDataView = (props) => {
  const { } = props;
  const { indexStore: store } = useStore();
  const treeData = toJS(store.treeData);
  const mockPreView = mock(treeData) || {};

  const buttonSettings = [
    {
      label: '一键复制',
      key: 'copyAll',
    },
    {
      label: '复制mock结构',
      key: 'copyMockStructure',
    },
  ]

  return (
    <>
      <TextArea
        value={JSON.stringify(mockPreView, null, '\t')}
        style={{ height: '60vh' }}
      />
      <ButtonGroup
        buttonSettings={buttonSettings}
      />
    </>
  )
}

export default observer(PreDataView);