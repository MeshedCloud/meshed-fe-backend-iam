import { Request, Response } from 'express';
import { SUCCESS_RESPONSE } from './commonMock';

const getSystemList = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        parentId: 0,
        enname: 'iam',
        description: '账号管理',
        name: '身份中心',
        status: 'RUN',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 2,
        parentId: 0,
        enname: 'rd',
        description: '项目管理，接口管理',
        name: '研发中心',
        status: 'RD',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 3,
        parentId: 0,
        enname: 'devops',
        description: '生产环境管理',
        name: '运维中心',
        status: 'OFFLINE',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 4,
        parentId: 0,
        enname: 'platform',
        description: '通用服务',
        name: '平台中心',
        status: 'INITIATION',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
      {
        id: 5,
        parentId: 0,
        enname: 'workflow',
        description: '负责管理通用流程业务',
        name: '流程中心',
        status: 'DISCARD',
        createTime: '2022-10-08T20:57:28',
        updateTime: '2022-10-08T20:57:30',
      },
    ],
  });
};
const getSystemLabel = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        parentId: 0,
        name: '身份中心',
      },
      {
        id: 2,
        parentId: 0,
        name: '研发中心',
      },
      {
        id: 3,
        parentId: 0,
        name: '运维中心',
      },
      {
        id: 4,
        parentId: 0,
        name: '平台中心',
      },
      {
        id: 5,
        parentId: 0,
        name: '流程中心',
      },
    ],
  });
};

const getSystemDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      id: 1,
      parentId: 0,
      enname: 'iam',
      description: '账号管理',
      name: '身份中心',
      status: 'RUN',
      createTime: '2022-10-08T20:57:28',
      updateTime: '2022-10-08T20:57:30',
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
  'GET /api/iam/system/list': getSystemList,
  'GET /api/iam/system/select': getSystemLabel,
  'GET /api/iam/system/details': getSystemDetails,
  'POST /api/iam/system/save': saveAccount,
  'DELETE /api/iam/system/delete/*': deleteAccount,
};
