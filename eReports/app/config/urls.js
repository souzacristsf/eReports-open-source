module.exports = app = ({
    mongodb: {
        online: '',
        offline: 'mongodb://mongodb:27017/ereports'
    },
    api: '/api/v1',
    oracle: {
        user: process.env.DB_USER || 'system',
        password: process.env.DB_PASSWORD || 'oracle',
        connectString: process.env.DB_URL_CONNECTION || '192.168.0.115:49161/XE',
        stmtCacheSize: 40,
        externalAuth: !!process.env.NODE_ORACLEDB_EXTERNALAUTH
    },
    token: '1a5H(qzO&1+!8M35tX##vai#3A*@$%JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85'
})
