import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { AccountItem } from '@/services/account/account';
import { Space, Tooltip } from 'antd';
import { CommonStatusEnum } from '@/common/models';
import AccountForm from '@/pages/Account/components/AccountForm';
import { DeleteOutlined, LockOutlined, UnlockOutlined, WarningOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deleteAccount, lockAccount, unlockAccount } from '@/services/account/api';
import { success } from '@/common/messages';
import GrantRoleForm from '@/pages/Account/components/GrantRoleForm';

export const AccountColumns: ProColumns<AccountItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户账号',
    dataIndex: 'loginId',
    copyable: true,
    ellipsis: true,
    tip: '登入账号',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => (
      <Space>
        {
          <>
            <a>{_}</a>
            <Tooltip title={'该账号已经被锁定'}>
              <WarningOutlined
                style={{ color: 'red' }}
                hidden={!record.locked}
                twoToneColor="#ff4d4f"
              />
            </Tooltip>
          </>
        }
      </Space>
    ),
  },
  {
    title: '用户名称',
    dataIndex: 'realName',
    ellipsis: true,
    tip: '登入账号',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
    tip: '手机号',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => (
      <Space>
        {
          <>
            <a>{_}</a>
            {/*<Tag color={record.validPhone ? 'success' : 'processing'}>*/}
            {/*  {record.validPhone ? '已校验' : '未校验'}*/}
            {/*</Tag>*/}
          </>
        }
      </Space>
    ),
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    tip: '点击邮箱可以快速发送邮件',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => (
      <Space>
        {
          <>
            <a href={`mailto:${record.email}`}>{_}</a>
            {/*<Tag color={record.validEmail ? 'success' : 'processing'}>*/}
            {/*  {record.validEmail ? '已校验' : '未校验'}*/}
            {/*</Tag>*/}
          </>
        }
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: CommonStatusEnum,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <AccountForm id={record.id} operate="editable" onFinish={()=> action?.reload()}/>,
      <GrantRoleForm id={record.id} />,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          switch (key) {
            case 'lock':
              confirmWarning(
                `是否确定锁定用户【${record.loginId}】`,
                '锁定后用户将无法进行操作',
                async () => {
                  if (record.id){
                    const res = await lockAccount({ id: record.id });
                    success(res);
                    if (res.success){
                      action?.reload();
                    }
                  }
                },
              );
              break;
            case 'unlock':
              confirmWarning(
                `是否确定解锁用户【${record.loginId}】`,
                '解锁后用户将恢复正常使用',
                async () => {
                  if (record.id){
                    const res = await unlockAccount({ id: record.id });
                    success(res);
                    if (res.success){
                      action?.reload();
                    }
                  }

                },
              );
              break;
            case 'delete':
              confirmWarning(
                `是否确定删除用户【${record.loginId}】`,
                '此操作将不可逆',
                async () => {
                  if (record.id){
                    const res = await deleteAccount(record.id);
                    success(res);
                    if (res && res.success){
                      action?.reload();
                    }
                  }

                },
              );
              break;
          }

        }}
        menus={[
          {
            key: 'lock',
            name: '锁定',
            icon: <LockOutlined />,
            hidden: record.status !== 'VALID',
            danger: true,
          },
          {
            key: 'unlock',
            name: '恢复',
            icon: <UnlockOutlined />,
            hidden: record.status === 'VALID',
            danger: true,
          },
          { key: 'delete', name: '删除', icon: <DeleteOutlined />, danger: true },
        ]}
      />,
    ],
  },
];
