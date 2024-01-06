//a placeholder file that doesn't do anything meaningful yet
const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const getUserSettings = (request, response) =>
{
  if (request.session.loggedin) getUserData(response);
  else
  {
    console.log('/usersettings not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
};

function getUsername()
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT * FROM accounts WHERE username = ?",
    ['vid'], (error, results, fields) =>
    {
      if (error) reject(error)
      else if (results.length) resolve(results)
      else reject(console.log('Couldnt find the user.'))
    });
  });
}

async function getUserData(response)
{
  try
  {
    let userData = await getUsername();
    response.status(200).json(JSON.stringify(userData));
  }
  catch(error)
  {
    console.log(error);
    console.log('/usersettings catch()');
    response.status(500).end();
  }
}

  module.exports = {
  getUserSettings
};