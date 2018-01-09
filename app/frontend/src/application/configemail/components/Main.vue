<template>
  <div class="animated fadeIn">
    <email-form @msg-modal="sendMsgModal" @loading="onLoading"/>
    <e-modal :modal="info"/>
    <loading v-if="show" :msg="msg"/>
  </div>
</template>
<script>
import EmailForm from './EmailForm'
import { mapActions } from 'vuex'
import mixin from '../../components/shared/mixins'
import EModal from '../../components/Modal'
import Loading from '../../components/Loading'
export default {
  name: 'main-email',
  components: {
    EmailForm,
    'e-modal': EModal,
    Loading
  },
  mixins: [mixin],
  data () {
    return {
      info: {
        type: '',
        msg: '',
        data: '',
        title: ''
      },
      show: false,
      msg: 'Enviando e-mail...'
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),
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
    },
    onLoading (e) {
      this.show = e
    }
  }
}
</script>
