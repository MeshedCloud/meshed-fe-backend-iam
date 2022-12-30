import { CommonItem } from '@/common/models';

export class SystemItem extends CommonItem {
  parentId: number | undefined;
  name: string | undefined;
  enname: string | undefined;
  description: string | undefined;
}
