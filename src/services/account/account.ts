export class AccountItem {
  id?: number;
  realName: number | undefined;
  loginId: number | undefined;
  email: string | undefined;
  phone: string | undefined;
  status: string | undefined;
  validEmail: boolean | undefined;
  validPhone: boolean | undefined;
  locked: boolean | undefined;
}

export class AccountDetail extends AccountItem {
}

export class AccountGrantRole {
  accountId: number | undefined;
  roleIds: number[] | undefined;
}

