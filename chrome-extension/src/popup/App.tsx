import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './App.scss';
import { Col, Divider, Layout, Row, Switch, Typography } from 'antd';
import MESSAGE from '../constants/messageTypes';
import Tooltip from 'antd/lib/tooltip';
import settings, { defaultConfig, links } from '../constants/config';
import SETUP from '../constants/setup';
import { Button } from 'antd';
import { getStorage, resetStorage, saveToStorage } from '../utils/configManager';
import { getActiveTab } from '../utils/tabManager';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [config, setConfig] = useState<{
    [key: string]: boolean;
  }>();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    getStorage(SETUP.STORAGE_KEY, (res) => {
      /* TODO: 😅 居然没法用 Optional Operator, Eslint 少了规则 */
      const _config =
        res && res[SETUP.STORAGE_KEY] && Object.keys(res[SETUP.STORAGE_KEY]).length > 0
          ? res[SETUP.STORAGE_KEY]
          : defaultConfig;
      setConfig(_config);
    });
  };

  const resetConfig = () => {
    resetStorage();
    setConfig(defaultConfig);
    setNotification('请刷新页面以新配置格式化');
  };

  const formatDocument = async () => {
    const activeTab = await getActiveTab();

    activeTab?.id &&
      chrome.tabs.sendMessage(activeTab.id, {
        type: MESSAGE.FORMAT,
        config,
      });
  };

  const configOnChange = ({ key, value }: { key: string; value: any }) => {
    const _config = { ...config };
    _config[key] = value;
    setConfig(_config);

    const _storage: { [key: string]: any } = {};
    _storage[SETUP.STORAGE_KEY] = _config;
    saveToStorage(_storage);

    setNotification('请刷新页面以新配置格式化');
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
        <Row className="text-center">
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
            <Col flex="1">
              <Button onClick={btn.onClick}>{btn.title}</Button>
            </Col>
          ))}
        </Row>
        <Row>
          {notification.length > 0 && (
            <Col>
              <Text type="danger">{notification}</Text>
            </Col>
          )}
        </Row>
      </Content>
      <Footer className="footer">
        <Row>
          {links.map((e) => (
            <Col flex="1">
              <a href={e.link}>{e.title}</a>
            </Col>
          ))}
        </Row>
      </Footer>
    </Layout>
  );
};

export default hot(App);
