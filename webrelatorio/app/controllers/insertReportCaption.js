module.exports = app => { 

    const Report = require('./report')(app)

    const docs = [
        {    
            title: 'Quantidade de Atendimento por Tipo de Atendimento - Analitico',
            sequencia: 11,
            ordem: 1,
            description: 'Quantidade de atendimento por entrada.',
            typeDashboard: 'Analitico',
            descriptionCaption: 'Legenda para as colunas abaixo.',
            reportType: 'Table',
            titleColumn: [
                { position: 0, column: 'Paciente'},
                { position: 1, column: 'Data Entrada'},
                { position: 2, column: 'Data Alta'},
                { position: 3, column: 'Medico Responsavel'},
                { position: 4, column: 'Tipo de Atendimento'},
            ],
            subtitle: [
                { name: 'Descrição do atendimento por paciente'},
                { name: 'Dados referente a atendimento paciente'}
            ]
        },
        {
            title: 'Quantidade de Atendimento por Tipo de Atendimento - 2017',
            reportType: 'Graphic',
            sequencia: 11,
            ordem: 2,
            description: 'Quantidade de atendimento por entrada no ano atual e por mês.',
            descriptionCaption: 'Legenda para as colunas abaixo.',
            typeDashboard: 'Sintetico',
        }
    ]

    // console.log('ReportCaption: ', ReportCaption);

    Report.save(docs);
}