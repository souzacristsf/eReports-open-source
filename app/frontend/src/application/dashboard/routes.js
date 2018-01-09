import Main from './components/Main'

export default [
  { path: '/dashboard', name: 'Dashboard', component: Main, meta: { requiresAuth: true } }
]
