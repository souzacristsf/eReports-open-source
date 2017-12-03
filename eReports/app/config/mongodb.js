const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const mongoDB = require('../config/urls').mongodb

const online = false
const url = online ? mongoDB.online : mongoDB.offline

const options = {
    useMongoClient: true,
    autoReconnect: true,
    poolSize: 10,
    reconnectInterval: 1,
    reconnectTries: 1
}

// const options = { 
// 	db: { native_parser: true },
// 	server: { "auto_reconnect": true, "poolSize": 5, "socketOptions": { "keepAlive": 60 } }
// }

const connection = mongoose.createConnection(url, options)

mongoose.connect(url, options)
    .then(() => {
        mongoose.connection.on('error', (err) => {
            console.log('deu ruim')
            if (err) throw err
        })
    })
    .catch((err) => {
        if (err) throw err
    })

connection.on('error', (err) => console.log('Erro de conexao.', err))
connection.on('open', () => console.log('Conexão aberta.'))
connection.on('connected', () => console.log('Conectado'))
connection.on('disconnected', () => { console.log('disconnected'); process.exit() })
connection.on('reconnectFailed', () => console.log('-> gave up reconnecting'));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0)
    })
})
