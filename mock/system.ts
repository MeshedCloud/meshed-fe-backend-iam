import { Request, Response } from 'express';

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
        status: 'VALID',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 2,
        parentId: 0,
        enname: 'rd',
        description: '项目管理，接口管理',
        name: '研发中心',
        status: 'VALID',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 3,
        parentId: 0,
        enname: 'devops',
        description: '生产环境管理',
        name: '运维中心',
        status: 'VALID',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 4,
        parentId: 0,
        enname: 'platform',
        description: '通用服务',
        name: '平台中心',
        status: 'VALID',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
      },
      {
        id: 5,
        parentId: 0,
        enname: 'workflow',
        description: '负责管理通用流程业务',
        name: '流程中心',
        status: 'VALID',
        created: '2022-10-08T20:57:28',
        updated: '2022-10-08T20:57:30',
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

export default {
  'GET /api/iam/system/list': getSystemList,
  'GET /api/iam/system/select': getSystemLabel,
};
