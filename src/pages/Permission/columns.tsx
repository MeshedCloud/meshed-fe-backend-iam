import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { PermissionItem } from '@/models/Permission';
export const PermissionColumns: ProColumns<PermissionItem>[] = [
  {
    title: '权限',
    dataIndex: 'name',
    ellipsis: true,
    tip: '系统权限',
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
    title: '权限路径',
    dataIndex: 'uri',
    copyable: true,
    ellipsis: true,
    tip: '受控制的权限路径',
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
    title: '业务码',
    dataIndex: 'enname',
    copyable: true,
    ellipsis: true,
    tip: '权限业务码',
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
    title: '权限码',
    dataIndex: 'access',
    copyable: true,
    ellipsis: true,
    tip: '访问权限字符',
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
    title: '授权模式',
    dataIndex: 'accessMode',
    initialValue: '4',
    filters: true,
    onFilter: true,
    tip: '访问所需要的最低权限',
    valueType: 'select',
    valueEnum: {
      0: { text: '匿名', status: 'Success' },
      1: { text: '登入', status: 'Default' },
      2: { text: '授权', status: 'Error' },
      3: { text: '领域', status: 'Error' },
      4: { text: '系统', status: 'Error' },
    },
  },
  {
    title: '归属',
    dataIndex: 'owner',
    tip: '归属的系统',
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
    dataIndex: 'created',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created',
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
