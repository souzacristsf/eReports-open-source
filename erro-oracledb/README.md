## OracleDB
Siga esses passos apenas se no comando ```docker-compose logs``` obteve algum erro com o nome **oracledb**, responsavel para a comunicação com o banco de dados Oracle.

Execute o seguinte comando:
```
docker exec -it send-reports /bin/bash
```
Entre na pasta `send-report` com o comando **cd /send-report**.

Já dentro do projeto, execute o comando ```npm uninstall oracledb --save```, e instale novamente com o comando ```npm i oracledb --save``.

## Help
Caso o projeto não funcione, abra uma issue [aqui](https://github.com/souzacristsf/send-reports-email/issues)