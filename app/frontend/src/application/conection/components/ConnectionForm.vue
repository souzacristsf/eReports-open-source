<template>
  <b-card>
    <div slot="header">
      <strong>Nova Conexão</strong><small>+</small>
    </div>
    <b-row>
      <b-col sm="6">
        <b-form-fieldset label="Driver">
          <b-form-select
            @blur.native="onBlur('driver')"
            :plain="true"
            required
            :options="drivers"
            v-model="form['driver']">
          </b-form-select>
          <p class="msg" v-if="errors['driver']">* Driver é obrigatorio</p>
        </b-form-fieldset>
      </b-col><!--/.col-->
      <b-col sm="6">
        <b-form-fieldset label="Database">
          <b-form-input @blur.native="onBlur('connectString')" type="text" id="connectString" v-model="form['connectString']" placeholder="128.1.1.3:1521/production"></b-form-input>
          <p class="msg" v-if="errors['connectString']">* Database é obrigatorio</p>
          <p class="msg" v-if="dbTest">* Substituir o &lt;HOST IP&gt; pelo o IP onde está rodando a aplicação</p>
        </b-form-fieldset>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
    <b-row>
      <b-col sm="6">
        <b-form-fieldset label="User">
          <b-form-input @blur.native="onBlur('user')" type="text" id="user" placeholder="oracle" v-model="form['user']"></b-form-input>
          <p class="msg" v-if="errors['user']">* User é obrigatorio</p>
        </b-form-fieldset>
      </b-col><!--/.col-->
      <b-col sm="6">
        <b-form-fieldset label="Password">
          <b-form-input @blur.native="onBlur('password')" type="password" id="password" placeholder="123" v-model="form['password']"></b-form-input>
          <p class="msg" v-if="errors['password']">* Password é obrigatorio</p>
        </b-form-fieldset>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <b-form-fieldset label="Nome Conexão">
          <b-form-input @blur.native="onBlur('nameConect')" type="text" id="addname" placeholder="conexão principal" v-model="form['nameConect']"></b-form-input>
          <p class="msg" v-if="errors['nameConect']">* Nome da conexão é obrigatorio</p>
        </b-form-fieldset>
      </b-col>
      <b-col sm="6">
        <b-form-fieldset label="descrição">
          <b-form-input @blur.native="onBlur('descrConect')" type="text" id="adddesc" placeholder="minha conexão com o servidor X." v-model="form['descrConect']"></b-form-input>
          <p class="msg" v-if="errors['descrConect']">* Descrição é obrigatorio</p>
        </b-form-fieldset>
      </b-col>
    </b-row>
    <b-form-checkbox value="yes"
                    unchecked-value="no"
                    @change="onDB"
                    v-model="checked">
      Testar banco da aplicação
    </b-form-checkbox>
    <div class="form-actions">
      <b-button type="button" @click="updateConnectionId" :disabled="stateButton || !enableBtn" v-if="!buttonUpdate" variant="warning" >Editar Conexão</b-button>
      <b-button type="button" @click.stop.prevent="saveConnection" :disabled="stateButton || !enableBtn" v-if="buttonUpdate" variant="primary">Salvar Conexão</b-button>
      <b-button type="button" @click="testConnection" :disabled="stateButton" variant="outline-success">Testar Conexão</b-button>
      <b-button type="button" @click="resetOptions" :to="{name: 'Conection'}" v-if="!buttonUpdate" variant="danger" >Cancelar</b-button>
    </div>
    <e-modal :modal="info"/>
  </b-card>
</template>

