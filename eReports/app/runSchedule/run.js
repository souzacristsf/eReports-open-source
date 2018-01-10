module.exports = (app) => {
    
        const Schedule = app.models.schedule
        const moment = require('moment')
        const prepare = app.runSchedule.prepareSend
        return {
            
            schedule: () => {
                Schedule.find()
                .then(data => {
                    // new date for trunc
                    var now = new Date(); 
                    // trunc date without the seconds
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), 0);
                    data.map(data => {
                            if(data.sTime == now_utc.getTime()){
                                prepare.mounted(data)
                            }
                        })
                    })
            }
        }
    }
    