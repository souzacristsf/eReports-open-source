const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const mongoDB = require('../config/urls').mongodb

const online = false
const url = online ? mongoDB.online : mongoDB.offline

const options = {
    useMongoClient: true
}

const connection = mongoose.createConnection(url, options)

mongoose.connect(url, options)
    .then(() => {
        mongoose.connection.on('error', (err) => {
            if (err) throw err
        })
    })
    .catch((err) => {
        if (err) throw err
    })

connection.on('error', (err) => console.log('Erro de conexao.', err))
connection.on('open', () => console.log('Conexão aberta.'))
connection.on('connected', () => console.log('Conectado'))
connection.on('disconnected', () => console.log('Desconectado'))

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0)
    })
})
