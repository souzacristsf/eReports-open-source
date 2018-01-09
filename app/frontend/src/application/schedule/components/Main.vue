<template>
  <div class="animated fadeIn">
    <schedule-form :options="options" @msg-modal="sendMsgModal"/>
    <e-modal :modal="info"/>
  </div>
</template>
<script>
import ScheduleForm from './ScheduleForm'
import { doListEmail, doListQuery } from '../services'
import EModal from '../../components/Modal'
import { mapActions } from 'vuex'
export default {
  name: 'main-schedule',
  components: {
    ScheduleForm,
    'e-modal': EModal
  },
  data () {
    return {
      options: {
        query: [],
        email: []
      },
      info: {
        type: '',
        msg: '',
        data: '',
        title: ''
      }
    }
  },
  mounted () {
    this.fetchEmails()
    this.fetchQuery()
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),
    fetchEmails () {
      doListEmail()
        .then(({data}) =>
          (data.docs)
            ? data.docs.map(email => ({value: email, text: email.from}))
            : ''
        )
        .then(data => {
          this.options.email = data
        })
        .catch(this.sendMsgModal)
    },
    fetchQuery () {
      doListQuery()
        .then(({data}) =>
          (data.docs)
            ? data.docs.map(query => ({value: query, text: query.name}))
            : ''
        )
        .then(data => {
          this.options.query = data
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
