<template>
  <b-card no-body>
    <b-tabs card v-model="tabIndex">
      <b-tab title="Consulta">
        <b-form @submit.stop.prevent="saveQuery">
          <b-alert :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            <p>Este alerta fecha em {{dismissCountDown}} segundos...</p>
            <div v-if="form['database']">Database Selecionada: <strong>{{form['database'].connectString}}</strong></div>
            <b-progress variant="warning"
                        :max="dismissSecs"
                        :value="dismissCountDown"
                        height="4px">
            </b-progress>
          </b-alert>
          <b-form-group label="Nome Conexão">
              <b-form-select v-model="form['database']"
                             :options="options"
                             @change="showAlert"
                             @blur.native="onBlur('database')">
                <template slot="first">
                  <!-- this slot appears above the options from 'options' prop -->
                  <option :value="null" disabled>-- Escolha uma conexão --</option>
                </template>
              </b-form-select>
            <p class="msg" v-if="errors['database']">* Escolha uma conexão para obter os dados."</p>
            <b-button size="sm" v-if="options.length === 0" :to="{path: '/conection'}" variant="link" class="float-right">Cadastrar ou Ativar um conexão.</b-button>
          </b-form-group>
          <b-form-group label="Nome Consulta">
            <b-form-input type="text"
                          v-model.trim="form['name']"
                          placeholder="ex.: relatorio produtos vendidos"
                          @blur.native="onBlur('name')">
            </b-form-input>
            <p class="msg" v-if="errors['name']">* Por favor digite o nome para identificar essa consulta.</p>
          </b-form-group>
          <b-form-group label="Registrar SQL"
                        label-for="exampleInput1"
                        description="*Lembre-se de renomear todas as colunas do SQL. :)">
            <b-form-textarea
                      ref='txtSQL'
                      v-model.trim="form['query']"
                      :state="!errors['query'] && form['query']"
                      placeholder="Cole seu SQL aqui para envio do relatorio."
                      :rows="12"
                      :max-rows="12">
            </b-form-textarea>
            <p class="msg" v-if="errors['query']">* Por favor digite um SQL para a consulta."</p>
          </b-form-group>
          <div class="form-actions">
            <b-button size="sm" :disabled="btnSave" type="submit" variant="primary">Salvar Conexão</b-button>
            <b-button size="sm" :disabled="stateButton" type="button" variant="outline-secondary" @click="execQuery">Executar Consulta</b-button>
            <b-button size="sm" type="button" variant="danger">Cancelar</b-button>
          </div>
        </b-form>
      </b-tab>
      <b-tab title="Resultado" :disabled="disTabResult">
        <!-- <b-row>
          <b-col cols="6">
            <p>Total de Linhas: {{totalRows}}</p>
          </b-col>
          <b-col cols="6" class="text-right">
            <p>Total de Colunas: {{totalColumn}}</p>
          </b-col>
        </b-row> -->
        <c-table hover striped bordered small fixed :data="resultado" :fields="fields" caption="<i class='fa fa-align-justify'></i> Resultado da Consulta"></c-table>
        <b-form>
          <b-form-group>
            <h4>Alterar nome das colunas</h4>
            <b-alert show variant="warning">Obs: aqui alteramos os nomes das colunas para envio no e-mail.</b-alert>
            <b-list-group>
              <div v-for="(field, index) in fields" :key="field.key">
                <b-row>
                  <b-col cols="6">
                    <b-list-group-item>{{field.key}}</b-list-group-item>
                  </b-col>
                  <b-col cols="6">
                    <b-form-input type="text" v-model="field.name" placeholder="Mudar nome da Coluna..."></b-form-input>
                  </b-col>
                </b-row>
              </div>
            </b-list-group>
          </b-form-group>
          <!-- <div class="form-actions">
            <b-button size="sm" type="submit" @click.stop.prevent="alterColumn" variant="primary">Alterar Coluna</b-button>
            <b-button size="sm" type="button" variant="danger">Cancelar</b-button>
          </div> -->
        </b-form>
      </b-tab>
      <b-tab :title="`Consulta ${i+1}`" v-for="i in tabs" :key="i">
        Consulta {{i+1}}
        <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
          Close tab
        </b-btn>
      </b-tab>

      <!-- New Tab Button (Using tabs slot) -->
      <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
        +
      </b-nav-item>

      <!-- Render this if no tabs -->
      <div slot="empty" class="text-center text-muted">
        There are no open tabs
        <br> Open a new tab using + button.
      </div>
    </b-tabs>
  </b-card>
</template>

<script>
import { doSaveQuery, doRunQuery } from '../services'
import _ from 'lodash'
import cTable from '../../components/Table.vue'
export default {
  name: 'query-form',
  components: {
    cTable
  },
  data () {
    return {
      form: {
        name: '',
        query: '',
        database: ''
      },
      errors: {
        name: false,
        query: false,
        database: false
      },
      btnSave: true,
      disTabResult: true,
      // totalRows: 0,
      // totalColumn: 0,
      fields: [],
      resultado: [],
      tabIndex: 0,
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      tabs: [],
      tabCounter: 0
      // autofocus select * from sys.product c
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    form: {
      handler () {
        this.btnSave = true
        this.disTabResult = true
      },
      deep: true
    }
  },
  computed: {
    stateButton () {
      return this.hasError('name') || this.hasError('query') || this.hasError('database')
    }
  },
  methods: {
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    validation: (value) => String(value).length > 0,
    onBlur (field) {
      this.errors[field] = this.hasError(field)
    },
    hasError (field) {
      return !this.validation(this.form[field])
    },
    saveQuery () {
      const newQuery = _.merge({}, this.form, { columns: this.normalizeColumn(this.fields) })
      // const newQuery = _.merge({}, this.pick(this.form.database, 'connect_id'), this.pick(this.form, ['name', 'query']), { columns: this.normalizeColumn(this.fields) })
      let info = {}
      doSaveQuery(newQuery).then(
        data => {
          info.type = 'success'
          info.msg = 'Relatorio criado com sucesso'
          info.data = new Date()
          info.title = 'Status da Criação'
          Object.assign(this.form, this.$options.data().form)
          this.form.query = ''
          this.sendMsgModal(info)
        }
      ).catch(this.sendMsgModal)
    },
    pick (obj, fields) {
      return _.pick(obj, fields)
    },
    normalizeColumn (item) {
      return item.map(column => ({key: column.key, name: (column.name) ? column.name : column.key}))
    },
    execQuery () {
      const query = _.merge({}, this.pick(this.form.database, 'connect_id'), this.pick(this.form, ['name', 'query']))
      doRunQuery(query).then(({data}) => {
        this.disTabResult = false
        this.btnSave = false
        this.fields = _.keys(data.data[0]).map((value) => ({ key: value, name: '', sortable: true }))
        this.resultado = data.data
        this.$nextTick(() => {
          this.tabIndex = 1
        })
      }).catch(this.sendMsgModal)
    },
    closeTab (x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1)
        }
      }
    },
    newTab () {
      this.tabs.push(this.tabCounter++)
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    sendMsgModal (value) {
      this.$emit('msg-modal', value)
    },
    alterColumn () {
      console.log('This.Columns: ', this.fields)
    }
  },
  mounted () {
    this.$refs.txtSQL.focus()
  }
}
</script>
<style>
  .msg {
      color: red;
      font-size: 12px;
      margin: 0px;
    }
</style>

