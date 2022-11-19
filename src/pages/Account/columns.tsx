import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { AccountItem } from '@/models/Account';
import { Space, Tag } from 'antd';
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
    initialValue: 'VALID',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      VALID: { text: '正常', status: 'Success' },
      INVALID: { text: '失效', status: 'Default' },
      DELETE: { text: '删除', status: 'Error' },
    },
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
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];
