import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDependency, ProFormRadio,
  ProFormSelect,
  ProFormText, ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import {
  getPermissionDetails,
  savePermission,
} from '@/services/permission/api';
import { getData } from '@/common/request';
import { PermissionItem } from '@/services/permission/permission';
import { CommonStatus } from '@/common/models';
import { success } from '@/common/messages';

type Props = {
  operate: string;
  id?: number;
  onFinish?: () => void;
  systemOptions: any[];
  permissionOptions: any[];

};

export default (props: Props) => {
  const [form] = Form.useForm<PermissionItem>();

  return (
    <ModalForm<PermissionItem>
      title={props.operate == 'addition' ? '新建权限' : '更新权限'}
      trigger={
        props.operate == 'addition' ? (
          <Button type='primary'>
            <PlusOutlined />
            新建
          </Button>
        ) : (
          <Button type='link'>
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
        if (props.operate !== 'addition') {
          values.id = props.id;
        }
        if (values.accessMode !== 'EMPOWER') {
          values.access = undefined;
        }
        const res = await savePermission(values);
        if (res.success && props.onFinish) {
          await props.onFinish();
        }
        return success(res);
      }}
    >
      <ProForm.Group>
        <ProFormRadio.Group
          width='sm'
          radioType='button'
          name='accessMode'
          label='授权模式'
          tooltip='访问所需要的最低权限'
          rules={[{ required: true, message: '请选择访问所需要的最低权限!' }]}
          initialValue={'ANONYMOUS'}
          options={[
            {
              value: 'ANONYMOUS',
              label: '匿名',
            },
            {
              value: 'LOGIN',
              label: '登入',
            },
            {
              value: 'EMPOWER',
              label: '授权',
            },
          ]}
        />
        <ProFormTreeSelect
          initialValue={0}
          request={async () => [
            {
              value: 0,
              label: '主系统',
            },
            ...props.permissionOptions,
          ]}
          width='sm'
          name='parentId'
          tooltip='父权限可以拥有权限的全部权限,子权限继承父权限权限字符扩展'
          label='父权限'
          rules={[{ required: true, message: '请选择根权限!' }]}
        />
        <ProFormDependency name={['parentId']}>
          {(values) => {
            return (
              <ProFormSelect
                initialValue={0}
                hidden={values.parentId != 0}
                request={async () => [
                  {
                    value: 0,
                    label: '主系统',
                  },
                  ...props.systemOptions,
                ]}
                width='sm'
                name='ownerId'
                tooltip='用于系统中分类管理权限'
                label='归属系统'
                rules={[{ required: true, message: '请选择归属系统!' }]}
              />
            );
          }}
        </ProFormDependency>

      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width='md'
          name='name'
          label='权限名称'
          tooltip='最长为 24 位'
          placeholder='请输入权限名称'
          rules={[{ required: true, message: '请输入权限名称!' }]}
        />

        <ProFormDependency name={['accessMode']}>
          {(values) => {
            return (
              <ProFormText
                hidden={values.accessMode !== 'EMPOWER'}
                width='md'
                name='access'
                label='业务码'
                tooltip='最长为 24 位'
                placeholder='请输入业务码'
                rules={[{ warningOnly: true, message: '请输入业务码!' }]}
              />
            );
          }}
        </ProFormDependency>

      </ProForm.Group>

      <ProForm.Group>

        <ProFormText
          width='lg'
          name='uri'
          label='匹配路径'
          tooltip='最长为 24 位'
          placeholder='请输入权限路径'
          rules={[{ required: true, message: '请输入权限路径!' }]}
        />

        <ProFormRadio.Group
          width='md'
          radioType='button'
          name='status'
          label='状态'
          tooltip='权限状态'
          rules={[{ required: true, message: '请选择访问所需要的最低权限!' }]}
          initialValue={'VALID'}
          options={CommonStatus}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea
          width='xl'
          name='description'
          label='描述'
          placeholder='请输入描述'
        />

      </ProForm.Group>

    </ModalForm>
  );
};