<script>
import { doConnection, doSaveConnection, doUpdateConnectionId } from '../services'
import EModal from '../../components/Modal'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'connection-form',
  components: {
    'e-modal': EModal
  },
  data () {
    return {
      checked: 'no',
      dbTest: false,
      enableBtn: false,
      info: {
        type: '',
        msg: '',
        data: '',
        title: ''
      },
      form: {
        driver: '',
        connectString: '',
        user: '',
        password: '',
        nameConect: '',
        descrConect: ''
      },
      validation: (value) => String(value).length > 0,
      errors: {
        driver: false,
        connectString: false,
        user: false,
        password: false,
        nameConect: false,
        descrConect: false
      },
      drivers: ['Oracle']
    }
  },
  watch: {
    form: {
      handler () {
        this.enableBtn = false
      },
      deep: true
    },
    updateConnection (value) {
      Object.assign(this.form, value)
    }
  },
  computed: {
    ...mapGetters(['updateConnection', 'buttonUpdate']),
    stateButton () {
      return this.hasError('driver') || this.hasError('connectString') || this.hasError('user') || this.hasError('password') || this.hasError('nameConect') || this.hasError('descrConect')
    }
  },
  methods: {
    ...mapActions([
      'showModal', 'doEditConnection'
    ]),
    onDB (checked) {
      const data = {
        driver: 'Oracle',
        user: 'system',
        password: 'oracle',
        connectString: '<HOST IP>:49161/XE',
        nameConect: 'Database XE',
        descrConect: 'Connexão de teste da aplicação'
      }
      if (checked !== 'no') {
        this.dbTest = true
        this.form = { ...data }
      } else {
        this.dbTest = false
        Object.assign(this.form, this.$options.data().form)
      }
    },
    onBlur (field) {
      this.errors[field] = this.hasError(field)
    },
    hasError (field) {
      return !this.validation(this.form[field])
    },
    onLoading (value) {
      this.$emit('loading', value)
    },
    testConnection () {
      const {connectString, user, password} = this.form
      this.onLoading(true)
      doConnection({connectString, user, password}).then(
        ({ data }) => {
          this.onLoading(false)
          this.info = { ...data }
          this.enableBtn = true
          this.showModal(true)
        })
        .catch(err => {
          this.onLoading(false)
          if (err.message) {
            this.info.type = 'danger'
            this.info.msg = err.message
            this.info.title = 'Status da Conexão'
            this.info.data = new Date() // 'Vefique seu servidor!!!'
          } else {
            // 127.0.0.1:49161/XE
            // 172.24.0.1
            this.info = { ...err.response.data }
          }
          this.showModal(true)
        })
    },
    saveConnection () {
      const newConnect = this.form
      doSaveConnection(newConnect).then(
        ({data}) => {
          this.onLoading(false)
          this.$emit('list')
          this.info.type = 'success'
          this.info.msg = data.nameConect + ' / ' + data.connectString + ' foi adicionado na lista de conexões.'
          this.info.data = data.created_at
          this.info.title = 'Status Nova Conexão'
          this.enableBtn = true
          // Object.assign(this.form, this.$options.data().form) // 128.1.9.146:49161/XE
          this.resetOptions()
          this.checked = 'no'
          this.showModal(true)
        })
        .catch(err => {
          console.log('meu erro: ', err.response)
          this.onLoading(false)
          this.info = { ...err.response.data }
          this.showModal(true)
        })
    },
    resetOptions () {
      Object.assign(this.form, this.$options.data().form)
      this.doEditConnection(null)
    },
    updateConnectionId () {
      const updConnect = this.form
      delete updConnect.deleted_at
      doUpdateConnectionId(updConnect).then(
        ({data}) => {
          this.onLoading(false)
          this.$emit('list')
          this.info.type = 'success'
          this.info.msg = 'Conexão atualizada com sucesso!!!.'
          this.info.title = 'Atualização da Conexão'
          this.enableBtn = true
          this.resetOptions()
          // Object.assign(this.form, this.$options.data().form) // 128.1.9.146:49161/XE
          this.checked = 'no'
          this.showModal(true)
        })
        .catch(err => {
          console.log('meu erro: ', err.response)
          this.onLoading(false)
          this.info = { ...err.response.data }
          this.showModal(true)
        })
    }
  }
}
</script>

<style lang="css">
  .msg {
    color: red;
    font-size: 12px;
    margin: 0px;
  }
</style>
