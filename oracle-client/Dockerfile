FROM node:8

LABEL maintainer="Michel Ferreira Souza <souza_crists@hotmail.com>"

COPY files/client/ /tmp
COPY files/oracle-instantclient.conf /etc/ld.so.conf.d/

RUN apt-get update && \
    apt-get install -y zip libaio1 && \
    cd /tmp && \
    cat instantclient-basic-linux.x64-11.2.0.4.0.zip > basic.zip && \
    unzip basic.zip && \
    unzip instantclient-sdk-linux.x64-11.2.0.4.0.zip && \
    mv instantclient_11_2 instantclient && \
    mkdir /opt/oracle && \
    mv instantclient /opt/oracle && \
    cd /opt/oracle/instantclient && \
    ln -s libclntsh.so.11.1 libclntsh.so && \
    export LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH && \
    ldconfig && \
    rm -rf /tmp/*
   
