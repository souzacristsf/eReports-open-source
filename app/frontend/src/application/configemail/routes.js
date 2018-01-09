import ConfigEmail from './components/Main.vue'

export default [
  { path: '/config/email', name: 'Email', component: ConfigEmail, meta: { requiresAuth: true } }
]
