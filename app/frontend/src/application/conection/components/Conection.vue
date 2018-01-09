<template>
<!--<div class="animated fadeIn">-->
  <b-row>
    <b-col sm="12">
      <b-card>
        <connection-form @loading="onLoading" @list="fetchConnection" />
      </b-card>
    </b-col>
    <b-col sm="12" v-if="hasConnections">
      <b-card>
        <connection-list :data="connections" @list="fetchConnection"/>
      </b-card>
    </b-col>
    <loading v-if="show" :msg="msg"/>
  </b-row>
<!--</div>-->
</template>

<script>
import ConnectionList from './ConnectionList'
import ConnectionForm from './ConnectionForm'
import Loading from '../../components/Loading'
import mixin from '../../components/shared/mixins'
import _ from 'lodash'
export default {
  name: 'main-connection',
  components: {
    ConnectionList,
    ConnectionForm,
    Loading
  },
  mixins: [mixin],
  data () {
    return {
      show: false,
      connections: [],
      hasConnections: false,
      msg: 'Testando Conexão...'
    }
  },
  mounted () {
    this.fetchConnection()
  },
  methods: {
    onLoading (e) {
      this.show = e
    },
    fetchConnection () {
      this.listConnection().then((data) => {
        if (!_.isEmpty(data)) {
          this.connections = data
          this.hasConnections = true
        }
      })
    }
  }
}
</script>
