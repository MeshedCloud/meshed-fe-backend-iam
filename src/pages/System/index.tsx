import { ProList } from '@ant-design/pro-components';
import { SystemItem } from '@/services/system/system';
import { SystemMetas } from '@/pages/System/components/metas';
import { getSystemList } from '@/services/system/api';
import SystemForm from '@/pages/System/components/SystemForm';

export default () => {
  return (
    <ProList<SystemItem>
      toolBarRender={() => {
        return [<SystemForm operate="addition" />];
      }}
      search={{}}
      rowKey="name"
      size={'large'}
      headerTitle="系统"
      request={getSystemList}
      pagination={{
        pageSize: 5,
      }}
      showActions="hover"
      metas={SystemMetas}
    />
  );
};
