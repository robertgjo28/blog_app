import PostsPage from '../pages/PostsPage.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Posts', component: PostsPage },
      {
        path: '/post/:id',
        component: () => import('pages/PostView.vue'),
        name: 'Post',
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
