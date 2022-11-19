import { request } from '@@/exports';

export type PageInfo<T> = {
  data?: T[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
  empty: boolean;
  errCode: string;
  errMessage: string;
  notEmpty: boolean;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type PageParams = {
  // query
  /** 当前的页码 */
  current: number;
  /** 当前的页码 */
  pageIndex?: number;
  /** 页面的容量 */
  pageSize?: number;
};

export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export async function requestPage<T>(
  uri: string,
  method: Method,
  params: PageParams & {},
  options?: { [key: string]: any },
) {
  params.pageIndex = params.current;
  const response = await request<PageInfo<T>>(uri, {
    method,
    params: {
      ...params,
    },
    ...(options || {}),
  });
  response.total = response.totalCount;
  return response;
}
