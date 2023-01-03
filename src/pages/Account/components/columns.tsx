import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { AccountItem } from '@/models/account';
import { Space, Tag, Tooltip } from 'antd';
import { CommonStatusEnum } from '@/common/models';
import AccountForm from '@/pages/Account/components/AccountForm';
import { DeleteOutlined, LockOutlined, UnlockOutlined, WarningOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deleteAccount, lockAccount, unlockAccount } from '@/api/Account';
import { success } from '@/common/messages';

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
            <Tag color={record.validPhone ? 'success' : 'processing'}>
              {record.validPhone ? '已校验' : '未校验'}
            </Tag>
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
            <Tag color={record.validEmail ? 'success' : 'processing'}>
              {record.validEmail ? '已校验' : '未校验'}
            </Tag>
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
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <AccountForm id={record.id} operate="editable" />,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          switch (key) {
            case 'lock':
              confirmWarning(
                `是否确定锁定用户【${record.loginId}】`,
                '锁定后用户将无法进行操作',
                async () => {
                  const res = await lockAccount({ id: record.id });
                  success(res);
                },
              );
              break;
            case 'unlock':
              confirmWarning(
                `是否确定解锁用户【${record.loginId}】`,
                '解锁后用户将恢复正常使用',
                async () => {
                  const res = await unlockAccount({ id: record.id });
                  success(res);
                },
              );
              break;
            case 'delete':
              confirmWarning(
                `是否确定删除用户【${record.loginId}】`,
                '此操作将不可逆',
                async () => {
                  const res = await deleteAccount(record.id);
                  success(res);
                },
              );
              break;
          }
          action?.reload();
        }}
        menus={[
          {
            key: 'lock',
            name: '锁定',
            icon: <LockOutlined />,
            hidden: record.locked,
            danger: true,
          },
          {
            key: 'unlock',
            name: '解锁',
            icon: <UnlockOutlined />,
            hidden: !record.locked,
            danger: true,
          },
          { key: 'delete', name: '删除', icon: <DeleteOutlined />, danger: true },
        ]}
      />,
    ],
  },
];
