# Send Reports Email
<!-- ![alt text](./img/logo.jpg){: .img-small}  -->

<img src="./img/logo.jpg" alt="Mortality Bubble Chart" height="200">

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

### Tecnologias para o projeto
  * Docker
  * Docker-compose
  * Redis
  * Mongodb
  * Nodejs
  * Express
  * Oracle
  * PostgreSQL
  * MySQL
  * MSSQL


## Execução do Projeto
>
Para a execução e teste desse projeto estou assumindo que você ja tenha um convívio de *AMOR* e conhecimento sobre a estrutura **Docker**.
Não conhece nada sobre Docker ? [clique aqui](https://docs.docker.com/get-started/), tente fazer o `Get Started` na pagina do docker depois continue a execução do projeto.

### Criando as imagens Docker 
Executar os comandos abaixo para o funcionamento do projeto.   
obs: ```rodar o comando dentro do diretorio.```
  - [Criação da Imagem Oracle do Banco de dados](./db-oracle/README.md)
  - [Criação da Imagem Client Oracle do Banco de dados](./oracle-client/README.md)

Para visulizar as imagens criadas execute o comando: 
```
docker images
```

`output` 

| REPOSITORY               | TAG         |  IMAGE ID     | CREATED             | SIZE     |
| :----------------------  | :---------: | :-----------: | :-----------------: | :------: |
| database-oracle          | latest      | b0bf2efb4951  | About an hour ago   | 2.23GB   |
| oracle-client            | latest      | 89182a9eac87  | 3 weeks ago         | 936MB    |
| wnameless/oracle-xe-11g  | latest      | f794779ccdb9  | 5 weeks ago         | 2.23GB   |

### Criando os Container
Executar os comando abaixo para a criação dos serviços API e container's do projeto.

Execute o comando abaixo:
```
docker-compose up -d
```
Neste momento criamos os serviços da API e Banco de dados em container. 
Com o comando ```docker ps```` para vericifar os container's.

`output` 

| CONTAINER ID   | IMAGE            | COMMAND                 | CREATED        | STATUS         | PORTS                                                   | NAMES         |
| :------------: | :--------------: | :---------------------: | :------------: | :------------: | :-----------------------------------------------------  | :-----------: |
| ea46f279a07c   | oracle-client    | "bash -c 'cd /proj..."  | 3 minutes ago  | Up 3 minutes   | 0.0.0.0:9000->9000/tcp                                  | send-reports  |
| 6d68d597a493   | database-oracle  | "/bin/sh -c '/usr/..."  | 3 minutes ago  | Up 3 minutes   | 22/tcp, 0.0.0.0:1522->1521/tcp, 0.0.0.0:8081->8080/tcp  | db-oracle     |


### Container
Comandos para interação com os container em execução.

Depois de ter executado todos os passos acima, para entrar no serviço de banco de dados do container **db-oracle**, segue o comando.
```
docker exec -it db-oracle /bin/bash
```
>
Ainda dentro do serviço de banco de dados do container db-oracle. com o comando ```lsnrctl status``` você pode checar o status `Listener` do seu database server.

Para entrar no serviço da API, segue o comando.
```
docker exec -it send-reports /bin/bash
```
