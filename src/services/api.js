export default {
  queryRouteList: '/user/access/routes',

  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryBlog: '/blog/:id',
  queryBlogList: '/blog',
  updateBlog: 'Patch /blog/:id',
  createBlog: 'POST /blog',
  removeBlog: 'DELETE /blog/:id',
  removeBlogList: 'POST /blog/delete',

  queryCategoryList: '/category',

  // queryPostList: '/blog',

  queryDashboard: '/dashboard',
}
