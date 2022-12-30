import { Request } from '@/common/request';
import type { RoleItem } from '@/models/role';
import type { PageParams } from '@/common/models';
import { RoleDetails } from '@/models/role';

/** 获取规则列表 GET /api/role/list */
export async function getRoleList(params?: {}, options?: { [key: string]: any }) {
  return Request.getDefaultTree<RoleItem>('/api/iam/role/list', <PageParams>params, options);
}

/** 获取规则列表 GET /api/role/details */
export async function getRoleDetails(
  params: { id: number | undefined },
  options?: { [key: string]: any },
) {
  if (params.id === undefined) {
    return undefined;
  }
  return Request.get<RoleDetails>('/api/iam/role/details', params, options);
}
