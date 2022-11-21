export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/account',
    name: '账号管理',
    icon: 'TeamOutlined',
    component: './Account',
  },
  {
    path: '/role',
    name: '角色管理',
    icon: 'ApartmentOutlined',
    component: './Role',
  },
  {
    path: '/permission',
    name: '权限管理',
    icon: 'SafetyCertificateOutlined',
    component: './Permission',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'AppstoreOutlined',
    component: './System',
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
