import ConfigSQL from './components/Main.vue'

export default [
  { path: '/config/sql', name: 'SQL', component: ConfigSQL, meta: { requiresAuth: true } }
]
