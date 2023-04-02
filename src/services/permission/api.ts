import { Request } from '@/common/request';
import type { PermissionItem } from './permission';

/** 获取规则列表 GET /api/iam/permission/tree/list */
export async function getPermissionTreeList(params: {}, options?: Record<string, any>) {
  return await Request.getDefaultTree<PermissionItem>(
    '/api/iam/permission/list',
    params,
    options,
  );
}

/** 获取规则列表 GET /api/iam/permission/list */
export async function getPermissionAllList(params: {}, options?: Record<string, any>) {
  return await Request.getList<PermissionItem>(
    '/api/iam/permission/list',
    params,
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionTreeSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertNeedParentTree<any>(
    '/api/iam/permission/select',
    params,
    (value) => {
      return { title: value.name + `(${value.access})`, value: value.id, key: String(value.id), ...value };
    },
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<any>(
    '/api/iam/permission/select',
    params,
    (value) => {
      return { label: value.name, key: value.id, ...value };
    },
    options,
  );
}

/** 获取规则列表 GET /api/permission/details */
export async function getPermissionDetails(
  params: { id: number | undefined },
  options?: { [key: string]: any },
) {
  if (params.id === undefined) {
    return undefined;
  }
  return Request.get<PermissionItem>(`/api/iam/permission/details/${params.id}`, {}, options);
}

/** 保存（新增和更新）权限 POST /api/permission/save */
export async function savePermission(data: PermissionItem) {
  return Request.post<any>('/api/iam/permission/save', data);
}

/** 删除权限 DELETE /api/permission/delete */
export async function deletePermission(id: number, options?: { [key: string]: any }) {
  if (id === undefined) {
    return undefined;
  }
  return Request.delete<any>(`/api/iam/permission/delete/${id}`, options);
}
