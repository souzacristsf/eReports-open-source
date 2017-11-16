module.exports = app => {
    const moment = require('moment');
    const Atendimento = app.models.atendimento//require('../models/atendimento');

	const Help = app.helps.crud

    // console.log('Atendimento: ', Atendimento)

	return {
		create: (req, res)=>{
			const atendimento = new Atendimento();

			// Object.assign(atendimento, req.body)

            // console.log('atendimento: ', atendimento)

            // res.status(200).json({"success": "Deu certo"})
			// Help.createUser(atendimento, res)
        },

        updateAll: ( req, res ) => {
            
        },

        listAll: (req,res)=>{

            var startDate = (req.query.startDate) ? moment.utc(req.query.startDate, 'MM/DD/YYYY').toDate() : "01/01/2017";
            var endDate = (req.query.endDate) ? moment.utc(req.query.endDate, 'MM/DD/YYYY').toDate() : "01/01/2018";
            var ie_tipo_atendimento =  req.params.ie_tipo_atendimento || 1;

			const query = {
                "IE_TIPO_ATENDIMENTO": Number(ie_tipo_atendimento),
                    "DT_ENTRADA" : {
                        "$gte": startDate, 
                        "$lt": endDate
                    }
            } 

			const mod = {
				page: (Number(req.query.page)) ? Number(req.query.page) + 1 : 1,
				limit: 25,
				select: '-ANO -QTD -__v -_id'
			}
            // console.log('oxi')
            // console.log('query: ', query );

			Help.listAll(Atendimento, query, mod, res)
		},
        
        listAllAtendimentoPorMes: (req, res) => {
            var startDate = (req.query.startDate) ? moment.utc(req.query.startDate, 'MM/DD/YYYY').toDate() : moment.utc("01/01/2017", 'MM/DD/YYYY').toDate();
            var endDate = (req.query.endDate) ? moment.utc(req.query.endDate, 'MM/DD/YYYY').toDate() : moment.utc("01/01/2018", 'MM/DD/YYYY').toDate();
            var ie_tipo_atendimento =  Number(req.params.ie_tipo_atendimento);
            var _match = {
                $match: {
                    "DT_ENTRADA" : {
                        "$gte": startDate, 
                        "$lt": endDate
                    }
                }
            }

            var _group = {
                $group : {
                    _id : {
                        TIPO_ATENDIMENTO: "$TIPO_ATENDIMENTO", 
                        MES: "$MES",
                        MES_ENTRADA: "$MES_ENTRADA"
                    },
                    "TOTAL": {
                        $sum: "$QTD"
                    }
                }
            }

            var _project = { 
                $project: {
                    "_id": 0,
                    "TIPO_ATENDIMENTO" : "$_id.TIPO_ATENDIMENTO",
                    "MES" : "$_id.MES",
                    "MES_ENTRADA" : "$_id.MES_ENTRADA",
                    "TOTAL" : 1
                }
            }

            var _sort = { 
                $sort : { "TIPO_ATENDIMENTO" : 1, "MES": 1} 
            }
            
            // const dt_busca = moment(req.query.startDate, 'DD/MM/YYYY', 'fr', true).format();
            //var dataPesquisa = moment(req.query.startDate).format ('DD/MM/YYYY') 
            // var dataPesquisa = moment(req.query.startDate).format('L'); 
            // var dataFim = moment(req.query.endDate).format('L'); 

            // console.log('startDate: ', dataPesquisa)
            // console.log('endDate: ', dataFim)

            // console.log('req.query.startDate: ', typeof moment(moment(req.query.startDate).format('MM/DD/YYYY')).toDate())
            // console.log('req.query.startDate: ', moment(req.query.startDate).toDate())
            // console.log('req.query.startDate UTC: ', moment.utc(req.query.startDate).toDate())

            var __group = {
                $group : {
                    _id: { TIPO_ATENDIMENTO: "$TIPO_ATENDIMENTO" },
                    "MES_ENTRADA": { $push: "$MES_ENTRADA" },
                    "MES": { $push: "$MES" },
                    TIPO_ATENDIMENTO: "$TIPO_ATENDIMENTO",
                    "TIPO_ATENDIMENTO": { $push: "$TOTAL" }
                }
            }   

            if( ie_tipo_atendimento != 0) {
                _match.$match.IE_TIPO_ATENDIMENTO = ie_tipo_atendimento
            }               

            console.log('_match: ', _match)

            // var _match = {
            //     $match : {
            //         "IE_TIPO_ATENDIMENTO": ie_tipo_atendimento,
            //         "DT_ENTRADA" : {
            //             "$gte": startDate, 
            //             "$lt": endDate
            //         }
            //     }
            // }
            // console.log('_match: ', _match)

            var arr = [ _match, _group, _project, _sort, __group ]; 

            // console.log('arr: ', arr)
            // console.log('Atendimento: ', Atendimento);
            Help.aggregateList(Atendimento, arr, res)

        },

        listAllResumo: ( req, res ) => {

            console.log('Entrouuuuuu')

            var startDate = new Date("09/01/2017");
            //var endDate = "10/01/2017";

            var today = new Date(),
                oneDay = ( 1000 * 60 * 60 * 24 ),
                yesterday = new Date( today.valueOf() - ( 1 * oneDay ) ),
                thirtyDays = new Date( today.valueOf() - ( 30 * oneDay ) ),
                monthPrevious = thirtyDays.getMonth()+1,
                monthCurrent = today.getMonth()+1,
                sevenDays = new Date( today.valueOf() - ( 7 * oneDay ) );

            var _match = {
                $match : {
                    "DT_ENTRADA" : {
                        "$gte": new Date(startDate.toDateString()), 
                        "$lte": new Date(today)
                    }
                }
            }

            var _group = {
                $group : {
                    _id : {
                        TIPO_ATENDIMENTO: "$TIPO_ATENDIMENTO"
                    },
                    "TOTAL": {
                        $sum: "$QTD"
                    },
                    "HOJE": {
                        "$sum": {
                            "$cond": [
                                {  "$eq": [ "$DT_ENTRADA", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),  02, 00, 00)] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "ONTEM": {
                        "$sum": {
                            "$cond": [
                                {  "$eq": [ "$DT_ENTRADA", new Date(yesterday.getUTCFullYear(), yesterday.getUTCMonth(), yesterday.getUTCDate(),  02, 00, 00)] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "ULTIMA_SEMANA": {
                        "$sum": {
                            "$cond": [
                                {  "$gte": [ "$DT_ENTRADA", new Date(sevenDays.toDateString())] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "MES_ANTERIOR": {
                        "$sum": {
                            "$cond": [
                                {  "$eq": [ "$MES", monthPrevious] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "MES_ATUAL": {
                        "$sum": {
                            "$cond": [
                                {  "$eq": [ "$MES", monthCurrent] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "ULTIMOS_30_DIAS": {
                        "$sum": {
                            "$cond": [
                                {  "$gte": [ "$DT_ENTRADA", new Date(thirtyDays.toDateString())] },
                                "$QTD",
                                0
                            ]
                        }
                    },
                    "ULTIMOS_30_DIAS_MEDIA": {
                        "$sum": {
                            "$cond": [
                                {  "$gte": [ "$DT_ENTRADA", new Date(thirtyDays.toDateString())] },
                                "$QTD",
                                0
                            ]
                        }
                    }
                }
            }

            var _project = { 
                $project: {
                    "_id": 0,
                    "TIPO_ATENDIMENTO" : "$_id.TIPO_ATENDIMENTO",
                    "TOTAL" : 1,
                    "HOJE" : 1,
                    "ONTEM" : 1,
                    "ULTIMA_SEMANA" : 1,
                    "MES_ANTERIOR" : 1,
                    "MES_ATUAL" : 1,
                    "ULTIMOS_30_DIAS": 1,
                    "ULTIMOS_30_DIAS_MEDIA": { $trunc: { $divide: [ "$ULTIMOS_30_DIAS", 30 ] } }
                }
            }

            var arr = [_match, _group, _project]; 
            
            Help.aggregateList(Atendimento, arr, res)

        }

	}

}