<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
        <img src="../../../../static/img/logotipo.png" alt="" width="450">
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Faça login no sistema eReports</p>
                <div class="input-group mb-3" >
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <b-form-input @blur.native="onBlur('username')" :state="stateUser" :formatter="excSpace" id="username" type="text" v-model="record['username']" placeholder="Username"></b-form-input>
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <b-form-input @blur.native="onBlur('password')" @keyup.enter.native="signin" :state="statePass" id="password" type="password" v-model="record['password']" placeholder="Password"></b-form-input>
                </div>
                <!--<p :class="{'has-error': errors['username']}" variant="danger" v-if="errors['username']">* Username, é obrigatorio.</p>
                <p :class="{'has-error': errors['password']}" variant="danger" v-if="errors['password']">* Password, é obrigatorio.</p>-->
                <b-alert variant="danger" :show="errors['username']">* Username é obrigatorio.</b-alert>
                <b-alert variant="danger" :show="errors['password']">* Password é obrigatorio.</b-alert>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" :disabled="stateButton" @click="signin" class="px-4">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Esqueceu a senha?</b-button>
                    <b-button variant="link" class="px-0" @click="signup">Register Now!</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
           <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Registrar</h2>
                  <p>Para acessar o sistema eReport é necessario um cadastro de usuario.</p>
                  <b-button variant="primary" class="active mt-3" @click="register">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
            -->

        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {success, error} from '../../../toast'
import {mapActions, mapGetters} from 'vuex'
// import store from '../../../store'
// Object.assign(this, this.$options.data()) -> para resetar o form....
export default {
  name: 'Signin',
  // beforeRouteEnter (to, from, next) {
  // console.log('store: ', store)
  // store.dispatch('checkUserToken').then(token => {
  //   if (token) {
  //     return next({name: 'Dashboard'})
  //   }
  // }).catch(() => {
  //   console.log('Deu Ruimm...')
  //   next() // redirect to login
  // })
  // },
  data () {
    return {
      errors: {
        username: false,
        password: false
      },
      validation: (value) => String(value).length > 0,
      record: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'attemptLogin'
    ]),
    onBlur (field) {
      this.errors[field] = this.hasError(field)
    },
    hasError (field) {
      return !this.validation(this.record[field])
    },
    signin () {
      const {username, password} = this.record
      this.attemptLogin({username, password})
        .then(() => {
          success('Login Efetuado!!!')
          this.$router.push('/dashboard')
        })
        .catch(err => {
          error('Verifique o servidor!!!')
          console.log(err)
        })
    },
    signup () {
      this.$router.push('/auth/signup')
    },
    excSpace (value, event) {
      return value.replace(' ', '')
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'getAuthToken'
    ]),
    stateUser () {
      if (this.record.username.length === 0) {
        return ''
      } else if (this.record.username.trim().length > 5) {
        return true
      } else {
        return false
      }
    },
    statePass () {
      if (this.record.password.length === 0) {
        return ''
      } else if (this.record.password.trim().length > 5) {
        return true
      } else {
        return false
      }
    },
    stateButton () {
      return !this.stateUser || !this.statePass
    }
  }
}
</script>
