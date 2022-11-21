import { Request, Response } from 'express';

const getRoleList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        parentId: 0,
        name: '超级管理员',
        enname: 'Root',
        owner: 'iam',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 2,
        parentId: 0,
        name: '中台管理员',
        enname: 'Admin',
        owner: 'iam',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 3,
        parentId: 0,
        name: '身份中心管理员',
        enname: 'IAM_Admin',
        owner: 'workflow',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 4,
        parentId: 0,
        name: '身份中心管理员',
        enname: 'Admin',
        status: 'VALID',
        owner: 'workflow',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 5,
        parentId: 0,
        name: '研发中心管理员',
        enname: 'Admin',
        owner: 'workflow',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 6,
        parentId: 0,
        name: '流程中心管理员',
        enname: 'Flow_Admin',
        owner: 'workflow',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 7,
        parentId: 0,
        name: '平台中心管理员',
        enname: 'Platform_Admin',
        owner: 'Platform',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 8,
        parentId: 5,
        name: '研发开发者',
        enname: 'dev',
        owner: 'DEV',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 9,
        parentId: 5,
        name: '研发测试',
        enname: 'Test',
        owner: 'DEV',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 10,
        parentId: 5,
        name: '研发质量',
        enname: 'xxx',
        owner: 'DEV',
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
    ],
  });
};

const getRoleDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: '',
    errMessage: '',
    data: {
      id: 1,
      parentId: 0,
      name: '超级管理员',
      enname: 'Root',
      owner: 'iam',
      status: 'VALID',
      description: 'test',
      assess: [1, 2, 4],
    },
  });
};

export default {
  'GET /api/iam/role/list': getRoleList,
  'GET /api/iam/role/details': getRoleDetails,
};