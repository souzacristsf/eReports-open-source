const moment = require('moment');

console.log('momnet', moment);
var startDate = new Date("09/01/2017");
//var endDate = "10/01/2017";

var today = new Date(),
    oneDay = ( 1000 * 60 * 60 * 24 ),
    yesterday = new Date( today.valueOf() - ( 1 * oneDay ) ),
    thirtyDays = new Date( today.valueOf() - ( 30 * oneDay ) ),
    monthPrevious = thirtyDays.getMonth()+1,
    monthCurrent = today.getMonth()+1,
    sevenDays = new Date( today.valueOf() - ( 7 * oneDay ) );
    // fifteenDays = new Date( today.valueOf() - ( 15 * oneDay ) ),
    // sevenDays = new Date( today.valueOf() - ( 7 * oneDay ) );
//moment(startDate).endOf('month').toDate()
//console.log(moment(thirtyDays).startOf('month').toDate())

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
            // PERIOD: {
            //     $dateToString: {
            //         format: "%d-%m-%Y",
            //         date: "$DT_ENTRADA"
            //     }
            // },
            // MES: "$MES"
        },
        //new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  02, 00, 00);
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

db.atendimentos.aggregate(
    [
        _match,
        _group,
        _project
    ]
)

// //---------------------------------------------
// var startDate = "01/01/2017";
// var endDate = "02/01/2017";

// var _match = {
//     $match : {
//         "IE_TIPO_ATENDIMENTO": 1,
//         "DT_ENTRADA" : {
//             "$gte": new Date(startDate), 
//             "$lt": new Date(endDate)
//         }
//     }
// }

// var _group = {
//     $group : {
//         _id : {
//             TIPO_ATENDIMENTO: "$TIPO_ATENDIMENTO", 
//             MES: "$MES"
//         },
//         "TOTAL": {
//             $sum: "$QTD"
//         }
//     }
// }


// db.atendimentos.aggregate( [ _match, _group ] )


// db.atendimentos.find(_match.$match).count()

// 'use strict';
// var mongoose = require('mongoose');

// const util = require('util');
// const Transaction = require('../../transactions/model/Transaction');
// const Boom = require('boom');
// const ObjectId = mongoose.Schema.Types.ObjectId

// module.exports = {
//     method: 'POST',
//     path: '/api/reports/ConversionRate/',
//     config: {
//         auth: false,
//         handler: (req, res) => {
//             console.log(req.payload)

//             var startDate = req.payload.startDate;
//             var endDate = req.payload.endDate;
//             var tipo = req.payload.type;
//             var store = req.payload.store;
//             var detail = req.payload.detail;
//             var group = req.payload.group;
//             //var values = trans_type.split(',');
//             //console.log (JSON.stringify(trans_type));

            
//             console.log("######Inicio das variaveis#######")
//             console.log(startDate);
//             console.log(endDate);
//             console.log(tipo);
//             console.log(store);
//             console.log(detail);
//             console.log(group);

//             // var res = "VI"
//             console.log('tipo: ', tipo)

//             const _match = {
//                 $match : {
//                     "type":{$in: tipo },
//                     "creation_date" : {
//                         "$gte": new Date(startDate), 
//                         "$lt": new Date(endDate)
//                     }
//                 }
//             }

//             const _group = {
//                 $group : {
//                     _id : {
//                         REGION_ID: "$region",
//                         STORE_ID: "$store",
//                         PERIOD: {
//                             $dateToString: {
//                                 format: "%m-%d-%Y",
//                                 date: "$creation_date"
//                             }
//                         },
//                         DATESORT: {
//                             $dateToString: {
//                                 format: "%Y-%m-%d",
//                                 date: "$creation_date"
//                             }
//                         },
//                     },
//                     "SALES": {
//                         "$sum": {
//                             "$cond": [
//                                 { "$ne": [ "type", "VI" ] },
//                                 //{ "type": { $all: [trans_type ] } },
//                                 1,
//                                 0
//                             ]
//                         }
//                     },
//                     "VISITOR": {
//                         "$sum": {
//                             "$cond": [
//                                 { "$eq": [ "$type", "VI" ] },
//                                 1,
//                                 0
//                             ]
//                         }
//                     },
//                     TOTAL: { $sum: 1 }
//                 }
//             }

//             const _project = { 
//                 $project: {
//                     "_id": 0,
//                     "REGION_ID" : "$_id.REGION_ID",
//                     "STORE_ID" : "$_id.STORE_ID",
//                     "PERIOD" : "$_id.PERIOD",
//                     "DATESORT" : "$_id.DATESORT",
//                     SALES: 1,
//                     VISITOR: 1,
//                     RATE: {
//                         $cond: [
//                             { $eq: [ "$VISITOR", 0 ] },
//                             0,
//                             { $multiply: [ { $divide: ["$SALES", "$VISITOR"] } , 100 ] }
//                         ]
//                     }
//                 }
//             }

//             const _sort = { 
//                 $sort : { "_id.day" : 1 } 
//             }

//             // "type":{$in: ["VI", "TI", "TT"]},
//             console.log('match: ', _match);
 

//             Transaction
//                 .aggregate([
//                     _match,
//                     _group,
//                     _project,
//                     _sort
//                 ], function (err, result) {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     }
//                     res (result)
//                     // console.log(result);
//                 });
//         },
//         // Add authentication to this route
//         // The user must have a scope of `admin`
//         // auth: {
//         //     strategy: 'jwt',
//         //     scope: ['admin'],
//         //     auth: false
//         // }
//     }
// }                   