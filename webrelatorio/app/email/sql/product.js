var sql = 
            `select 
                CASE WHEN MOD(ROWNUM,2) = 0 THEN '#e6e6e6' 
                            ELSE 'white'
                            END COLOR,
                TO_CHAR(c.PRODUCT_ID) PRODUCT_ID,
                c.NAME,
                TO_CHAR(c.VALUE, 'L99G999G999D09', 'NLS_CURRENCY = ''R$''') VALUE
                from sys.product c
            UNION ALL
            select 
                '#CDB79E' COLOR,
                'Total' TOTAL,
                NULL,
                TO_CHAR(SUM(c.VALUE), 'L99G999G999D09', 'NLS_CURRENCY = ''R$''') VALUE
            from sys.product c`;

module.exports = sql;                