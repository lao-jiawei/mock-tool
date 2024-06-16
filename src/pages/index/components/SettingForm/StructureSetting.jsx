import { Tree } from 'antd';
import React, { useRef } from 'react';

const StructureSetting = (props) => {
  const structureData = useRef([
    {
      title: '添加',
      key: 'add',
    }
  ]);
  const onTreeNodeSelect = (...args) => {
    console.log("🚀 ~ file: StructureSetting.jsx:12 ~ onTreeNodeSelect ~ args:", args);

  }
  return (
    <>
      <Tree
        showLine
        treeData={structureData?.current}
        onSelect={onTreeNodeSelect}
      />
    </>
  )
}

export default StructureSetting;