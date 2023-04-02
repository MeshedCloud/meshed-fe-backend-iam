import type { ProColumns } from '@ant-design/pro-components';
import { TableDropdown } from '@ant-design/pro-components';
import type { PermissionItem } from '@/services/permission/permission';
import PermissionForm from '@/pages/Permission/components/PermissionForm';
import { CommonStatusEnum } from '@/common/models';
import { DeleteOutlined } from '@ant-design/icons';
import { confirmWarning } from '@/common/confirms';
import { deletePermission } from '@/services/permission/api';
import { success } from '@/common/messages';

const getPermissionColumns = ( systemOptions: any[], permissionOptions: any[] ): ProColumns<PermissionItem>[] => {

  return [
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
      tip: '访问所需要的最低权限',
      valueType: 'select',
      valueEnum: {
        ANONYMOUS: { text: '匿名', status: 'Success' },
        LOGIN: { text: '登入', status: 'Default' },
        EMPOWER: { text: '授权', status: 'Error' },
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
        <PermissionForm id={record.id} operate="editable" onFinish={()=> action?.reload()}
                        systemOptions={systemOptions} permissionOptions={permissionOptions}/>,
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => {
            switch (key) {
              case 'delete':
                confirmWarning(`是否确定删除权限【${record.name}】`, '此操作将不可逆', async () => {
                  if (record.id != null) {
                    const res = await deletePermission(record.id);
                    success(res);
                    if (res && res.success){
                      action?.reload()
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

}
export default getPermissionColumns
