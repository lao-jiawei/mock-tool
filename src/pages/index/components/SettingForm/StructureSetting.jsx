import { UndoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Radio, Select, Tree } from 'antd';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mock } from 'mockjs';
import React, { useState } from 'react';
import { useStore } from '../../../../hooks';
import { commonMockData } from './stores/common-mock';

const StructureSetting = (props) => {
  const { indexStore: store } = useStore();
  const [data, setData] = useState([
    {
      title: '/',
      key: 'root',
      children: []
    }
  ]);
  const [formData] = useState(() => observable({
    selectNode: 'root',
    selectNodeKey: 'root',
    preViewValue: '',
    nodeKey: '',
    children: [],
    pos: '',
  }));

  const [mockData] = useState(() => observable({}))

  const [componentProps, setComponentProps] = useState({
    modal: {
      open: false,
      title: '',
    },
    radioGroup: {
      value: 'preset',
    }
  })

  const onTreeNodeSelect = (v, { node }) => {
    const { children: selectChildren, pos, key } = node;
    console.log("🚀 ~ file: StructureSetting.jsx:42 ~ onTreeNodeSelect ~ node:", node);
    const children = _.cloneDeep(selectChildren);
    _.assign(formData, {
      children,
      pos,
      selectNode: v,
      selectNodeKey: key,
    })
  }

  const buttonSetting = [
    {
      label: '添加项',
      key: 'addItem',
      type: 'primary',
      onClick: () => {
        setModalProps({
          open: true,
          title: '添加项',
        })
      }
    },
    {
      label: '编辑项',
      key: 'editItem',
      type: 'primary',
      onClick: () => {
        setModalProps({
          open: true,
          title: '编辑项',
        })
      }
    },
    {
      label: '删除项',
      key: 'deleteItem',
      danger: true,
      onClick: () => {
        setModalProps({
          open: true,
          title: '删除项',
        })
      }
    }
  ]

  function setModalProps(newProps) {
    setComponentProps((pre) => ({
      ...pre,
      modal: {
        ...pre.modal,
        ...newProps,
      }
    }))
  }

  function setRadioGroupProps(newProps) {
    setComponentProps((pre) => ({
      ...pre,
      radioGroup: {
        ...pre.radioGroup,
        ...newProps,
      }
    }))
  }

  const radioOptions = [
    {
      label: '预设',
      value: 'preset',
    },
    {
      label: '自定义',
      value: 'self',
    },
  ];

  const NodeValueDom = {
    self: (<Input />),
    preset: (
      <Select
        options={commonMockData}
        onChange={onMockValueChange}
      />
    )
  }

  function onMockValueChange(v) {
    formData.nodeValue = v;
    loadMockValue(v);
  }

  function loadMockValue(nodeValue) {
    const mockValue = mock(nodeValue);
    formData.preViewValue = mockValue;
  }

  function addItem() {
    const curFormData = _.cloneDeep(formData);
    const {
      pos,
      nodeKey,
      nodeValue,
      selectNodeKey,
    } = curFormData;
    const levelIndex = pos.split('-');
    levelIndex.shift();
    const curTreeData = _.cloneDeep(data);
    const tmp = findNode(curTreeData, levelIndex);
    const key = `${selectNodeKey}-${nodeKey}`;
    insertNode(tmp,
      {
        title: nodeKey,
        key,
        mockValue: nodeValue,
        children: [],
      }
    )
    setModalProps({ open: false });
    setData(() => curTreeData);
    const path = key.split('-').filter((e) => e !== 'root');
    _.set(mockData, path, nodeValue);

    store.treeData = mockData;
  }

  // 递归查找目标父节点
  function findNode(tree, indexArr) {
    const index = indexArr.shift();
    if (!indexArr.length) return tree[index];
    const curChildren = tree[index]?.children;
    const res = findNode(curChildren, indexArr);
    return res;
  }

  // 插入节点
  function insertNode(parent, node) {
    parent.children.push(node);
  }



  return (
    <>
      <div>
        <div>
          {buttonSetting.map(({ label, key, ...buttonProps }) => (
            <Button
              key={key}
              style={{ margin: '5px' }}
              {...buttonProps}
            >{label}</Button>
          ))}
        </div>
        <div>
          <Tree
            showLine
            treeData={data}
            onSelect={onTreeNodeSelect}
          />
        </div>
      </div>
      <Modal
        {...componentProps?.modal}
        cancelText='取消'
        onOk={addItem}
        onCancel={() => { setModalProps({ open: false }) }}
        onClose={() => { setModalProps({ open: false }) }}
      >
        <Form
          initialValues={formData}
        >
          <Form.Item
            label='父项'
            name="selectNode"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label='键名'
            name="nodeKey"
          >
            <Input
              onChange={({ target }) => {
                const { value } = target;
                formData.nodeKey = value;
              }}
            />
          </Form.Item>
          <div style={{ margin: '20px' }}>
            <Radio.Group
              {...componentProps?.radioGroup}
              options={radioOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={({ target }) => {
                const { value: newValue } = target;
                setRadioGroupProps({ value: newValue })
              }}
            />
          </div>
          <Form.Item
            label='键值'
            name="nodeValue"
            onChange={({ target }) => onMockValueChange(target?.value)}
          >
            {NodeValueDom[componentProps?.radioGroup?.value]}
          </Form.Item>
          <Form.Item
            label='预览生成值'
          >
            <Input
              disabled value={formData?.preViewValue}
              addonAfter={<UndoOutlined
                onClick={() => loadMockValue(formData?.nodeValue)}
              />
              }
            />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default observer(StructureSetting);