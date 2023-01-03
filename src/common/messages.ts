import { Response } from '@/common/models';
import { message } from 'antd';

export function success(res: undefined | Response<any>, successMsg?: string) {
  if (res != undefined && res.success) {
    message.success(successMsg == undefined ? '操作成功' : successMsg);
    return true;
  }
  return false;
}
