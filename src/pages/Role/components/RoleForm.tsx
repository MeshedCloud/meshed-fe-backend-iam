import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText, ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { RoleDetails } from '@/services/role/role';
import { getRoleDetails, saveRole } from '@/services/role/api';
import { getData } from '@/common/request';
import { CommonStatus } from '@/common/models';
import { success } from '@/common/messages';

type Props = {
  operate: string;
  id?: number;
  onFinish?: () => void;
  systemOptions: any[];
  roleOptions: any[];
};

export default (props: Props) => {
  const [form] = Form.useForm<RoleDetails>();

  return (
    <ModalForm<RoleDetails>
      title={props.operate == 'addition' ? '新建角色' : '更新角色'}
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
        key: '',
        ownerId: 0,
        description: '',
      }}
      form={form}
      request={async () => {
        return getData(
          await getRoleDetails({ id: props.id }),
          props.id !== undefined,
          new RoleDetails(),
        );
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        if (props.operate !== 'addition'){
          values.id = props.id
        }
        const res = await saveRole(values);
        if (res.success && props.onFinish){
          await props.onFinish();
        }
        return success(res);
      }}
    >
      <ProForm.Group>
        <ProFormTreeSelect
          initialValue={0}
          request={async () => [
            {
              value: 0,
              label: '主系统',
            },
            ...props.roleOptions,
          ]}
          width="md"
          name="parentId"
          tooltip="父角色可以拥有角色的全部权限,子角色继承父角色权限字符扩展"
          label="父角色"
          rules={[{ required: true, message: '请选择父角色!' }]}
        />
        <ProFormDependency name={['parentId']}>
          {(values) => {
            return (
              <ProFormSelect
                hidden={values['parentId'] != 0}
                initialValue={0}
                request={async () => [
                  {
                    value: 0,
                    label: '主系统',
                  },
                  ...props.systemOptions,
                ]}
                width="md"
                name="ownerId"
                tooltip="用于系统中分类管理角色"
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
          label="角色名称"
          tooltip="最长为 24 位"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: '请输入角色名称!' }]}
        />

        <ProFormText
          width="md"
          name="key"
          label="角色标识"
          placeholder="请输入角色标识"
          rules={[{ required: true, message: '请输入角色标识!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          hidden={props.operate === 'addition'}
          initialValue={'VALID'}
          request={async () => CommonStatus}
          width="md"
          name="status"
          tooltip="角色状态"
          label="状态"
          rules={[{ required: true, message: '请选择状态!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="description"
          label="描述"
          placeholder="请输入描述"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
