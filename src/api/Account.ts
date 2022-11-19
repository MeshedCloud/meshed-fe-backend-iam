import { Method, PageParams, requestPage } from '@/common/common';

/** 获取规则列表 GET /api/rule */
export async function getAccountList(params: PageParams & {}, options?: { [key: string]: any }) {
  return requestPage('/api/iam/account/list', Method.GET, params, options);
}
