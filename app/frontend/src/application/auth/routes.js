import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'

export default [
  { path: '/auth/signin', name: 'Signin', component: Signin, meta: { requiresAuth: false } },
  { path: '/auth/signup', name: 'Signup', component: Signup, meta: { requiresAuth: false } }
]
