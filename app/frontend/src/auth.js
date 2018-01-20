import localforage from 'localforage'

export const setUser = data => {
  localforage.setItem('user', data.user)
  localforage.setItem('token', data.token)
}

export const getUser = () => {
  return localforage.getItem('user').then(user => {
    if (!user) {
      return Promise.reject(new Error('NO_USER')) // Reject promise
    }
    return user
  })
}

export const getUserId = () => {
  return localforage.getItem('user').then(user => {
    if (!user) {
      return Promise.reject(new Error('NO_USER')) // Reject promise
    }
    return user._id
  })
}

export const getToken = () => {
  return localforage.getItem('token').then(token => {
    if (!token) {
      return Promise.reject(new Error('NO_TOKEN')) // Reject promise
    }

    return token
  })
}

export const logout = () => {
  localforage.removeItem('user')
  localforage.removeItem('token')
}
