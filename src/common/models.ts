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

export type Response<T> = {
  data?: T;
  /** 列表的内容总数 */
  success?: boolean;
  errCode: string;
  errMessage: string;
};

export type CommonItem = {
  id: number;
  status: string;
  created: string;
  updated: string;
};

export type LabelItem = {
  parentId: number;
  key: string;
  label: string;
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
