import type { CommonItem } from '@/common/models';

export type PermissionItem = CommonItem & {
  parentId: number;
  name: number;
  enname: string;
  access: string;
  accessMode: string;
  uri: string;
  owner: string;
  description: string;
  children: PermissionItem[];
};
