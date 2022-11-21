import { Request } from '@/common/request';
import { PageParams } from '@/common/models';
import { SystemItem } from '@/models/System';

/** 获取规则列表 GET /api/system/list */
export async function getSystemList(params?: {}, options?: { [key: string]: any }) {
  return Request.getPage<SystemItem>('/api/iam/system/list', <PageParams>params, options);
}

/** 获取规则列表 GET /api/system/label */
export async function getSystemSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<SystemItem>(
    '/api/iam/system/select',
    <PageParams>params,
    (value) => {
      return { label: value.name, key: value.id };
    },
    options,
  );
}
