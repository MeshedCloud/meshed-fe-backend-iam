import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { RoleItem } from '@/models/Role';
import RoleForm from './RoleForm';
export const RoleColumns: ProColumns<RoleItem>[] = [
  {
    title: '角色',
    dataIndex: 'name',
    ellipsis: true,
    tip: '系统角色',
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
    title: 'Key',
    dataIndex: 'enname',
    copyable: true,
    ellipsis: true,
    tip: '角色代码',
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
      <RoleForm id={record.id} operate="editable" />,
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
