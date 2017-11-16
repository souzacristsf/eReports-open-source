module.exports = app => { 

    const Report = app.models.report
    const Help = app.helps.crud
    
    return {
        
        updateLegend: (req, res) => {

            const query = {
                sequencia: req.body.sequencia
            }

            const mod = req.body

            const options = {
                returnNewDocument: true
            }
            
            Help.findOneAndUpdate(Report, query, mod, res, options)
        },
        
        save: (report) => {
            
            var insert = (data) => {
                const report = new Report(data);

                var query = {
                    sequencia: data.sequencia,
                    ordem: data.ordem
                }

                Report.findOne(query)
                .then( result => {
                    if(result){
                        return;
                    } else {
                        report.save();        
                    }
                })
            }

            report.map(insert)
        }, 

        listOne: (req, res) => {
            const query = {
                sequencia: req.params.sequencia
            }
            
            Help.listOne(Report, query, res)
        },

        listAll: (req,res)=>{
			const query = {}
			const mod = {
				page: 1,
				limit: 10
			}

			Help.listAll(Report, query, mod, res)
		},
    }
}