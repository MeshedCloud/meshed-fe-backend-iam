import { Request, Response } from 'express';
import { SUCCESS_RESPONSE } from './commonMock';

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
        enname: 'ROOT',
        owner: '身份中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 2,
        parentId: 0,
        name: '中台管理员',
        enname: 'ADMIN',
        owner: '身份中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 3,
        parentId: 0,
        name: '身份中心管理员',
        enname: 'IAM:Admin',
        owner: '流程中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 4,
        parentId: 0,
        name: '账号管理员',
        enname: 'Admin',
        status: 'VALID',
        owner: '流程中心',
        ownerId: 1,
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 5,
        parentId: 0,
        name: '研发中心管理员',
        enname: 'Admin',
        owner: '流程中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 6,
        parentId: 0,
        name: '流程中心管理员',
        enname: 'Flow:Admin',
        owner: '流程中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 7,
        parentId: 0,
        name: '平台中心管理员',
        enname: 'Platform:Admin',
        owner: '平台中心',
        ownerId: 1,
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
        owner: '平台中心',
        ownerId: 1,
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
        owner: '研发中心',
        ownerId: 1,
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
        owner: '研发中心',
        ownerId: 1,
        status: 'VALID',
        description: 'test',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
    ],
  });
};

const getRoleLabel = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        enname: 'ROOT',
        parentId: 0,
        name: '超级管理员',
      },
      {
        id: 2,
        enname: 'ADMIN',
        parentId: 0,
        name: '中台管理员',
      },
      {
        id: 3,
        enname: 'IAM:ADMIN',
        parentId: 0,
        name: '身份管理员',
      },
      {
        id: 4,
        enname: 'IAM:ACCOUNT',
        parentId: 3,
        name: '账号管理员',
      },
      {
        id: 5,
        enname: 'DEV:ADMIN',
        parentId: 0,
        name: '研发管理员',
      },
      {
        id: 6,
        enname: 'DEV:OPS',
        parentId: 5,
        name: '运维管理员',
      },
      {
        id: 7,
        enname: 'DEV:PROJECT',
        parentId: 5,
        name: '项目管理员',
      },
      {
        id: 8,
        enname: 'DEV:MAVEN',
        parentId: 5,
        name: 'jar管理员',
      },
      {
        id: 9,
        enname: 'PLATFORM:ADMIN',
        parentId: 0,
        name: '平台管理员',
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
      enname: 'ROOT',
      owner: '身份中心',
      ownerId: 1,
      status: 'VALID',
      description: 'test',
      assess: [1, 2, 4],
    },
  });
};

const saveAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

const deleteAccount = (req: Request, res: Response) => {
  res.json(SUCCESS_RESPONSE);
};

export default {
  'GET /api/iam/role/list': getRoleList,
  'GET /api/iam/role/details': getRoleDetails,
  'GET /api/iam/role/select': getRoleLabel,
  'POST /api/iam/role/save': saveAccount,
  'DELETE /api/iam/role/delete/*': deleteAccount,
};
