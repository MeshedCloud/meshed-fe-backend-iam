import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

import { getData } from '@/common/request';
import { getSystemDetails } from '@/api/System';
import { SystemItem } from '@/models/system';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
type Props = {
  operate: string;
  id?: number;
};

export default (props: Props) => {
  const [form] = Form.useForm<SystemItem>();

  return (
    <ModalForm<SystemItem>
      title={props.operate == 'addition' ? '新建系统' : '更新系统'}
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
          await getSystemDetails({ id: props.id }),
          props.id !== undefined,
          new SystemItem(),
        );
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log('props', props);
        await waitTime(2000);
        console.log('values', values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="系统名称"
          tooltip="最长为 24 位"
          placeholder="请输入系统名称"
          rules={[{ required: true, message: '请输入系统名称!' }]}
        />

        <ProFormText
          width="md"
          name="enname"
          label="Key"
          tooltip="最长为 24 位"
          placeholder="请输入系统key"
          rules={[{ required: true, message: '请输入系统key!' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea
          width="xl"
          name="description"
          label="描述"
          tooltip="最长为 200 字符"
          placeholder="请输入描述"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          initialValue={'VALID'}
          request={async () => [
            {
              value: 'VALID',
              label: '正常',
            },
            {
              value: 'INVALID',
              label: '禁用',
            },
          ]}
          width="md"
          name="status"
          tooltip="系统状态"
          label="状态"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
