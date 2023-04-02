import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { RoleItem } from '@/services/role/role';
import RoleForm from './RoleForm';
import { CommonStatusEnum } from '@/common/models';
import { DeleteOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deleteRole } from '@/services/role/api';
import { success } from '@/common/messages';
import GrantPermissionForm from '@/pages/Role/components/GrantPermissionForm';

const getRoleColumns = (systemOptions: any[], roleOptions: any[]): ProColumns<RoleItem>[] => {


  return [
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
      dataIndex: 'key',
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
        <RoleForm id={record.id} operate='editable' onFinish={() => action?.reload()}  systemOptions={systemOptions} roleOptions={roleOptions}/>,
        <GrantPermissionForm id={record.id} />,

        <TableDropdown
          key='actionGroup'
          onSelect={(key) => {
            switch (key) {
              case 'delete':
                confirmWarning(`是否确定删除角色【${record.name}】`, '此操作将不可逆', async () => {
                  if (record.id != null) {
                    const res = await deleteRole(record.id);
                    success(res);
                    if (res && res.success) {
                      action?.reload();
                    }
                  }

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
};

export default getRoleColumns
