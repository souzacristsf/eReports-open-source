import { routes as app } from '../application'

// const root = [
//   { path: '/', redirect: '/dashboard' },
//   { path: '*', redirect: '/auth/signin' }
// ]
// function teste () {
//   console.log('routes: ', ...app) // auth:  {state: {…}, mutations: {…}, actions: {…}, getters: {…}}
// }

// teste()

export default [ ...app ] // ...root
