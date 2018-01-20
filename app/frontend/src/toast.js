import Vue from 'vue'

const options = {
  // icon: 'check',
  theme: 'bubble',
  // action: {
  //   // text: 'Ok'
  // },
  position: 'top-right',
  duration: 2000
  // fitToScreen: true
}

export const success = msg => {
  options.type = 'success'
  return Vue.toasted.show(msg, options)
}

export const error = msg => {
  options.type = 'error'
  return Vue.toasted.show(msg, options)
}
