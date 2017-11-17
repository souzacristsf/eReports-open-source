var sql = `select 
            CASE WHEN MOD(ROWNUM,2) = 0 THEN '#D3D3D3' 
                        ELSE 'white'
                        END COLOR,
            c.PRODUCT_ID,
            c.NAME,
            c.VALUE
            from sys.product c`;

module.exports = sql;                