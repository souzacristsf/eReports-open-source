<template>
    <b-row>
      <b-col>
        <b-card>
          <div slot="header">
            <strong>Agendar Envio</strong>
          </div>
          <b-form-fieldset
            label="Email Remetente">
            <b-form-select
              @blur.native="onBlur('service')"
              v-model="form['service']"
              :options="options.email"
              class="mb-3">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="''" disabled>-- Escolha o e-mail remetente. --</option>
              </template>
            </b-form-select>
            <p class="msg" v-if="errors['service']">* Por favor escolha um e-mail remetente já cadastrado.</p>
            <div id="srv" v-if="form['service']">E-mail de destino: <strong>{{form['service'].to}}</strong></div>
            <!--<div v-if="selected">Database Selecionada: <strong>{{selected.connection}}</strong></div>-->
          </b-form-fieldset>
          <b-form-fieldset label="Selecione Reatório/SQL">
            <b-card>
              <b-form-fieldset
                label="Nome Relatório">
                <b-form-select
                  @blur.native="onBlur('query')"
                  v-model="form['query']"
                  :options="options.query"
                  class="mb-3">
                  <template slot="first">
                    <option :value="''" disabled>-- Escolha o nome do relatório. --</option>
                  </template>
                </b-form-select>
              </b-form-fieldset>
              <p class="msg" v-if="errors['query']">* Por favor escolha um relatório para envio.</p>
              <div id="srv" v-if="form['query']">Conexão e Driver escolhido: <strong>{{form['query'].database.connectString}} e {{form['query'].database.driver}}</strong></div>
              <b-form-fieldset
                label="SQL Cadastrado" v-if="form['query']">
                <textarea disabled rows="6" class="form-control" :value="sql"></textarea>
              </b-form-fieldset>
            </b-card>
          </b-form-fieldset>
          <b-row v-if="checked !== 'yes'">
            <b-col sm="6">
                <b-row>
                  <b-col sm="6">
                    <b-form-fieldset label="Data Inicio">
                      <b-form-input
                        @blur.native="onBlur('startDate')"
                        v-model="form['startDate']"
                        type="date">
                      </b-form-input>
                    </b-form-fieldset>
                  </b-col>
                  <b-col sm="6">
                    <b-form-fieldset label="Hora Inicio">
                      <b-form-input
                        @blur.native="onBlur('startTime')"
                        v-model="form['startTime']"
                        type="time">
                      </b-form-input>
                    </b-form-fieldset>
                  </b-col>
                </b-row>
            </b-col>
            <b-col sm="6" v-if="checkedAllDay !== 'yes'">
              <b-row>
                  <b-col sm="6">
                    <b-form-fieldset label="Data Fim">
                      <b-form-input
                        @blur.native="onBlur('endDate')"
                        v-model="form['endDate']"
                        type="date">
                      </b-form-input>
                    </b-form-fieldset>
                  </b-col>
                  <b-col sm="6">
                    <b-form-fieldset label="Hora Fim">
                      <b-form-input
                        @blur.native="onBlur('endTime')"
                        v-model="form['endTime']"
                        type="time">
                      </b-form-input>
                    </b-form-fieldset>
                  </b-col>
                </b-row>
            </b-col>
          </b-row>
          <p class="msg" v-if="infoAllDay">{{info}}</p>
          <b-row>
            <b-col>
              <b-form-checkbox
                value="yes"
                unchecked-value="no"
                v-model="checked"
                v-if="checkedAllDay !== 'yes'">
                Enviar e-mail Imediatamente
              </b-form-checkbox>
              <b-form-checkbox
                value="yes"
                unchecked-value="no"
                v-if="checked !== 'yes'"
                v-model="checkedAllDay">
                Enviar todos os dias
              </b-form-checkbox>
            </b-col>
          </b-row>

          <div class="form-actions">
            <b-button size="sm" @click="validFieldsDateAndTime" :disabled="btnSave" type="submit" v-if="checked === 'no'" variant="primary">Salvar</b-button>
            <b-button size="sm" type="submit" v-if="checked === 'yes'" variant="outline-success">Enviar Relatório</b-button>
            <b-button size="sm" type="submit" variant="danger">Cancelar</b-button>
            <b-button size="sm" v-if="options.email.length === 0" :to="{name: 'Email'}" type="button" variant="outline-secondary">Registrar Email</b-button>
            <b-button size="sm" v-if="options.query.length === 0" :to="{name: 'SQL'}" type="button" variant="outline-secondary">Criar Relatório</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
