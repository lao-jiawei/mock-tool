import { Layout, theme } from 'antd';
import React from 'react';

const { Header, Content, Footer } = Layout;

const BaseLayout = (props) => {
  const { header } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const height = document.body.clientHeight;
  console.log("🚀 ~ file: index.jsx:14 ~ BaseLayout ~ height:", height);

  return (
    <Layout
      style={{ width: "100%", height: '100%' }}
    >
      <Header>
        {header}
      </Header>
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 700,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default BaseLayout;