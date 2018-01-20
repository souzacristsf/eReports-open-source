const load = component => () => import(`./components/${component}.vue`)

export default [
  {
    path: '/auth/signin',
    name: 'Signin',
    component: load('Signin'),
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: load('Signup'),
    meta: { requiresAuth: false }
  }
]
