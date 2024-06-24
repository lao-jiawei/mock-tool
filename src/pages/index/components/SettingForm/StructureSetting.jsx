import { UndoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Radio, Select, Tree } from 'antd';
import _ from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mock } from 'mockjs';
import React, { useState } from 'react';
import { commonMockData } from './stores/common-mock';

const StructureSetting = (props) => {
  const [data, setData] = useState([
    {
      title: '/',
      key: 'root',
      children: [
        {
          title: 'level1',
          key: 'level1',
          children: [
            {
              title: 'level2',
              key: 'level2',
            }
          ]
        }
      ]
    }
  ]);
  const [formData] = useState(() => observable({
    selectNode: 'root',
    preViewValue: '',
    nodeKey: '',
    children: [],
    pos: '',
  }));

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
    const { children: selectChildren, pos } = node;
    const children = _.cloneDeep(selectChildren);
    _.assign(formData, {
      children,
      pos,
      selectNode: v,
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
      selectNode,
      pos,
    } = curFormData;
    const levelIndex = pos.split('-');
    const layer = levelIndex.length;
    const curTreeData = _.cloneDeep(data);



    console.log("🚀 ~ file: StructureSetting.jsx:151 ~ addItem ~ levelIndex:", levelIndex);
    console.log("🚀 ~ file: StructureSetting.jsx:148 ~ addItem ~ curFormData:", curFormData);
    console.log("🚀 ~ file: StructureSetting.jsx:151 ~ addItem ~ curTreeData:", curTreeData);
  }

  // 递归查找目标父节点
  function findNode(tree, name) {
    if (tree.name === name) {
      return tree;
    } else {
      for (const child of tree.children) {
        const found = findNode(child, name);
        if (found) {
          return found;
        }
      }
    }
    return null;
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