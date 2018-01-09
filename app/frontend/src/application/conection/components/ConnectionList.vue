<template>
  <b-card :header="caption">
    <b-table class="table-responsive-sm"
      :fields="fields"
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :small="small"
      :fixed="fixed"
      :items="data"
      :current-page="currentPage"
      :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="action" slot-scope="data">
        <b-button size="sm" variant="success" v-if="data.item.deleted_at" title="Habilitar" class="icon-check" @click="enableConnection(data.item)">
        </b-button>
        <b-button size="sm" variant="danger" v-if="!data.item.deleted_at" title="Desativar" class="icon-close" @click="disableConnection(data.item)">
        </b-button>
        <b-button size="sm" :to="{name: 'Edit', params: { connect_id: data.item.connect_id }}" variant="warning" title="Editar" class="icon-note" @click="edit(data)">
        </b-button>
      </template>
    </b-table>
  </b-card>
</template>
<script>
  import { doDisableConnectionId, doUpdateConnectionId } from '../services'
  // import moment from 'moment'
  import { mapActions } from 'vuex'
  export default {
    name: 'connection-list',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      outlined: {
        type: Boolean,
        default: true
      },
      caption: {
        type: String,
        default: 'Minhas Conexões'
      },
      hover: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: true
      },
      small: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Boolean,
        default: true
      }
    },
    data: () => {
      return {
        // items: [],
        fields: [
          {key: 'connect_id', label: 'Codigo', sortable: true},
          {key: 'nameConect', label: 'Nome Conexão', sortable: true, formatter: (value) => { return value.toUpperCase() }},
          {key: 'connectString', label: 'Conexão', sortable: true},
          {key: 'user', label: 'Usuario', sortable: true},
          {key: 'driver', label: 'Driver', sortable: true},
          {key: 'status', label: 'Status', sortable: true},
          // {key: 'created_at', label: 'Data Criação', sortable: true, formatter: (value) => { return moment(String(value)).format('DD/MM/YYYY HH:mm:ss') }},
          {key: 'created_at', label: 'Data Criação', sortable: true, formatter: (value) => { return new Date(value).toLocaleString() }},
          {key: 'updated_at', label: 'Data Atualização', sortable: true, formatter: (value) => { return (value) ? new Date(value).toLocaleString() : '' }},
          // {key: 'updated_at', label: 'Data Atualização', sortable: true, formatter: (value) => { return (value) ? moment(String(value)).format('DD/MM/YYYY HH:mm:ss') : '' }},
          {key: 'action', label: 'Ação'}
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: 0
      }
    },
    methods: {
      ...mapActions(['doEditConnection']),
      getBadge (status) {
        return status === 'Active' ? 'success' : 'secondary'
      },
      getRowCount (items) {
        return items.length
      },
      edit (item) {
        this.doEditConnection(item.item)
      },
      disableConnection (item) {
        doDisableConnectionId({connect_id: item.connect_id}).then(
          ({data}) => {
            this.$emit('list')
          })
          .catch(err => {
            console.log('meu erro: ', err.response.data)
          })
      },
      enableConnection (item) {
        delete item.deleted_at
        doUpdateConnectionId(item).then(
          ({data}) => {
            this.$emit('list')
          })
          .catch(err => {
            console.log('meu erro: ', err.response.data)
          })
      }
    }
  }
</script>
