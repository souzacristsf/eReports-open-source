import localforage from 'localforage'

export default {
  setUser: function (data) {
    localforage.setItem('user', data.user)
    localforage.setItem('token', data.token)
  },

  getUser: function () {
    return localforage.getItem('user').then(user => {
      if (!user) {
        return Promise.reject(new Error('NO_USER')) // Reject promise
      }
      return user
    })
  },

  getToken: function () {
    return localforage.getItem('token').then(token => {
      if (!token) {
        return Promise.reject(new Error('NO_TOKEN')) // Reject promise
      }

      return token
    })
  },

  logout: function () {
    localforage.removeItem('user')
    localforage.removeItem('token')
  }
}
