## Criação do banco de dados e Imagem

#### Como criar sua imagem do banco de dados para o Teste
Repositorio oficial da imagem FROM
https://github.com/wnameless/docker-oracle-xe-11g

#### Execute o seguinte comando para a criação da imagem
```
docker build -t database-oracle .
```
Esse comando você cria a imagem *database-oracle* para ser utilizada na criação do container no arquivo docker-compose.yml