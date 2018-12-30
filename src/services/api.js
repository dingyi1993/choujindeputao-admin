export default {
  queryRouteList: '/user/access/routes',

  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}
