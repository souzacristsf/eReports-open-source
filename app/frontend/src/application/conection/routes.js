import Main from './components/Main'

export default [
  {
    path: '/conection',
    name: 'Conection',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      { path: '/conection/:connect_id/edit', name: 'Edit', component: Main }
    ]
  }
]
