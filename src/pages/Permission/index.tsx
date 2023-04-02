import { EllipsisOutlined } from '@ant-design/icons';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getPermissionTreeList, getPermissionTreeSelect } from '@/services/permission/api';
import { PermissionItem } from '@/services/permission/permission';
import { getSystemSelect } from '@/services/system/api';
import PermissionForm from '@/pages/Permission/components/PermissionForm';
import getPermissionColumns from '@/pages/Permission/components/columns';

const menu = (
  <Menu
    items={[
      {
        label: '1st item',
        key: '1',
      },
      {
        label: '2nd item',
        key: '1',
      },
      {
        label: '3rd item',
        key: '1',
      },
    ]}
  />
);

export default () => {
  const actionRef = useRef<ActionType>();
  const [systemId, setSystemId] = useState('0');
  const [systemOptions,setSystemOptions] = useState<any[]>([]);
  const [permissionOptions,setPermissionOptions] = useState<any[]>([]);

  const getPermissionTreeOption = () => {

    getPermissionTreeSelect({}).then(res => {
      const permissionLabel: any[] = [];
      if (res.success && res.data) {
        permissionLabel.push(...res.data);
      }
      setPermissionOptions(permissionLabel)
    });
  };

  useEffect(() => {
    getPermissionTreeOption();
    getSystemSelect({}).then((res) => {
      const systemLabel: any[] = [];
      if (res.success && res.data) {
        systemLabel.push(...res.data);
      }
      setSystemOptions(systemLabel)
    });
  },[]);
  return (
    <PageContainer>
      <ProTable<PermissionItem>
        columns={getPermissionColumns(systemOptions,permissionOptions)}
        actionRef={actionRef}
        cardBordered
        request={getPermissionTreeList}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'permission-table',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey='id'
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={false}
        dateFormatter='string'
        headerTitle='权限管理'
        toolBarRender={() => [
          <PermissionForm operate='addition' onFinish={() => actionRef.current?.reload()}
                          systemOptions={systemOptions} permissionOptions={permissionOptions}/>,
          <Dropdown key='menu' overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
        params={{
          systemId,
        }}
        tableRender={(_, dom) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Menu
              onSelect={(e) => setSystemId(e.key as string)}
              style={{ width: 256 }}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['0']}
              mode='inline'
              items={[
                {
                  key: '0',
                  label: '全部系统',
                },
                ...systemOptions,
              ]}
            />
            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
          </div>
        )}
      />
    </PageContainer>
  );
};
