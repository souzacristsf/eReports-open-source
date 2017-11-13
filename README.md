# Send Email Reports 
![drawing](https://cdn.instructables.com/FL2/5KAS/I7MXEMQ0/FL25KASI7MXEMQ0.MEDIUM.jpg)
img[alt=drawing] { width: 50px; }

#### Resumo
O projeto tem como objetivo conectar em qualquer banco de dados para envio de relatórios por e-mail. Através de drive's de conexão no backend. Sendo assim, o usuário poderá nas primeiras versões escolher o drive de conexão e cadastrar um SQL e E-mail para envio do report, possibilitanto o agendamento do mesmo para que seja possivél rodar todos os dias, uma vez no dia, o mês todos e etc.

Requisito do Sistema (1° versão)
  - Disponibilizar um cadastro inicial para o usuario.
  - Utilizar Docker para criação do container e serviço de banco de dados, API e aplicação geral. 
  - Oferecer opções de conectividade Drive's para a conexão ao banco de dados do usuario
  - Serviço de banco de dados Mongodb "noSQL" para armazenar os dados do usuario e parametrização, assim como, SQL e dados de segurança do banco de conexão.
    
Requisito do Usuario (1° versão)
  - O usuario poderá fazer o cadastro inicial na aplicação, "Login e senha". 
  - Poderá escolher um drive de conexão e registrar o IP do banco, assim como senha e usuario.
  - O usuario depois de escolher o drive, terá a possibilidade de salvar o SQL e o e-mail de destino para envio do relatorio.
  - O usuario poderá agendar o dia, mês e hora para o envio do relatorio. Escolhendo o envio persistente em dias, mês ou ano, e qual o horario fixo para envio.
 
Requisitos Funcionais e Não Funcionais
  - O sistema deverá enviar o relatorio na data e hora agendada pelo usuario. 
  - O usuario poderá testar a conexão no ato da escolha do drive e com usuario e senha do banco de dados.
  - 
