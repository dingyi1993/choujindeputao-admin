export default {
  queryRouteList: '/user/access/routes',

  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryBlog: '/blog/:id/?admin=1',
  queryBlogList: '/blog?admin=1',
  updateBlog: 'PUT /blog/:id',
  createBlog: 'POST /blog',
  removeBlog: 'DELETE /blog/:id',
  removeBlogList: 'POST /blog/delete',
  openBlog: 'Patch /blog/open/:id',

  queryCategoryList: '/category',

  // queryPostList: '/blog',

  queryDashboard: '/dashboard',
}
