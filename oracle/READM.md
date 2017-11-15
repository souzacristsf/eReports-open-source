

### Binario do Oracle
Baixar nesse site o binario do oracle.
http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html
Versão teste -> Oracle Database Express Edition 11g Release 2 for Linux x64

Repositorio para a criação da IMAGEM.
https://github.com/oracle/docker-images/tree/master/OracleDatabase


Teste
docker pull wnameless/oracle-xe-11g:14.04.4


-- CREATE USER relatorio IDENTIFIED BY 123456;
-- GRANT CONNECT TO relatorio;
-- GRANT CONNECT, RESOURCE, DBA TO relatorio;
-- GRANT CREATE SESSION GRANT ANY PRIVILEGE TO relatorio;
-- GRANT UNLIMITED TABLESPACE TO relatorio;
-- GRANT CREATE ANY TABLE TO relatorio; 

-- GRANT
--   SELECT,
--   INSERT,
--   UPDATE,
--   DELETE
-- ON
--   relatorio.*
-- TO
--   relatorio;