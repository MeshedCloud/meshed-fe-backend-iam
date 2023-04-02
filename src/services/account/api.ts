import { Request } from '@/common/request';
import type { AccountItem } from '@/services/account/account';
import type { PageParams } from '@/common/models';
import { AccountDetail, AccountGrantRole } from '@/services/account/account';

/** 获取规则列表 GET /api/iam/account/list */
export async function getAccountList(params: {}, options?: { [key: string]: any }) {
  return await Request.getPage<AccountItem>('/api/iam/account/list', <PageParams>params, options);
}

/** 获取规则列表 GET /api/account/details */
export async function getAccountDetails(
  params: { id: number | undefined },
  options?: { [key: string]: any },
) {
  if (params.id === undefined) {
    return undefined;
  }
  return Request.get<AccountDetail>(`/api/iam/account/details/${params.id}`, params, options);
}
/** 获取规则列表 GET /api/account/role */
export async function getAccountRoles(
  params: { id: number | undefined },
  options?: { [key: string]: any },
) {
  if (params.id === undefined) {
    return undefined;
  }
  return Request.get<number[]>(`/api/iam/account/get/roles/${params.id}`, {}, options);
}

/** 保存（新增和更新）账号 POST /api/account/save */
export async function saveAccount(data: AccountDetail) {
  return Request.post('/api/iam/account/save', data);
}

/** 保存（新增和更新）账号 POST /api/account/save */
export async function grantAccountRoles(data: AccountGrantRole) {
  return Request.post('/api/iam/account/grant/roles', data);
}

/** 保存（新增和更新）账号 POST /api/account/lock */
export async function lockAccount(data: { id: number }) {
  return Request.post('/api/iam/account/lock', data);
}

/** 保存（新增和更新）账号 POST /api/account/unlock */
export async function unlockAccount(data: { id: number }) {
  return Request.post('/api/iam/account/unlock', data);
}

/** 删除账号 DELETE /api/account/delete */
export async function deleteAccount(id: number, options?: { [key: string]: any }) {
  if (id === undefined) {
    return undefined;
  }
  return Request.delete<any>(`/api/iam/account/delete/${id}`, options);
}
