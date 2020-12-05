import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';

import './App.scss';
import { Col, Layout, Row, Switch, Typography } from 'antd';
import MESSAGE from '../constants/messageTypes';
import CONFIG from '../constants/config';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setActiveTab(tabs[0]);
    });
  }, []);

  const onClick = () => {
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, {
        type: MESSAGE.FORMAT,
      });
    }
  };

  return (
    <Layout className="app">
      <Row>
        <Col flex="auto" className="header">
          <Title className="title" level={3}>
            {CONFIG.NAME}
          </Title>
        </Col>
      </Row>
      <Content>
        {['feature1', 'feature2', 'feature3'].map((e) => {
          return (
            <Row key={e}>
              <Col span={12}>
                <Text strong>{e}</Text>
              </Col>
              <Col span={12}>
                <Switch defaultChecked />
              </Col>
            </Row>
          );
        })}
        <button onClick={onClick} type="button">
          Format
        </button>
      </Content>
      <Footer className="footer">
        <Col span={12}>
          <Text strong>Github</Text>
        </Col>
      </Footer>
    </Layout>
  );
};

export default hot(App);
