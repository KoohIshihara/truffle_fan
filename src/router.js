import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/sign-up'
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import('@/views/Home')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () =>
        import('@/views/Settings')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      props: true,
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      props: true,
      component: () =>
        import('@/views/SignIn')
    },
    {
      path: '/:ownerId',
      name: 'shop',
      props: true,
      component: () =>
        import('@/views/Shop')
    },
    {
      path: '/:ownerId/:inviterId',
      name: 'shop',
      props: true,
      component: () =>
        import('@/views/Shop')
    }
  ]
})
