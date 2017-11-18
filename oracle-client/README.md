# Send Email Reports

### Criando uma imagem oracle client

Comando responsovél por criar nossa imagem principal com os binarios para comunicação entre o banco de dados oracle e API.
```
docker build -t oracle-client .
```
Esse comando você cria a imagem *oracle-client* para ser utilizada na criação do container no arquivo docker-compose.yml