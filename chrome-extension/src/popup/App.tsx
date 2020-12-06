import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './App.scss';
import { Col, Divider, Layout, Row, Switch, Typography } from 'antd';
import MESSAGE from '../constants/messageTypes';
import Tooltip from 'antd/lib/tooltip';
import settings from '../constants/config';
import SETUP from '../constants/setup';
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
    init();
  }, []);

  const init = () => {
    chrome.storage.sync.get(SETUP.STORAGE_KEY, (res) => {
      /* TODO: Fix Eslint Gap: I cannot use optional operator here ! */
      const _config =
        res && res[SETUP.STORAGE_KEY] && Object.keys(res[SETUP.STORAGE_KEY]).length > 0
          ? res[SETUP.STORAGE_KEY]
          : defaultConfig;
      setConfig(_config);
    });
  };

  const saveConfigToStorage = (_storage: { [key: string]: any }) => {
    chrome.storage.sync.set(_storage);
  };

  const formatButtonOnClick = () => {
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, {
        type: MESSAGE.FORMAT,
      });
    }
    chrome.storage.sync.clear();
  };

  const configOnChange = ({ key, value }: { key: string; value: any }) => {
    const _config = { ...config };
    _config[key] = value;
    const _storage: { [key: string]: any } = {};
    _storage[SETUP.STORAGE_KEY] = _config;
    setConfig(_config);
    saveConfigToStorage(_storage);
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
        <button onClick={formatButtonOnClick} type="button">
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
