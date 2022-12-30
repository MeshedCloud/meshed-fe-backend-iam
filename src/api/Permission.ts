import { Request } from '@/common/request';
import type { PermissionItem } from '@/models/permission';
import type { PageParams } from '@/common/models';
import { SystemItem } from '@/models/system';

/** 获取规则列表 GET /api/iam/permission/list */
export async function getPermissionList(params: {}, options?: Record<string, any>) {
  return await Request.getDefaultTree<PermissionItem>(
    '/api/iam/permission/list',
    <PageParams>params,
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionTreeSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<SystemItem>(
    '/api/iam/permission/select',
    <PageParams>params,
    (value) => {
      console.log('getConvertTree', value);
      return { title: value.name + `(${value.access})`, value: value.id, ...value };
    },
    options,
  );
}

/** 获取规则列表 GET /api/permission/label */
export async function getPermissionSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getConvertTree<SystemItem>(
    '/api/iam/permission/select',
    <PageParams>params,
    (value) => {
      return { label: value.name, key: value.id, ...value };
    },
    options,
  );
}
