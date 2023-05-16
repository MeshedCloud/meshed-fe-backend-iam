import { EllipsisOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getRoleTreeList, getRoleTreeSelect } from '@/services/role/api';
import { RoleItem } from '@/services/role/role';
import RoleForm from '@/pages/Role/components/RoleForm';
import { getSystemSelect } from '@/services/system/api';
import getRoleColumns from '@/pages/Role/components/columns';

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
  const [systemId, setSystemId] = useState('0');
  const [systemOptions,setSystemOptions] = useState<any[]>([]);
  const [roleOptions,setRoleOptions] = useState<any[]>([]);
  const getRoleTreeOption = () => {
    getRoleTreeSelect({}).then((res) => {
      const roleLabel: any[] = [];
      if (res.success && res.data) {
        roleLabel.push(...res.data);
      }
      setRoleOptions(roleLabel)
    });
  }
  useEffect(() => {
    //获取角色选项
    getRoleTreeOption();
    //获取权限选项
    getSystemSelect({}).then((res) => {
      const systemLabel: any[] = [];
      if (res.success && res.data) {
        systemLabel.push(...res.data);
      }
      setSystemOptions(systemLabel);
    });
  },[])

  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<RoleItem>
        columns={getRoleColumns(systemOptions,roleOptions)}
        actionRef={actionRef}
        cardBordered
        request={getRoleTreeList}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'role-table',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <RoleForm operate="addition" systemOptions={systemOptions} roleOptions={roleOptions} onFinish={() =>  actionRef.current?.reload()}/>,

          <Dropdown key="menu" overlay={menu}>
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
              mode="inline"
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
