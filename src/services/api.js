export default {
  queryUserInfo: '/user/access/current',
  logoutUser: '/user/access/logout',
  loginUser: 'POST /user/access/login',

  queryBlog: '/admin/blog/:id',
  queryBlogList: '/admin/blog',
  createBlog: 'POST /admin/blog',
  updateBlog: 'PUT /admin/blog/:id',
  removeBlog: 'DELETE /admin/blog/:id',
  removeBlogList: 'POST /blog/delete',
  openBlog: 'Patch /admin/blog/open/:id',

  queryCategoryList: '/category',
  createCategory: 'POST /admin/category',
  updateCategory: 'PUT /admin/category/:id',
  removeCategory: 'DELETE /admin/category/:id',

  queryTagList: '/tag',
  createTag: 'POST /tag',

  // queryPostList: '/blog',

  queryDashboard: '/dashboard',
}
