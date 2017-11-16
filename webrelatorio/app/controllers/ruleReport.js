module.exports = app => {

	const RuleReport = app.models.ruleReport;
	const Help = app.helps.crud

	return {
		create: (req,res)=>{
			const ruleReport = new RuleReport();

			RuleReport.categoryReportID = req.body.categoryReportID
			RuleReport.user = req.body.user

			Help.create(ruleReport, res)
		}
	}

}