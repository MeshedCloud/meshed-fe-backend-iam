import _ from 'lodash';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const mode = localStorage.getItem('mode');
  return {
    canAdmin: mode === 'base' ? true : currentUser && currentUser.grantedRole && currentUser.grantedRole?.length > 0 && _.intersection(currentUser.grantedRole, ['IAM:ADMIN']).length > 0,
  };
}
