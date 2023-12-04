const frameIn = [
  {
    path: '/issuesList',
    name: 'issuesList',
    component: () => import('@/views/Issues/IssuesList.vue'),
    meta: {
      title: '问题列表'
    }
  }
]

const frameOut = []

// 错误页面
// const errorPage = [
//   {
//     path: '*',
//     name: '404',
//     component: () => import('@/views/error-page/404.vue'),
//     meta: {
//       title: '404-页面不存在'
//     }
//   }
// ]

export const frameInRoutes = frameIn

export  default [
  ...frameIn,
  ...frameOut,
  //...errorPage
]