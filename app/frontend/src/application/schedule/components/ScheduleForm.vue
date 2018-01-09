<template>
    <b-row>
      <b-col>
        <b-card>
          <div slot="header">
            <strong>Agendar Envio</strong>
          </div>
          <b-form-fieldset
            label="Email Remetente">
            <b-form-select v-model="form['service']" :options="options.email" class="mb-3">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>-- Escolha o e-mail remetente. --</option>
              </template>
            </b-form-select>
            <div id="srv" v-if="form['service']">E-mail de destino: <strong>{{form['service'].to}}</strong></div>
            <!--<div v-if="selected">Database Selecionada: <strong>{{selected.connection}}</strong></div>-->
          </b-form-fieldset>
          <b-form-fieldset label="Selecione Reatório/SQL">
            <b-card>
              <b-form-fieldset
                label="Nome Relatório">
                <b-form-select v-model="form['query']" :options="options.query" class="mb-3">
                  <template slot="first">
                    <option :value="null" disabled>-- Escolha o nome do relatório. --</option>
                  </template>
                </b-form-select>
              </b-form-fieldset>
              <div id="srv" v-if="form['query']">Conexão e Driver escolhido: <strong>{{form['query'].database.connectString}} e {{form['query'].database.driver}}</strong></div>
              <b-form-fieldset
                label="SQL Cadastrado" v-if="form['query']">
                <textarea disabled rows="3" class="form-control" :value="sql"></textarea>
              </b-form-fieldset>
            </b-card>
          </b-form-fieldset>
          <b-row v-if="checked !== 'yes'">
            <b-col sm="6">
                <b-row>
                  <b-col sm="6">
                    <b-form-fieldset label="Data Inicio">
                      <b-form-input v-model="form['startDate']" type="date"></b-form-input>
                    </b-form-fieldset>
                  </b-col>
                  <b-col sm="6">
                    <b-form-fieldset label="Hora Inicio">
                      <b-form-input v-model="form['startTime']" type="time"></b-form-input>
                    </b-form-fieldset>
                  </b-col>
                </b-row>
            </b-col>
            <b-col sm="6" v-if="checkedAllDay !== 'yes'">
              <b-row>
                  <b-col sm="6">
                    <b-form-fieldset label="Data Fim">
                      <b-form-input v-model="form['endDate']" type="date"></b-form-input>
                    </b-form-fieldset>
                  </b-col>
                  <b-col sm="6">
                    <b-form-fieldset label="Hora Fim">
                      <b-form-input v-model="form['endTime']" type="time"></b-form-input>
                    </b-form-fieldset>
                  </b-col>
                </b-row>
            </b-col>
          </b-row>
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
            <b-button size="sm" @click="saveSchedule" type="submit" v-if="checked === 'no'" variant="primary">Salvar</b-button>
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
import { omit } from 'lodash'
import { doCreateSchedule } from '../services'
export default {
  name: 'schedule-form',
  data () {
    return {
      form: {
        service: null,
        query: null,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: ''
      },
      checked: 'no',
      checkedAllDay: 'no'
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
  methods: {
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
          console.log('Dados Cadastrados: ', data)
          console.log('Data Inicio: ', data.startDate.toLocaleString())
          console.log('Data Fim: ', data.endDate.toLocaleString())
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
      const endTime = this.form.endTime + ':00'
      const startTime = this.form.startTime + ':00'
      return {
        startDate: new Date(this.form.startDate + ' ' + startTime),
        endDate: new Date(this.form.endDate + ' ' + endTime),
        startTime: startTime,
        endTime: endTime
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
</style>
