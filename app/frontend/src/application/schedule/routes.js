import Schedule from './components/Main.vue'

export default [
  { path: '/schedule', name: 'Agendamento', component: Schedule, meta: { requiresAuth: true } }
]
