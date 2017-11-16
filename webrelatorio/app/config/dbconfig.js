module.exports = {
  user          : process.env.DB_USER || "system",

  // Instead of hard coding the password, consider prompting for it,
  // passing it in an environment variable via process.env, or using
  // External Authentication.
  password      : process.env.DB_PASSWORD || "oracle",

  // For information on connection strings see:
  // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
  connectString : process.env.DB_URL_CONNECTION || "128.1.9.146:49160/XEXDB",

  stmtCacheSize : 40, 

  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#extauth
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

