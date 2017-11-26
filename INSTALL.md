## Instalação e teste do projeto

#### Observação 
1° - Altere o IP da sua maquina local ou a maquina que vai rodar o projeto [aqui](./eReports/app/config/urls.js), na variavel `connectString`. Obs: não apague a porta **49161**.

2° - Altere o email do usuario remetente e senha e o destino do email [aqui](./eReports/app/email/config/user.js ). Caso não tenha email. :blush: 
Deixei um email de teste para execução. 

Feito tudo isso, `next` com o processo de instalação e teste.

#### Execução do Projeto

Para a execução e teste desse projeto estou assumindo que você ja tenha conhecimento e um convívio de *AMOR* sobre a estrutura **Docker** :heart: .
Não conhece nada sobre Docker ? [clique aqui](https://docs.docker.com/get-started/), tente fazer o `Get Started` na pagina do docker depois continue a execução do projeto.

### Criando as imagens Docker 
Executar os comandos abaixo para o funcionamento do projeto.   
>Atenção: ```rodar o comando dentro de cada diretorio.```
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

Neste momento criamos os serviços da API e Banco de dados em container e estão rodando em **background**
Com o comando ```docker ps``` para vericifar os container's. Para verificar os *logs* do build e requisição nos testes da API já adianto esse comando ```docker-compose logs```.

`output` 

| CONTAINER ID   | IMAGE            | COMMAND                 | CREATED        | STATUS         | PORTS                                                   | NAMES         |
| :------------: | :--------------: | :---------------------: | :------------: | :------------: | :-----------------------------------------------------  | :-----------: |
| ea46f279a07c   | oracle-client    | "bash -c 'cd /proj..."  | 3 minutes ago  | Up 3 minutes   | 0.0.0.0:9000->9000/tcp                                  | eReports  |
| 6d68d597a493   | database-oracle  | "/bin/sh -c '/usr/..."  | 3 minutes ago  | Up 3 minutes   | 22/tcp, 0.0.0.0:1522->1521/tcp, 0.0.0.0:8081->8080/tcp  | db-oracle     |

#### Observações
>Caso no comando ```docker-compose logs``` no final obteve a seguinte mensagem **E-mail para seuEmailDeDestino enviado!** o e-mail foi enviado com sucesso. <br>
Se obteve algum erro envolvendo `oracledb`. :pensive: :pensive: :pensive:   
Siga esses passos. [Clique aqui](./erro-oracledb/README.md)

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
docker exec -it eReports /bin/bash
```

Para parar o serviço, execute: 
```
docker-compose stop
```

Para retornar o serviço, execute:
```
docker-compose start
```

# Congratulations :clap: :clap: :clap: 
Se você chegou até aqui, os serviços estão rodando com sucesso. :heart_eyes:


## Help
Problemas ou perguntas podem ser aberto issue [aqui](https://github.com/souzacristsf/eReports-open-source/issues)