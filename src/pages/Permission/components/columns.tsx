import type { ProColumns } from '@ant-design/pro-components';
import { TableDropdown } from '@ant-design/pro-components';
import type { PermissionItem } from '@/models/permission';
import PermissionForm from '@/pages/Permission/components/PermissionForm';
import { CommonStatusEnum } from '@/common/models';
import { DeleteOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deletePermission } from '@/api/Permission';
import { success } from '@/common/messages';
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
    dataIndex: 'createTime',
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
      <PermissionForm id={record.id} operate="editable" />,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          switch (key) {
            case 'delete':
              confirmWarning(`是否确定删除权限【${record.name}】`, '此操作将不可逆', async () => {
                const res = await deletePermission(record.id);
                success(res);
              });
              break;
          }
          action?.reload();
        }}
        menus={[{ key: 'delete', name: '删除', icon: <DeleteOutlined />, danger: true }]}
      />,
    ],
  },
];
