export default {
  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryBlog: '/admin/blog/:id',
  queryBlogList: '/admin/blog',
  updateBlog: 'PUT /admin/blog/:id',
  createBlog: 'POST /admin/blog',
  removeBlog: 'DELETE /admin/blog/:id',
  removeBlogList: 'POST /blog/delete',
  openBlog: 'Patch /admin/blog/open/:id',

  queryCategoryList: '/category',

  queryTagList: '/tag',
  createTag: 'POST /tag',

  // queryPostList: '/blog',

  queryDashboard: '/dashboard',
}
