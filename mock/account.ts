import { Request, Response } from 'express';
import { SUCCESS_RESPONSE } from './commonMock';

const getAccountList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 22,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: 1,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 2,
        loginId: 'user',
        phone: '18888888881',
        email: '12@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 3,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 4,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 5,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: true,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 6,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 7,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 8,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 9,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
      {
        id: 10,
        loginId: 'admin',
        phone: '18888888888',
        email: '11@qq.com',
        validPhone: false,
        validEmail: false,
        expired: false,
        locked: false,
        status: 'VALID',
        createBy: 'sys',
        createTime: '2022-10-05T14:59:24',
        updateBy: 'sys',
        updateTime: '2022-10-05T14:59:24',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getAccountDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      id: 1,
      loginId: 'admin',
      phone: '18888888888',
      email: '11@qq.com',
      validPhone: false,
      validEmail: false,
      expired: false,
      locked: false,
      status: 'VALID',
      createBy: 'sys',
      createTime: '2022-10-05T14:59:24',
      updateBy: 'sys',
      updateTime: '2022-10-05T14:59:24',
      roles: [1],
    },
  });
};

const saveAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const lockAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const unlockAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

export default {
  'GET /api/iam/account/list': getAccountList,
  'GET /api/iam/account/details': getAccountDetails,
  'POST /api/iam/account/save': saveAccount,
  'DELETE /api/iam/account/delete/*': deleteAccount,
  'POST /api/iam/account/lock': lockAccount,
  'POST /api/iam/account/unlock': unlockAccount,
};
