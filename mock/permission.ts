import { Request, Response } from 'express';
import { SUCCESS_RESPONSE } from './commonMock';

const getPermissionList = (req: Request, res: Response) => {
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
        access: 'IAM',
        accessMode: 4,
        parentId: 0,
        name: '身份中心',
        uri: '/iam',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 2,
        access: 'IAM:ACCOUNT',
        accessMode: 3,
        parentId: 1,
        name: '账号领域',
        uri: '/iam/account',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 3,
        access: 'IAM:ACCOUNT:LIST',
        accessMode: 2,
        parentId: 2,
        name: '列表',
        uri: '/iam/account/list',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 4,
        access: 'IAM:ACCOUNT:SAVE',
        accessMode: 2,
        parentId: 2,
        name: '保存',
        uri: '/iam/account/save',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 5,
        access: 'IAM:ACCOUNT:DELETE',
        accessMode: 2,
        parentId: 2,
        name: '删除',
        uri: '/iam/account/delete',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 6,
        access: 'IAM:ROLE',
        accessMode: 3,
        parentId: 1,
        name: '角色领域',
        uri: '/iam/role',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 7,
        access: 'IAM:ROLE:LIST',
        accessMode: 2,
        parentId: 6,
        name: '列表',
        uri: '/iam/role/list',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 8,
        access: 'IAM:ROLE:SAVE',
        accessMode: 2,
        parentId: 6,
        name: '保存',
        uri: '/iam/role/save',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 9,
        access: 'IAM:ROLE:DELETE',
        accessMode: 2,
        parentId: 6,
        name: '删除',
        uri: '/iam/role/delete',
        owner: 'IAM',
        status: 'VALID',
        description: 'test',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};

const getPermissionLabel = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        access: 'IAM',
        parentId: 0,
        name: '身份中心',
      },
      {
        id: 2,
        access: 'IAM:ACCOUNT',
        parentId: 1,
        name: '账号领域',
      },
      {
        id: 3,
        access: 'IAM:ACCOUNT:LIST',
        parentId: 2,
        name: '列表',
      },
      {
        id: 4,
        access: 'IAM:ACCOUNT:SAVE',
        parentId: 2,
        name: '保存',
      },
      {
        id: 5,
        access: 'IAM:ACCOUNT:DELETE',
        parentId: 2,
        name: '删除',
      },
      {
        id: 6,
        access: 'IAM:ROLE',
        parentId: 1,
        name: '角色领域',
      },
      {
        id: 7,
        access: 'IAM:ROLE:LIST',
        parentId: 6,
        name: '列表',
      },
      {
        id: 8,
        access: 'IAM:ROLE:SAVE',
        parentId: 6,
        name: '保存',
      },
      {
        id: 9,
        access: 'IAM:ROLE:DELETE',
        parentId: 6,
        name: '删除',
      },
    ],
  });
};

const getPermissionDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      id: 1,
      parentId: 0,
      name: '超级管理员',
      access: 'Root',
      owner: 'iam',
      status: 'INVALID',
      description: 'test',
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
  'GET /api/iam/permission/list': getPermissionList,
  'GET /api/iam/permission/details': getPermissionDetails,
  'GET /api/iam/permission/select': getPermissionLabel,
  'POST /api/iam/permission/save': saveAccount,
  'DELETE /api/iam/permission/delete/*': deleteAccount,
};
