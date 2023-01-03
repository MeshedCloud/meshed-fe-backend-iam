import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, Tag } from 'antd';
import {
  getPermissionAllList,
  getPermissionDetails,
  getPermissionTreeSelect,
  savePermission,
} from '@/api/Permission';
import { getData } from '@/common/request';
import { PermissionItem } from '@/models/permission';
import { getSystemSelect } from '@/api/System';
import { CommonStatus } from '@/common/models';
import { success } from '@/common/messages';

type Props = {
  operate: string;
  id?: number;
};

export default (props: Props) => {
  const [form] = Form.useForm<PermissionItem>();

  const systemLabel: any[] = [];
  getSystemSelect({}).then((res) => {
    if (res.success && res.data) {
      systemLabel.push(...res.data);
    }
  });

  const permissionMap = new Map();
  getPermissionAllList({}).then((res) => {
    if (res.success && res.data) {
      for (const item of res.data) {
        permissionMap.set(item.id, item);
      }
    }
  });
  return (
    <ModalForm<PermissionItem>
      title={props.operate == 'addition' ? '新建权限' : '更新权限'}
      trigger={
        props.operate == 'addition' ? (
          <Button type="primary">
            <PlusOutlined />
            新建
          </Button>
        ) : (
          <Button type="link">
            <EditOutlined />
            编辑
          </Button>
        )
      }
      initialValues={{
        parentId: 0,
        name: '',
        enname: '',
        owner: 0,
        description: '',
      }}
      form={form}
      request={async () => {
        return getData(
          await getPermissionDetails({ id: props.id }),
          props.id !== undefined,
          new PermissionItem(),
        );
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const res = await savePermission(values);
        return success(res);
      }}
    >
      <ProForm.Group>
        <ProFormTreeSelect
          initialValue={0}
          request={async () => {
            const accessMode: Number[] = [0, 1, 2, 3];
            const res = await getPermissionTreeSelect({ accessMode });
            const root: any = {
              value: 0,
              title: '主系统',
            };
            if (res.success && res.data) {
              res.data.unshift(root);
            }
            return res.success && res.data ? res.data : root;
          }}
          width="md"
          name="parentId"
          tooltip="父权限可以拥有权限的全部权限,子权限继承父权限权限字符扩展"
          label="父权限"
          rules={[{ required: true, message: '请选择根权限!' }]}
        />
        <ProFormDependency name={['parentId']}>
          {(values) => {
            return (
              <ProFormSelect
                initialValue={0}
                hidden={values['parentId'] != 0}
                request={async () => [
                  {
                    value: 0,
                    label: '主系统',
                  },
                  ...systemLabel,
                ]}
                width="md"
                name="owner"
                tooltip="用于系统中分类管理权限"
                label="归属系统"
                rules={[{ required: true, message: '请选择归属系统!' }]}
              />
            );
          }}
        </ProFormDependency>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="权限名称"
          tooltip="最长为 24 位"
          placeholder="请输入权限名称"
          rules={[{ required: true, message: '请输入权限名称!' }]}
        />

        <ProFormText
          width="md"
          name="uri"
          label="权限路径"
          tooltip="最长为 24 位"
          placeholder="请输入权限路径"
          rules={[{ required: true, message: '请输入权限路径!' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="enname"
          label="业务码"
          tooltip="最长为 24 位"
          placeholder="请输入业务码"
          rules={[{ required: true, message: '请输入业务码!' }]}
        />
        <ProFormDependency name={['parentId', 'enname']}>
          {(values) => {
            const parentId = values['parentId'];
            const enname = values['enname'];
            const item = parentId != undefined ? permissionMap.get(parentId) : undefined;

            return (
              <ProForm.Item label="权限码" hidden={item == undefined && enname == undefined}>
                <Tag color="cyan-inverse">
                  {item != undefined
                    ? item.access + ':' + (enname == undefined ? '?' : enname.toUpperCase())
                    : enname}
                </Tag>
              </ProForm.Item>
            );
          }}
        </ProFormDependency>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: '0',
              label: '匿名',
            },
            {
              value: '1',
              label: '登入',
            },
            {
              value: '2',
              label: '授权',
            },
            {
              value: '3',
              label: '领域',
            },
            {
              value: '4',
              label: '系统',
            },
          ]}
          width="md"
          name="accessMode"
          tooltip="访问所需要的最低权限"
          label="授权模式"
          rules={[{ required: true, message: '请选择访问所需要的最低权限!' }]}
        />

        <ProFormSelect
          initialValue={'VALID'}
          request={async () => CommonStatus}
          width="md"
          name="status"
          tooltip="权限状态"
          label="状态"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