import { omit, isEmpty } from 'lodash'
import { doCreateSchedule } from '../services'
export default {
  name: 'schedule-form',
  data () {
    return {
      form: {
        service: '',
        query: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: ''
      },
      errors: {
        service: false,
        query: false,
        startDate: false,
        endDate: false,
        startTime: false,
        endTime: false
      },
      infoAllDay: false,
      info: '',
      btnSave: true,
      checked: 'no',
      checkedAllDay: 'no',
      validation: (value) => String(value).length > 0
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    sql () {
      return (this.form['query']) ? this.form['query'].query[0] : ''
    }
  },
  watch: {
    form: {
      handler () {
        this.btnSave = !this.form['service'] || !this.form['query']
        this.infoAllDay = false
      },
      deep: true
    }
  },
  methods: {
    onBlur (field) {
      this.errors[field] = this.hasError(field)
    },
    hasError (field) {
      return !this.validation(this.form[field])
    },
    validFieldsDateAndTime () {
      const currentDate = new Date()
      const startTime = this.form.startTime + ':00'
      const startDate = new Date(this.form.startDate + ' ' + startTime)
      const endTime = this.form.endTime + ':00'
      const endDate = new Date(this.form.endDate + ' ' + endTime)
      if (this.checkedAllDay === 'yes') {
        if (!isEmpty(this.form.startDate) && !isEmpty(this.form.startTime)) {
          if (startDate.getTime() < currentDate.getTime()) {
            this.infoAllDay = true
            this.info = '* Data escolhida não pode ser menor que a data/hora atual.'
          } else {
            this.saveSchedule()
          }
        } else {
          this.infoAllDay = true
          this.info = '* Por favor escolha data de inicio/hora do envio.'
        }
      } else {
        if (!isEmpty(this.form.startDate) && !isEmpty(this.form.startTime) && !isEmpty(this.form.endDate) && !isEmpty(this.form.endTime)) {
          if (startDate.getTime() > endDate.getTime()) {
            this.infoAllDay = true
            this.info = '* Data inicio/hora tem que ser menor Data Fim/Hora.'
          } else {
            if (startDate.getTime() < currentDate.getTime()) {
              this.infoAllDay = true
              this.info = '* Data escolhida não pode ser menor que a data/hora atual.'
            } else {
              this.saveSchedule()
            }
          }
        } else {
          this.infoAllDay = true
          this.info = '* Por favor escolha data inicio/hora e data fim/hora do envio.'
        }
      }
    },
    saveSchedule () {
      const newSchedule = Object
        .assign(
          { email: this.form['service'] },
          { database: this.form['query'].database },
          { query: omit(this.form['query'], 'database') },
          this.formatDate(),
          { allDay: (this.checkedAllDay !== 'no') }
        )
      let info = {}
      doCreateSchedule(newSchedule)
        .then(({data}) => {
          info.type = 'success'
          info.msg = 'Agendamento realizado com sucesso'
          info.data = new Date()
          info.title = 'Status do Agendamento'
          Object.assign(this.form, this.$options.data().form)
          this.sendMsgModal(info)
        })
        .catch(this.sendMsgModal)
    },
    formatDate () {
      const startTime = (this.form.startTime) ? this.form.startTime + ':00' : ''
      const startDate = this.form.startDate ? new Date(this.form.startDate + ' ' + startTime) : ''
      const endTime = (this.form.endTime) ? this.form.endTime + ':00' : ''
      const endDate = this.form.endDate ? new Date(this.form.endDate + ' ' + endTime) : ''
      return {
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        sTime: startDate ? startDate.getTime() : '',
        eTime: endDate ? endDate.getTime() : ''
      }
    },
    sendMsgModal (value) {
      this.$emit('msg-modal', value)
    }
  }
}
</script>
<style>
  #srv {
    background: #ffeeba;
  }
  .card {
    margin-bottom: 0;
  }
  .mb-3, .my-3 {
    margin-bottom: 0 !important;
  }
  textarea {
    resize: none;
  }
  .msg {
    color: red;
    font-size: 12px;
    margin: 0px;
  }
</style>
