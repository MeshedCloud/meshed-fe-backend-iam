import type { CommonItem } from '@/common/models';

export type SystemItem = CommonItem & {
  parentId: number;
  name: number;
  enname: string;
  description: string;
};
