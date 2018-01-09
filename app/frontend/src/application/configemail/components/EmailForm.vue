<template>
    <b-row>
      <b-col>
        <b-card>
          <div slot="header">
            <strong>Configurar E-mail</strong>
          </div>
          <b-form @submit="sendEmailTest">
            <b-alert :show="form.service === 'gmail'"
                     variant="warning">
              <p>Para conta Gmail é necessario configurar "Aplicativos menos seguros"</p>
              <b-link href="https://myaccount.google.com/lesssecureapps" target="_blank">Clique aqui para configurar</b-link>
            </b-alert>
            <b-form-fieldset
              label="Email Remetente">
              <b-form-input type="email" @blur.native="onBlur('from')" v-model="form['from']" placeholder="ex.: meuEmail@remetente.com" @change="setEmailService" required></b-form-input>
              <p class="msg" v-if="errors['from']">* Por favor digite o e-mail do remetente.</p>
            </b-form-fieldset>
            <b-form-fieldset
              label="Senha">
              <b-form-input type="password" @blur.native="onBlur('password')" v-model="form['password']" placeholder="Senha do e-mail remetente.." required></b-form-input>
              <p class="msg" v-if="errors['password']">* Por favor digite a senha do e-mail remetente.</p>
            </b-form-fieldset>
            <b-form-fieldset
              label="Servidor de envio">
              <p class="msg" v-if="errors['service']">* Selecione o serviço de e-mail.</p>
              <b-form-select @blur.native="onBlur('service')" v-model="form['service']" :options="eService" class="mb-3" required>
                <template slot="first">
                  <option :value="''" disabled>-- Escolha o servidor de serviço --</option>
                </template>
              </b-form-select>
              <div id="srv" v-if="form['service']">Serviço de e-mail selecionado: <strong>{{form.service}}</strong></div>
            </b-form-fieldset>
            <!-- Aplicativos menos seguros -->
            <b-form-fieldset
              label="Email Destinatario">
              <b-form-input type="email" @blur.native="onBlur('to')" v-model="form['to']" placeholder="ex.: meuEmail@destino.com" required></b-form-input>
              <p class="msg" v-if="errors['to']">* Por favor digite o e-mail do destino..</p>
            </b-form-fieldset>
            <b-button size="sm" v-if="!stateButton" :disabled="!showBtnSave" type="button" variant="primary" @click.stop.prevent="saveEmail">Salvar</b-button>
            <!-- <b-button size="sm" :to="{name: 'SQL'}" type="button" variant="outline-secondary">Registrar SQL</b-button> -->
            <b-button size="sm" type="button" variant="danger">Cancelar</b-button>
            <b-button size="sm" id="tooltipButton-1" v-if="!stateButton" type="submit" variant="link" class="float-right">Enviar e-mail teste.</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
import { doSaveEmail, doSendEmailTest } from '../services'
export default {
  name: 'email-form',
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      eService: [
        { value: 'gmail', text: '@gmail' },
        { value: 'hotmail', text: '@hotmail' }
      ],
      showBtnSave: false,
      form: {
        to: '',
        from: '',
        service: '',
        password: ''
      },
      validation: (value) => String(value).length > 0,
      errors: {
        to: false,
        from: false,
        service: false,
        password: false
      }
    }
  },
  computed: {
    stateButton () {
      return this.hasError('to') || this.hasError('from') || this.hasError('service') || this.hasError('password')
    }
  },
  methods: {
    sendMsgModal (value) {
      this.$emit('msg-modal', value)
    },
    onLoading (value) {
      this.$emit('loading', value)
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    setEmailService (value) {
      const eSRV = this.eService.filter(e => value.startsWith(e.value, Array.from(value).findIndex(x => x === '@') + 1))
      this.form.service = (typeof eSRV['0'] !== 'undefined' || !!eSRV['0']) ? eSRV['0'].value : null
    },
    onBlur (field) {
      this.errors[field] = this.hasError(field)
    },
    hasError (field) {
      return !this.validation(this.form[field])
    },
    saveEmail () {
      const fields = this.form
      let info = {}
      this.onLoading(true)
      doSaveEmail(fields).then(({data}) => {
        this.onLoading(false)
        info.type = 'success'
        info.msg = 'E-mail registrado com sucesso'
        info.data = new Date()
        info.title = 'Status da Criação'
        Object.assign(this.form, this.$options.data().form)
        this.sendMsgModal(info)
      }).catch(err => {
        this.sendMsgModal(err)
        this.onLoading(false)
      })
    },
    sendEmailTest (evt) {
      evt.preventDefault()
      this.onLoading(true)
      const fields = this.form
      doSendEmailTest(fields).then(({data}) => {
        this.onLoading(false)
        this.showBtnSave = true
        this.sendMsgModal(data)
      }).catch(err => {
        this.sendMsgModal(err)
        this.onLoading(false)
      })
    }
  }
}
</script>
<<style>
  #srv {
    background: #ffeeba;
  }
  .msg {
    color: red;
    font-size: 12px;
    margin: 0px;
  }
</style>
