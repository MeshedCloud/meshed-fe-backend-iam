import { SafetyCertificateOutlined } from '@ant-design/icons';
import {
  ModalForm,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';

import { AccountDetail } from '@/services/account/account';
import { getAccountRoles, grantAccountRoles } from '@/services/account/api';
import { success } from '@/common/messages';
import { DataNode } from 'antd/lib/tree';

import { useState } from 'react';
import TreeTransfer from '@/common/transfer';
import { getRoleTreeSelect } from '@/services/role/api';

type Props = {
  id?: number;
};

const treeData: DataNode[] = [];
export default (props: Props) => {
  const [form] = Form.useForm<AccountDetail>();
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const onChange = (keys: string[]) => {
    setTargetKeys(keys);
  };

  return (
    <ModalForm<any>
      title={'授权用户角色'}
      trigger={
        <Button type='link'>
          <SafetyCertificateOutlined />
          授权
        </Button>
      }
      form={form}
      request={async () => {
        getRoleTreeSelect({}).then(res => {
          if (res.success && res.data) {
            treeData.length = 0;
            treeData.push(...res.data);
          }
        });

        getAccountRoles({ id: props.id }).then(res => {
          if (res != undefined && res.success && res.data) {
            const keys = [];
            if (res.data.length > 0) {
              for (const id of res.data) {
                keys.push(String(id));
              }
            }
            setTargetKeys(keys);
          }
        });

        return true
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setTargetKeys([]),
      }}
      submitTimeout={2000}
      onFinish={async () => {
        console.log(targetKeys);
        const res = await grantAccountRoles({
          id: props.id,
          roles: targetKeys,
        });
        setTargetKeys([]);
        return success(res);
      }}

    >
      <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} oneWay defaultExpandAll />

    </ModalForm>
  );
};
