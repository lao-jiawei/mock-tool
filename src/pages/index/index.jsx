import { Card, Col, Row } from 'antd';
import React from 'react';
import PreDataView from './components/PreDataView';
import SettingForm from './components/SettingForm';

const Index = (props) => {
  return (
    <>
      <Row gutter={[24, 24]} style={{ height: '100%' }}>
        <Col span={12} style={{ height: '100%' }}>
          <Card title="设置" bordered={false} style={{ height: '100%' }}>
            <SettingForm />
          </Card>
        </Col>
        <Col span={12} style={{ height: '100%' }}>
          <Card title="预览" bordered={false} style={{ height: '100%' }}>
            <PreDataView />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Index;