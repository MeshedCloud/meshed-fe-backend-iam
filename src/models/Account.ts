export type AccountItem = {
  id: number;
  loginId: number;
  email: string;
  phone: string;
  status: string;
  validEmail: boolean;
  validPhone: boolean;
  createTime: string;
  updateTime: string;
  closed_at?: string;
};

export type AccountList = {
  data?: AccountItem[];
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
