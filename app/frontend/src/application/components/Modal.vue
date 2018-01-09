<<template>
<div>
  <b-modal v-model="modalShow"
      :title="modal.title"
      :header-bg-variant="modal.type"

      centered>
    <b-container fluid>
      <p>
        {{ modal.msg }}
      </p>
      <br>
      <p v-if="modal.data">
        Info: conexão realizada as {{ modal.data | formatDate  }}
      </p>
    </b-container>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="primary" @click="onClose">
        Close
      </b-btn>
    </div>
  </b-modal>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import moment from 'moment'
export default {
  name: 'modelinfo',
  data () {
    return { modalShow: false }
  },
  props: {
    modal: {
      type: Object,
      default: function () {
        return {
          type: 'warning',
          msg: 'Verifique o log de erro.',
          data: new Date(),
          title: 'Erro'
        }
      }
    }
  },
  computed: {
    ...mapState({show: state => state.conection.openModal})
    // onShow: {
    //   get () {
    //     console.log('entrou no get')
    //     return this.show
    //   },
    //   set (newValue) {
    //     console.log('entrou no set :', newValue)
    //   }
    // }
  },
  watch: {
    show: {
      handler (value) {
        this.modalShow = value
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'showModal'
    ]),
    onClose () {
      this.showModal(false)
    }
  },
  filters: {
    formatDate: function (value) {
      return (!value) ? new Date().toLocaleString() : new Date(value).toLocaleString()
      // return (!value) ? moment.utc(moment().toDate()).format('DD/MM/YYYY HH:mm:ss') : moment.utc(String(value)).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>
