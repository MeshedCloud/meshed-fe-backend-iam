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

/** 获取规则列表 GET /api/role/label */
export async function getRoleTreeSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<any>(
    '/api/iam/role/select',
    <PageParams>params,
    (value) => {
      return { title: value.name + `(${value.enname})`, value: value.id, ...value };
    },
    options,
  );
}

/** 保存（新增和更新）角色 POST /api/role/save */
export async function saveRole(data: RoleDetails) {
  return Request.post('/api/iam/role/save', data);
}

/** 删除角色 DELETE /api/role/delete */
export async function deleteRole(id: number, options?: { [key: string]: any }) {
  if (id === undefined) {
    return undefined;
  }
  return Request.delete<any>(`/api/iam/role/delete/${id}`, options);
}
