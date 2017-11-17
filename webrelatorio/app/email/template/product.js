const hbs = require('handlebars')

hbs.registerHelper("moduloIf", function(index_count,mod,block) {

  if(parseInt(index_count)%(mod)=== 0){
    return block.fn(this);}
});

const template = hbs.compile(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
table {
    border-collapse: collapse !important;
    width: 100% !important;
}

.email-footer {
    margin-top: 20px;
    width: 570px;
    margin: 0 auto;
    -premailer-width: 570px;
    -premailer-cellpadding: 0;
    -premailer-cellspacing: 0;
    text-align: center !important;
}

p.titulo {
    font-size: 14px;
}

p.sub {
    font-size: 12px;
}
    
.email-footer p {
    margin-top: 20px;
    color: #AEAEAE;
}

thead {
   padding:0 !important; margin:0 !important;
}

th, td {
    text-align: left !important;
    padding: 8px !important;
}

tr:nth-child(odd) {
   background-color: #ccc;
}

tr:nth-child(even) {
   background-color: pink;
}

th {
    background-color: #4CAF50;
    color: white;
}

</style>
</head>
<body>

<div class="jumbotron">
    <h3 class="text-center">HMMKB - Atendimento e internação</h1>
    <h4 class="titulo" >Segue relatorio indicadores de Gestão à vista.</h3>
    <p style="font-size: 10px;" ><strong>Envio realizado automaticamente pelo nosso sistema.</strong></p>
</div>
<div class="container">
    <h4><strong>Quantidade de Atendimento por Tipo de Atendimento - 2017</strong></h4>
    <p style="font-size: 12px;" >Quantidade de atendimento por entrada no ano atual e por mês.</p>
        <table class="table table-striped" style="background-color: #4CAF50;">
        <thead>
            <tr style="background-color: #4CAF50; text-align:center;">
                <th>Mês</th>
                <th>SUS</th>
                <th>Convênio</th>
                <th>Particular</th>
                <th>Internado</th>
                <th>Externo</th>
                <th>Ambulatorial</th>
                <th>Pronto Socorro</th>
            </tr>
        </thead>
        <tbody>           
            {{#tipo_atendimento}} 
                <tr style="background-color: {{COLOR}};">
                    <td>{{MES}}</td>
                    <td>{{SUS}}</td>
                    <td>{{CONVENIO}}</td>
                    <td>{{PARTICULAR}}</td>
                    <td>{{INTERNADO}}</td>
                    <td>{{EXTERNO}}</td>
                    <td>{{AMBULATORIAL}}</td>
                    <td>{{PRONTO_SOCORRO}}</td> 
                </tr>           
            {{/tipo_atendimento}}
        </tbody>
        </table>
    </br>
    <h4><strong>Top 30 - Produtividade Internação por Médico Responsável - 2017</strong></h4>
    {{#mes}}
        <p style="font-size: 12px;" >Valores referente a internações no ano atual pelo médico responsável pela internação.</p>
        <p style="font-size: 10px;" >Obs: os valores nas colunas depois do mês de {{ MES_ATU }} é referente ao mês de {{ MES_ATU }}.</p>
    {{/mes}}
        <table class="table table-striped" style="background-color: #4CAF50;">
        <thead>
            <tr style="background-color: #4CAF50; text-align:center;">
                <th>Medico</th>
                <th>Janeiro</th>
                <th>Fevereiro</th>
                <th>Março</th>
                <th>Abril</th>
                <th>Maio</th>
                <th>Junho</th>
                <th>Julho</th>
                <th>Agosto</th>
                <th>Setembro</th>
                <th>Outubro</th>
                <th>Novembro</th>
                <th>   %   </th>
                <th>SUS</th>
                <th>Não SUS</th>
                <th>Ontem</th>
                <th>Hoje</th>
                <th>Inter. Acima 24Hrs</th>
                <th>Inter. Acima 24Hrs C/Alta</th>
                <th>Inter. Acima 24Hrs S/Alta</th>
            </tr>
        </thead>
        <tbody>           
            {{#internacaoMedico}} 
                <tr style="background-color: {{COLOR}};">
                    <td>{{MEDICO}}</td>
                    <td>{{JANEIRO}}</td>
                    <td>{{FEVEREIRO}}</td>
                    <td>{{MARCO}}</td>
                    <td>{{ABRIL}}</td>
                    <td>{{MAIO}}</td>
                    <td>{{JUNHO}}</td>
                    <td>{{JULHO}}</td>
                    <td>{{AGOSTO}}</td>
                    <td>{{SETEMBRO}}</td>
                    <td>{{OUTUBRO}}</td>
                    <td>{{NOVEMBRO}}</td>
                    <td>{{PORCENT}}</td>
                    <td>{{SUS}}</td>
                    <td>{{NAO_SUS}}</td>
                    <td>{{ONTEM}}</td>
                    <td>{{HOJE}}</td>
                    <td>{{INTERNADO_ACIMA_24HRS}}</td> 
                    <td>{{INTERNADO_ACIMA_24HRS_C_ALTA}}</td> 
                    <td>{{INTERNADO_ACIMA_24HRS_S_ALTA}}</td> 
                </tr>           
            {{/internacaoMedico}}
        </tbody>
        </table>
    </br>
    <div class="jumbotron" style="padding: 10px;">
        <div class="email-footer">
            <p class="sub align-center">&copy; 2017 Projetos & Sistemas. All rights reserved.</p>
            <p class="sub align-center">
                [Michel Souza, Maycon Bona e Leandro Pacheco]
                <br>Ramal - 2338
                <br>HMMKB - Hospital Marieta
            </p>
        </div>
    </div>
</div>
</body>
</html>`);

module.exports = template