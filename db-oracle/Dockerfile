# Dockerfile
FROM wnameless/oracle-xe-11g

LABEL maintainer="Michel Ferreira Souza <souza_crists@hotmail.com>"

# RUN apt-get update

ADD init.sql /docker-entrypoint-initdb.d/

# WORKDIR /home/oracle

# COPY init.sql .
# COPY start.sh .

# RUN sqlplus system/oracle < init.sql

# EXPOSE 49160

# RUN chmod +x start.sh
# CMD ["sh", "start.sh"]
# CMD ["sqlplus system/oracle < init.sql"]
# RUN
# ADD init.sql /docker-entrypoint-initdb.d/
# docker build -t database-oracle .
# docker run -d -p 49160:22 -p 49161:1521 -p 8080:8080 -e ORACLE_ENABLE_XDB=true database-oracle -c "sqlplus system/oracle /home/oracle/init.sql"
# docker run -d -p 49160:22 -p 49161:1521 database-oracle
# ssh root@localhost -p 49160
# ssh root@192.168.0.115 -p 49160
# password: admin
# sqlplus system/oracle
# docker run -it -d -p 49160:22 -p 49161:1521 -p 8080:8080 --name db-oracle -e ORACLE_ENABLE_XDB=true database-oracle /bin/sh start.sh
# docker logs db-oracle

# ssh root@128.1.9.146 -p 49160


# docker exec -it db-oracle /bin/bash


# sqlplus system/oracle@128.1.9.146:1521/XE
# sqlplus system/oracle@localhost:1521/XE