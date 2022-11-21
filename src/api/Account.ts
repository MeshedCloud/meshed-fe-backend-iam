import { Request } from '@/common/request';
import type { AccountItem } from '@/models/Account';
import type { PageParams } from '@/common/models';

/** 获取规则列表 GET /api/iam/account/list */
export async function getAccountList(params: {}, options?: { [key: string]: any }) {
  return await Request.getPage<AccountItem>('/api/iam/account/list', <PageParams>params, options);
}
