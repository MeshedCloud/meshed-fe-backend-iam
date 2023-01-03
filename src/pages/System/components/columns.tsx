import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { SystemItem } from '@/models/system';
import SystemForm from './SystemForm';
import { CommonStatusEnum } from '@/common/models';
import { DeleteOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deleteSystem } from '@/api/System';
import { success } from '@/common/messages';
export const SystemColumns: ProColumns<SystemItem>[] = [
  {
    title: '系统名称',
    dataIndex: 'name',
    ellipsis: true,
    tip: '系统名称',
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
    tip: '系统代码',
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
    title: '描述',
    dataIndex: 'description',
    tip: '系统的简要说明',
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'VALID',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: CommonStatusEnum,
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
      <SystemForm id={record.id} operate="editable" />,
      <TableDropdown
        key="actionGroup"
        onSelect={(key) => {
          switch (key) {
            case 'delete':
              confirmWarning(`是否确定删除角色【${record.name}】`, '此操作将不可逆', async () => {
                const res = await deleteSystem(record.id);
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
