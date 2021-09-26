
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { 
        name: 'HouseList',
        path: 'houses',
        component: () => import('pages/Houses.vue'),
        children: [
          { name: 'HouseDetail', path: ':id', component: () => import('pages/HouseDetail.vue') }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
