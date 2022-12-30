import { EllipsisOutlined } from '@ant-design/icons';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu } from 'antd';
import { useRef, useState } from 'react';
import { PermissionColumns } from '@/pages/Permission/components/columns';
import { getPermissionTreeList } from '@/api/Permission';
import { PermissionItem } from '@/models/permission';
import { getSystemSelect } from '@/api/System';
import PermissionForm from '@/pages/Permission/components/PermissionForm';

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
  const systemLabel: any[] = [];
  getSystemSelect({}).then((res) => {
    if (res.success && res.data) {
      systemLabel.push(...res.data);
    }
  });
  return (
    <PageContainer>
      <ProTable<PermissionItem>
        columns={PermissionColumns}
        actionRef={actionRef}
        cardBordered
        request={getPermissionTreeList}
        postData={(data) => {
          console.log(data);
          return data;
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
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
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="权限管理"
        toolBarRender={() => [
          <PermissionForm operate="addition" />,
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
                ...systemLabel,
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
