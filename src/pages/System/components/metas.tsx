import { Button, Space, Tag } from 'antd';
import { ProListMetas } from '@ant-design/pro-list';
import { SystemItem, SystemItemStatusEnum } from '@/services/system/system';
import SystemForm from '@/pages/System/components/SystemForm';
import { confirmWarning } from '@/common/confirms';
import { deleteSystem } from '@/services/system/api';
import { success, tips } from '@/common/messages';
import { DeleteOutlined } from '@ant-design/icons';

export const SystemMetas: ProListMetas<SystemItem> = {
  title: {
    dataIndex: 'name',
    title: '系统名称',
  },
  description: {
    dataIndex: 'description',
    search: false,
  },
  subTitle: {
    dataIndex: 'key',
    render: (_, row) => {
      return (
        <Space size={0}>
          <Tag color="blue" hidden={_ == undefined}>
            {_ == undefined ? '' : _.toString().toUpperCase()}
          </Tag>
          {/*SystemItemStatusEnum[]*/}
          {row.status != undefined && SystemItemStatusEnum[row.status] != undefined ? (
            <Tag color={SystemItemStatusEnum[row.status].color}>
              {SystemItemStatusEnum[row.status].text}
            </Tag>
          ) : (
            <Tag color="red">异常</Tag>
          )}
        </Space>
      );
    },
    search: false,
  },
  actions: {
    //text, row
    render: (text, record, _, action) => [
      <SystemForm id={record.id} operate="editable" />,
      <Button
        type="link"
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          if (record.status != 'OFFLINE') {
            tips('系统未下线无法进行删除');
            return;
          }
          confirmWarning(`是否确定删除角色【${record.name}】`, '此操作将不可逆', async () => {
            if (record.id != null) {
              const res = await deleteSystem(record.id);
              success(res);
            }

          });
          action?.reload();
        }}
      >
        丢弃
      </Button>,
    ],
    search: false,
  },
  enname: {
    // 自己扩展的字段，主要用于筛选，不在列表中显示
    title: '系统标识',
  },
  status: {
    // 自己扩展的字段，主要用于筛选，不在列表中显示
    title: '状态',
    valueType: 'select',
    valueEnum: SystemItemStatusEnum,
  },
};
