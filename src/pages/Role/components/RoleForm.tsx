import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { RoleDetails } from '@/models/role';
import { getPermissionTreeSelect } from '@/api/Permission';
import { getRoleDetails, getRoleTreeSelect } from '@/api/Role';
import { getData } from '@/common/request';
import { getSystemSelect } from '@/api/System';

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
  const [form] = Form.useForm<RoleDetails>();
  const roleLabel: any[] = [];
  getRoleTreeSelect({}).then((res) => {
    if (res.success && res.data) {
      roleLabel.push(...res.data);
    }
  });
  const systemLabel: any[] = [];
  getSystemSelect({}).then((res) => {
    if (res.success && res.data) {
      systemLabel.push(...res.data);
    }
  });
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
        enname: '',
        owner: 0,
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
        console.log(props);
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
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
            ...roleLabel,
          ]}
          width="md"
          name="parentId"
          tooltip="父角色可以拥有角色的全部权限,子角色继承父角色权限字符扩展"
          label="父角色"
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
                  ...systemLabel,
                ]}
                width="md"
                name="owner"
                tooltip="用于系统中分类管理角色"
                label="归属系统"
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
        />

        <ProFormText width="md" name="enname" label="角色业务码" placeholder="请输入角色业务码" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTreeSelect
          tooltip="授予角色权限"
          label="授权"
          name="assess"
          placeholder="请选择授与的权限"
          allowClear
          width={330}
          secondary
          request={async () => {
            const res = await getPermissionTreeSelect({});
            return res.success && res.data ? res.data : [];
          }}
          // tree-select args
          fieldProps={{
            treeCheckable: true,
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            dropdownMatchSelectWidth: false,
            labelInValue: true,
            autoClearSearchValue: true,
            multiple: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
            },
          }}
        />

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
          tooltip="角色状态"
          label="状态"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
