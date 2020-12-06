import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './App.scss';
import { Col, Divider, Layout, Row, Switch, Typography } from 'antd';
import MESSAGE from '../constants/messageTypes';
import Tooltip from 'antd/lib/tooltip';
import settings from '../constants/config';
import SETUP from '../constants/setup';
import { Button } from 'antd';
import { getStorage, resetConfig, saveToStorage } from '../utils/configManager';
// import { autoFormat } from '../contents/all';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

const defaultConfig = {
  duplicatedPunctuations: true,
  fullWidthCharsAndFollowingSpaces: true,
  halfWidthCharsAndFollowingSpaces: true,
  addSpacesBetweenChineseCharAndAlphabeticalChar: true,
  autoFormat: false,
  useSimpleQuotation: true,
};

const App = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();
  const [config, setConfig] = useState<{
    [key: string]: boolean;
  }>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setActiveTab(tabs[0]);
    });
    initConfig();
  }, []);

  const initConfig = () => {
    getStorage(SETUP.STORAGE_KEY, (res) => {
      /* TODO: Fix Eslint Gap: 我去居然没法用 Optional Operator */
      const _config =
        res && res[SETUP.STORAGE_KEY] && Object.keys(res[SETUP.STORAGE_KEY]).length > 0
          ? res[SETUP.STORAGE_KEY]
          : defaultConfig;
      setConfig(_config);
    });
  };

  const formatDocument = () => {
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, {
        type: MESSAGE.FORMAT,
      });
    }
  };

  const configOnChange = ({ key, value }: { key: string; value: any }) => {
    const _config = { ...config };
    _config[key] = value;
    const _storage: { [key: string]: any } = {};
    _storage[SETUP.STORAGE_KEY] = _config;
    setConfig(_config);
    saveToStorage(_storage);
  };

  return (
    <Layout className="app">
      <Row>
        <Col flex="auto" className="header">
          <Title className="title" level={3}>
            {SETUP.NAME}
          </Title>
        </Col>
      </Row>
      <Content>
        {['feature', 'config'].map((configKey) => {
          return (
            <>
              <Divider className="divider">{settings[configKey].name}</Divider>
              {settings[configKey].items.map((e) => {
                return (
                  <Row key={e.key}>
                    <Col span={18}>
                      <Text strong>{e.desc}</Text>
                      {e.tooltip && (
                        <Text strong>
                          <Tooltip
                            title={e.tooltip.map((e) => (
                              <>
                                {e}
                                <br />
                              </>
                            ))}
                          >
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </Text>
                      )}
                    </Col>
                    <Col span={6}>
                      <Switch
                        checked={config && config[e.key]}
                        defaultChecked
                        onClick={(checked: boolean) => {
                          configOnChange({ key: e.key, value: checked });
                        }}
                      />
                    </Col>
                  </Row>
                );
              })}
            </>
          );
        })}
        <Row>
          <Col>
            {[
              {
                title: '手动激活',
                onClick: formatDocument,
              },
              {
                title: '恢复默认',
                onClick: resetConfig,
              },
            ].map((btn) => (
              <Button onClick={btn.onClick}>{btn.title}</Button>
            ))}
          </Col>
        </Row>
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
