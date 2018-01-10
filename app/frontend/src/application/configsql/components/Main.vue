<template>
  <div class="animated fadeIn">
    <sql-form :options="connections" @msg-modal="sendMsgModal"/>
    <e-modal :modal="info"/>
  </div>
</template>
<script>
// import { doListConnection } from '../services'
import _ from 'lodash'
import SqlForm from './SqlForm'
import mixin from '../../components/shared/mixins'
import EModal from '../../components/Modal'
import { mapActions } from 'vuex'
export default {
  name: 'main-email',
  components: {
    SqlForm,
    'e-modal': EModal
  },
  mixins: [mixin],
  data () {
    return {
      connections: [],
      info: {
        type: '',
        msg: '',
        data: '',
        title: ''
      }
    }
  },
  mounted () {
    this.nameConnectionn()
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),
    nameConnectionn () {
      this.listConnection()
        .then(
          (data) =>
            _.filter(data, { status: 'Active' }).map(item => ({value: item, text: item.nameConect}))
        )
        .then(data => {
          this.connections = data
        })
        .catch(this.sendMsgModal)
    },
    sendMsgModal (value) {
      this.showModal(true)
      if (value.response) {
        this.info = { ...value.response.data }
      } else if (value.message) {
        this.info.type = 'danger'
        this.info.msg = value.message
        this.info.title = 'Status da Requisição'
        this.info.data = new Date().toLocaleString()
      } else {
        this.info = { ...value }
      }
    }
  }
}
</script>
