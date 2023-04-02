import { EditOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

import { getData } from '@/common/request';
import { AccountDetail } from '@/services/account/account';
import { getAccountDetails, saveAccount } from '@/services/account/api';
import { success } from '@/common/messages';

type Props = {
  operate: string;
  id?: number;
  onFinish?: () => void
};

export default (props: Props) => {
  const [form] = Form.useForm<AccountDetail>();

  return (
    <ModalForm<AccountDetail>
      title={props.operate == 'addition' ? '新建账号' : '更新账号'}
      trigger={
        props.operate == 'addition' ? (
          <Button type="primary">
            <UsergroupAddOutlined />
            新建
          </Button>
        ) : (
          <Button type="link">
            <EditOutlined />
            编辑
          </Button>
        )
      }
      form={form}
      request={async () => {
        return getData(
          await getAccountDetails({ id: props.id }),
          props.id !== undefined,
          new AccountDetail(),
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
        const res = await saveAccount(values);
        if (res.success && props.onFinish){
          await props.onFinish();
        }
        return success(res);
      }}

    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="realName"
          label="账号名称"
          tooltip="最长为 24 位"
          placeholder="请输入账号名称"
          rules={[{ required: true, message: '请输入账号名称!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          hidden={props.operate != 'addition'}
          width="md"
          name="loginId"
          label="账号名称"
          tooltip="最长为 24 位"
          placeholder="请输入账号名称"
          rules={[{ required: true, message: '请输入账号名称!' }]}
        />

        <ProFormText.Password
          hidden={props.operate != 'addition'}
          width="md"
          name="secretKey"
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="phone"
          label="手机号"
          tooltip="请输入11位合法的手机号"
          placeholder="请输入手机号"
          rules={[{ message: '请输入11位合法的手机号!' }]}
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          tooltip="请输入合法的邮箱，最长支持32位"
          placeholder="请输入邮箱"
          rules={[{ type: 'email', message: '请输入合法的邮箱，最长支持32位!' }]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
