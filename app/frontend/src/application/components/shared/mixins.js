import { doListConnection } from './services'

export default {
  data () {
    return {}
  },
  methods: {
    listConnection () {
      return doListConnection().then(({data}) => {
        return data.docs
      })
    }
  }
}
