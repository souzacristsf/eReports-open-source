<template>
  <b-card :header="caption">
    <b-row>
      <b-col cols="6">
        <p>Total de Linhas: {{data.length}}</p>
      </b-col>
      <b-col cols="6" class="text-right">
        <p>Total de Colunas: {{fields.length}}</p>
      </b-col>
    </b-row>
    <b-table :hover="hover"
             :striped="striped"
             :bordered="bordered"
             :small="small"
             :fixed="fixed"
             class="table-responsive-sm"
             :items="data"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage">
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(data)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  export default {
    name: 'table',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      fields: {
        type: Array,
        default: () => []
      },
      caption: {
        type: String,
        default: 'Table'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        currentPage: 1,
        perPage: 5,
        totalRows: 0
      }
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
              : status === 'Banned' ? 'danger' : 'primary'
      },
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
