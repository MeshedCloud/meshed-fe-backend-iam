import type { CommonItem } from '@/common/models';

export type RoleItem = CommonItem & {
  parentId: number;
  name: string;
  enname: string;
  owner: string;
  description: string;
};

export type RoleDetails = RoleItem & {
  access: number[];
};
