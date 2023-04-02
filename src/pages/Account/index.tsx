import { EllipsisOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu } from 'antd';
import { useRef } from 'react';
import { AccountItem } from '@/services/account/account';
import { getAccountList } from '@/services/account/api';
import { AccountColumns } from '@/pages/Account/components/columns';
import AccountForm from '@/pages/Account/components/AccountForm';

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
  return (
    <PageContainer>
      <ProTable<AccountItem>
        columns={AccountColumns}
        actionRef={actionRef}
        cardBordered
        request={getAccountList}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'account-table',
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
        pagination={{
          showSizeChanger: true,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="账号管理"
        toolBarRender={() => [
          <AccountForm operate="addition" onFinish={() => actionRef.current?.reload()} />,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>
  );
};
