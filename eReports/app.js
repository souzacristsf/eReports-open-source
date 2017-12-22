// const connect = require('./app/connect')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const path = require('path')
const validator = require('express-validator')
const consign = require('consign')
const schedule = require('node-schedule')

const app = express()

app.set('superSecret', '1a5H(qzO&1+!8M35tX##vai#3A*@$%JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(validator())
app.use(cors())
app.use(express.static(path.join(__dirname, './public')))

app.use('/public', express.static(path.join(__dirname, './public'))) // adicionei essa linha aqu

app.jwt = require('./app/config/jwt-config')(app)
// DESCOMENTE A LINHA ABAIXO, PARA ATIVAR A AUTENTICACAO.
// app.use('/api', app.jwt);

// console.log('app.jwt:', app.jwt)

app.set('port', (process.env.PORT || 9000))

// const teste_conection = require('./teste_conection')(connect)

// app.get('/api/relatorio/teste_conection', teste_conection)

// init route

app.url = require('./app/config/urls').api

// setTimeout(function () { require('./app/email/app')(connect) }, 2000)

const port = app.get('port')

const server = http.createServer(app)

const io = require('socket.io')(server)

app.use(function (req, res, next) {
    res.io = io
    next()
})

consign({cwd: 'app', verbose: false})
  .include('config')
  .include('middleware')
  .include('models')
  .include('helps')
  .include('controllers')
  .include('validates')
  .include('routes')
//   .include('email')
  .into(app)

// 404
app.use(function (req, res, next) {
    var err = {error: 'Route not found'}
    res.status(404).json(err)
})

console.log('port: ', port)

server.listen(port)
