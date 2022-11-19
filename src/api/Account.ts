import { request } from '@@/exports';
import { AccountList } from '@/models/Account';

/** 获取规则列表 GET /api/rule */
export async function getAccountList(
  params: {
    // query
    /** 当前的页码 */
    pageIndex?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<AccountList>('/api/iam/account/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  response.total = response.totalCount;
  return response;
}
