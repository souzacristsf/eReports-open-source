module.exports = app => {
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const atendimento = new Schema({
	PACIENTE:			{type: String},
	NR_ATENDIMENTO: 	{type: Number},
	TIPO_ATENDIMENTO: 	{type: String},
	SEQUENCE: 			{type: Number},
	IE_TIPO_ATENDIMENTO:{type: Number},
	MES_ENTRADA: 		{type: String},
	MES:		 		{type: Number},
	ANO:		 		{type: Number},
	PRIM_SETOR_ATEND: 	{type: String},   
	CD_ESTABELECIMENTO: {type: Number},     
	MEDICO_RESP_ATEND: 	{type: String},        
	DT_ENTRADA: 		{type: Date},        
	DT_ALTA: 			{type: Date},        
	QTD: 				{type: Number},        
	CREATED_AT: 		{type: Date, default: Date.now},
	UPDATED_AT: 		{type: Date},
	DELETED_AT: 		{type: Date}
})

 atendimento.plugin(mongoosePaginate)

	return mongoose.model('Atendimento', atendimento)

}
