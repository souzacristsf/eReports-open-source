var sql = `SELECT
            tasy.OBTER_NOME_PACIENTE(ap.NR_ATENDIMENTO) PACIENTE,
            TO_DATE(TO_CHAR(ap.DT_ENTRADA, 'dd/mm/yyyy')) DT_ENTRADA,
            TO_DATE(TO_CHAR(ap.DT_ALTA, 'dd/mm/yyyy')) DT_ALTA,
            EXTRACT(MONTH FROM ap.dt_entrada) MES,
            EXTRACT(YEAR FROM ap.dt_entrada) ANO,
            tasy.OBTER_NOME_MEDICO(ap.CD_MEDICO_RESP, 'nc') MEDICO_RESP_ATEND,
            tasy.OBTER_PRIMEIRO_SETOR_ATEND(ap.NR_ATENDIMENTO, 'D') PRIM_SETOR_ATEND,
            ap.NR_ATENDIMENTO NR_ATENDIMENTO,
            ap.CD_ESTABELECIMENTO,
            ap.IE_TIPO_ATENDIMENTO IE_TIPO_ATENDIMENTO,
            tasy.OBTER_VALOR_DOMINIO(12, ap.IE_TIPO_ATENDIMENTO) TIPO_ATENDIMENTO,
            TRIM(INITCAP(TO_CHAR(ap.DT_ENTRADA, 'Month', 'NLS_DATE_LANGUAGE=PORTUGUESE'))) MES_ENTRADA,
            11 SEQUENCE,
            1 QTD
            FROM tasy.ATENDIMENTO_PACIENTE ap
            WHERE ap.DT_ENTRADA >= TO_DATE('01/01/2017','dd/mm/yyyy')
            AND ap.DT_ENTRADA < TO_DATE('01/01/2018','dd/mm/yyyy')
            --AND ap.IE_TIPO_ATENDIMENTO = :TIPO
            AND ap.DT_CANCELAMENTO IS NULL`;

module.exports = sql;                