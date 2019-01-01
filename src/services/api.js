export default {
  queryRouteList: '/user/access/routes',

  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryBlog: '/blog/:id',
  queryBlogList: '/blog',
  updateBlog: 'PUT /blog/:id',
  createBlog: 'POST /blog',
  removeBlog: 'DELETE /blog/:id',
  removeBlogList: 'POST /blog/delete',
  openBlog: 'Patch /blog/open/:id',

  queryCategoryList: '/category',

  // queryPostList: '/blog',

  queryDashboard: '/dashboard',
}
