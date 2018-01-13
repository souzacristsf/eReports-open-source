// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import App from './App'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)

Vue.use(Toasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

// render: h => h(App)
