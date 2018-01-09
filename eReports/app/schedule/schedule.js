module.exports = (app) => {
    
        const Schedule = app.models.schedule
        const moment = require('moment')

        return {

            dashboard: () => {
                Schedule.find()
                    .then(data => {
                        var now = new Date(); 
                        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), 0);
                        data.some(data => {
                            if(data.startDate.getTime() == now_utc.getTime()){
                                console.log('É IGUAL')
                            } else {
                                console.log('NÃO É IGUAL')
                            }
                        })
                    })
            }
        }
    }
    