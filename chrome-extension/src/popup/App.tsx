import { hot } from 'react-hot-loader/root';
import React, { useEffect, useRef, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './App.scss';
import { Col, Collapse, Input, Layout, Row, Switch, Typography } from 'antd';
import MESSAGE from '../constants/messageTypes';
import Tooltip from 'antd/lib/tooltip';
import configurations, {
  ConfigItem,
  ConfigItemType,
  defaultConfig,
  links,
} from '../constants/config';
import SETUP from '../constants/setup';
import { Button } from 'antd';
import { getStorage, resetStorage, saveToStorage } from '../utils/configManager';
import { getActiveTab } from '../utils/tabManager';

const DEBUG = {
  ACTIVE: true,
};

const { Footer, Content } = Layout;
const { Panel } = Collapse;
const { Title, Text } = Typography;

const App = () => {
  const [config, setConfig] = useState<{
    [key: string]: any;
  }>();
  const [notification, setNotification] = useState('');
  const inputEl = useRef<Input>(null);

  if (DEBUG.ACTIVE) console.log('config: ', config);
  useEffect(() => {
    /* load saved config */
    getStorage(SETUP.STORAGE_KEY, (res) => {
      const savedConfig =
        res && res[SETUP.STORAGE_KEY] && Object.keys(res[SETUP.STORAGE_KEY]).length > 0
          ? res[SETUP.STORAGE_KEY]
          : defaultConfig;
      setConfig(savedConfig);
    });
  }, []);

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
    if (DEBUG.ACTIVE) console.log('_config: ', _config);

    const _storage: { [key: string]: any } = {};
    _storage[SETUP.STORAGE_KEY] = _config;
    saveToStorage(_storage);
    if (DEBUG.ACTIVE) console.log('_storage: ', _storage);

    setNotification('请刷新页面以新配置格式化');
  };

  const ConfigItemCol = ({ item, width }: { item: ConfigItem; width: number }) => (
    <Col span={width}>
      <Text strong>
        {item.desc}
        {'  '}
      </Text>
      {item.tooltip && (
        <Text strong>
          <Tooltip
            title={item.tooltip.map((e) => (
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
  );

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
        <Collapse bordered={false} defaultActiveKey={['0']}>
          {['features', 'settings', 'experimental'].map((configKey, index) => {
            return (
              <Panel header={configurations[configKey].name} key={index}>
                {configurations[configKey].items.map((item) => {
                  const value = config && config[item.key];
                  return item.type === ConfigItemType.Switch ? (
                    <Row key={item.key}>
                      <ConfigItemCol item={item} width={18} />
                      <Col span={6}>
                        <Switch
                          size="small"
                          checked={value}
                          defaultChecked
                          onClick={(checked: boolean) => {
                            configOnChange({ key: item.key, value: checked });
                          }}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row key={item.key}>
                      <ConfigItemCol item={item} width={24} />
                      <Col span={24}>
                        <Input.Search
                          name={item.key}
                          ref={inputEl}
                          defaultValue={config && config['keywordRegex']}
                          size="small"
                          placeholder="支持正则表达式"
                          enterButton="保存"
                          onSearch={(event) => configOnChange({ key: item.key, value: event })}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
      </Content>
      <Content>
        {/* Buttons */}
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
            // {
            //   title: '刷新页面',
            //   /* TODO: 刷新事件 */
            //   onClick: undefined,
            // },
          ].map((btn) => (
            <Col flex="1">
              <Button onClick={btn.onClick}>{btn.title}</Button>
            </Col>
          ))}
        </Row>
        <Row justify="center">
          {notification.length > 0 && (
            <Col>
              <Text type="danger">{notification}</Text>
            </Col>
          )}
        </Row>
      </Content>
      {/* Links */}
      <Footer className="footer">
        <Row>
          {links.map((e) => (
            <Col flex="1">
              <a href={e.link} target="_blank">
                {e.title}
              </a>
            </Col>
          ))}
        </Row>
      </Footer>
    </Layout>
  );
};

export default hot(App);
