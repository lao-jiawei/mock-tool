/* eslint-disable no-throw-literal */
import { Form, Input, Modal, message } from 'antd';
import _ from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mock } from 'mockjs';
import React, { useState } from 'react';
import ButtonGroup from '../../../components/ButtonGroup';
import { useStore } from '../../../hooks';
const { TextArea } = Input;

const PreDataView = (props) => {
  const { } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const { indexStore: store } = useStore();
  const [data, setData] = useState({
    fileName: '',
  });
  const [componentData, setComponentData] = useState({
    modalProps: {
      open: false,
      title: '',
    },
  });
  const treeData = toJS(store.treeData);
  const mockPreView = mock(treeData) || {};
  const jsonText = JSON.stringify(mockPreView, null, '\t');

  const buttonSettings = [
    {
      label: '一键复制',
      key: 'copyAll',
      show: false,
    },
    {
      label: '复制mock结构',
      key: 'copyMockStructure',
      show: false,
    },
    {
      label: '下载json文件',
      key: 'downloadJSONFile',
      onClick: () => { setModalProps({ open: true, title: '下载json文件' }) }
    },
  ];

  function setModalProps(newModalProps) {
    setComponentData((pre) => ({
      ...pre,
      modalProps: {
        ...pre.modalProps,
        ...newModalProps,
      }
    }));
  }

  function downloadJson(fileName, json) {
    const jsonStr = (json instanceof Object) ? JSON.stringify(json) : json;
    const url = window.URL || window.webkitURL || window;
    const blob = new Blob([jsonStr]);
    const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    saveLink.href = url.createObjectURL(blob);
    saveLink.download = `${fileName}.json`;
    saveLink.click();
  }

  function handleOk() {
    try {
      const fileName = data?.fileName;
      if (_.isEmpty(treeData)) {
        throw ({
          type: 'close',
          message: '当前没有任何mock数据',
        });
      }
      if (_.isEmpty(fileName)) {
        throw ({
          type: 'stay',
          message: '请输入文件名',
        })
      };
      downloadJson(fileName, jsonText);
      setModalProps({ open: false });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
      if (error.type === 'close') setModalProps({ open: false });
    }
  }

  function handleFieldsChange(fields) {
    const { value, name } = fields[0];
    const key = name[0];
    setData((pre) => ({
      ...pre,
      [key]: value,
    }))
  }

  return (
    <>
      {contextHolder}
      <TextArea
        value={jsonText}
        style={{ height: '60vh' }}
      />
      <ButtonGroup
        buttonSettings={buttonSettings}
      />
      <Modal
        {...componentData?.modalProps}
        onCancel={() => { setModalProps({ open: false }) }}
        onClose={() => { setModalProps({ open: false }) }}
        onOk={handleOk}
      >
        <Form
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            label='文件名'
            name='fileName'
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default observer(PreDataView);