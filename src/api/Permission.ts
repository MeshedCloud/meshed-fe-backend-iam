import { Request } from '@/common/request';
import type { PermissionItem } from '@/models/permission';
import type { PageParams } from '@/common/models';

/** 获取规则列表 GET /api/iam/permission/tree/list */
export async function getPermissionTreeList(params: {}, options?: Record<string, any>) {
  return await Request.getDefaultTree<PermissionItem>(
    '/api/iam/permission/list',
    <PageParams>params,
    options,
  );
}

/** 获取规则列表 GET /api/iam/permission/list */
export async function getPermissionAllList(params: {}, options?: Record<string, any>) {
  return await Request.getList<PermissionItem>(
    '/api/iam/permission/list',
    <PageParams>params,
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionTreeSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<any>(
    '/api/iam/permission/select',
    <PageParams>params,
    (value) => {
      return { title: value.name + `(${value.access})`, value: value.id, ...value };
    },
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<any>(
    '/api/iam/permission/select',
    <PageParams>params,
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
  return Request.get<PermissionItem>('/api/iam/permission/details', params, options);
}
