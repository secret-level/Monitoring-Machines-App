const mysqlConfig =
{
  connectionLimit : 10,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
 };

const sessionConfig =
{
  secret: process.env.SESSIONSECRET,
  resave: true,//?
  saveUninitialized: true//?
};

module.exports =
{
  mysqlConfig,
  sessionConfig
};