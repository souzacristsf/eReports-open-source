const hbs = require("handlebars");

hbs.registerHelper("ifValue", function(value, options) {
  if (value != "COLOR" || value == "") {
    return options.fn(this);
  }
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
    background-color: #994d33;
    color: white;
}

</style>
</head>
<body>

<div class="jumbotron">
    <h3 class="text-center">Indicador de Produto em Estoque</h1>
    <h4 class="titulo" >Segue relatorio indicador de Gestão.</h3>
    <p style="font-size: 10px;" ><strong>Envio realizado automaticamente pelo nosso sistema.</strong></p>
</div>
<div class="container">
    <h4><strong>Produtos Cadastrados no Sistema</strong></h4>
    <p style="font-size: 12px;" >Produto Casdatro por valor.</p>
        <table class="table table-striped" style="background-color: #994d33;">
        <thead>
        <tr style="background-color: #994d33; text-align:center;">
            {{#each columns}}
                {{#ifValue name}}
                    <th>{{name}}</th>
                {{/ifValue}}
            {{/each}}
        </tr>
        </thead>
        <tbody>           
            {{#each data}} 
                <tr style="background-color: {{COLOR}}">
                    {{#each this}}
                        {{#ifValue @key}}
                            <td>{{this}}</td>
                        {{/ifValue}}
                    {{/each}}
                </tr>           
            {{/each}}
        </tbody>
        </table>
    </br>
    </br>
    <div class="jumbotron" style="padding: 10px;">
        <div class="email-footer">
            <p class="sub align-center">&copy; 2017 Project & Software. All rights reserved.</p>
            <p class="sub align-center">
                [Send Reports Email]
                <br>Project Open Source
            </p>
        </div>
    </div>
</div>
</body>
</html>`);

module.exports = template;
