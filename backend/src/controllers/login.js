const mysql = require('mysql');
const crypto = require('crypto');
const { mysqlConfig } = require('./config.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const postLogin = (request, response) =>
{
  const username = request.body.username;
  const password = request.body.password;

  if (username && password) compareHash(username, password, request, response)
  else console.log('Enter username/password.')
};//else doesn't seem to ever be the case since html already does it with 'required'

function getSaltFromDatabase(username)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT * FROM accounts WHERE username = ?",
    [username], (error, results, fields) =>
    {
      if (error) reject(error)
      else if (results.length)
      {
        if (results[0].salt.length) resolve(results[0].salt)
        else reject(console.log(`${username} is missing their salt.`))
      }
      else reject(console.log('No such user.'))
    });
  });
}

function createHash(password, salt)
{
  return new Promise((resolve, reject) =>
  {
    crypto.scrypt(password, salt, 64, (error, derivedKey) =>
    {
      if (error) reject(error)
      else resolve(derivedKey.toString('hex'))
    });
  });
}

async function compareHash(username, password, request, response)
{
  try
  {
    const saltDatabase = await getSaltFromDatabase(username);
    const generatedHash = await createHash(password, saltDatabase);

    mysqlConnection.query("SELECT * FROM accounts WHERE username = ? AND hash = ?",
    [username, generatedHash], (error, results, fields) =>
    {
      if (error) console.log(error)
      else if (results.length)
      {
        //https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
        let ipStackOverflow = (request.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
          request.socket.remoteAddress
        console.log('Login: ' + ipStackOverflow);

        request.session.loggedin = true;
        response.status(200).redirect('/home');
      }
      else
      {
        console.log('/login probably wrong password.');
        response.status(401).redirect('/');
      }
    });
  }
  catch (error)
  {
    console.log(error);
    console.log('/login was rejected.');
    response.status(401).redirect('/');
  }
}

module.exports = {
  postLogin
};