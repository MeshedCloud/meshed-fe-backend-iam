export default [
  {
    path: '/user/',
    layout: false,
    routes: [{ name: '登录', path: '/user/login/', component: './User/Login' }],
  },
  // { path: '/welcome/', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/account/',
    name: '账号管理',
    access:'canAdmin',
    icon: 'TeamOutlined',
    component: './Account',
  },
  {
    path: '/role/',
    name: '角色管理',
    icon: 'ApartmentOutlined',
    access:'canAdmin',
    component: './Role',
  },
  {
    path: '/permission/',
    name: '权限管理',
    access:'canAdmin',
    icon: 'SafetyCertificateOutlined',
    component: './Permission',
  },
  {
    path: '/system/',
    name: '系统管理',
    access:'canAdmin',
    icon: 'AppstoreOutlined',
    component: './System',
  },
  { path: '/', redirect: '/account/' },
  { path: '/error/:code', layout: false, component: './error' },
  { path: '*', redirect: '/error/404' },
];
