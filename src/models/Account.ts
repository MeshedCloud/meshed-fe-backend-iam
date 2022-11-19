import { PageInfo } from '../common/common';

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

export type AccountList = PageInfo & {
  data?: AccountItem[];
};