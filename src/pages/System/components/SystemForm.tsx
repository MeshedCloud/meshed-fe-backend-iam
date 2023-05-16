import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

import { saveSystem } from '@/services/system/api';
import { SystemItem } from '@/services/system/system';
import { success } from '@/common/messages';

type Props = {
  operate: string;
  id?: number;
  onFinish?: () => void;
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
        key: '',
        owner: 0,
        description: '',
      }}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const res = await saveSystem(values);
        if (res.success && props.onFinish){
          await props.onFinish();
        }
        return success(res);
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="name"
          label="系统名称"
          tooltip="最长为 24 位"
          placeholder="请输入系统名称"
          rules={[{ required: true, message: '请输入系统名称!' }]}
        />

        <ProFormText
          width="sm"
          name="key"
          label="Key"
          tooltip="最长为 24 位"
          placeholder="请输入系统key"
          rules={[{ required: true, message: '请输入系统key!' }]}
        />
        <ProFormRadio.Group
          width="sm"
          radioType="button"
          name="type"
          label="系统类型"
          initialValue={"SERVICE"}
          options={[
            {
              label: '服务',
              value: 'SERVICE',
            },
            {
              label: '授权',
              value: 'EMPOWER',
            },
          ]}
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
    </ModalForm>
  );
};
