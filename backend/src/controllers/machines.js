const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const getMachines = (request, response) =>
{
  if (request.session.loggedin)
  {
    let machineNames = [];
    sendTableNamesMachines(machineNames, response);
  }
  else
  {
    console.log('/machines not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
};

async function sendTableNamesMachines(machineNames, response)
{
  try
  {
    await getTableNamesMachines(machineNames);
    response.status(200).json(JSON.stringify(machineNames));
  }
  catch(error)
  {
    console.log(error);
    console.log('/machines catch()');
    response.status(500).end();
  }
}

function getTableNamesMachines(machineNames)
{
  return new Promise((resolve, reject) =>
  {                                                                       //WHERE table_name LIKE 'wc___'",
    mysqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_name REGEXP '^wc[0-9]+'",
    (error, results, fields) =>
    {
      if (error) reject(error);
      else if (results.length)
      {
        results.forEach((tableName) => machineNames.push(tableName.TABLE_NAME));
        resolve(machineNames.sort());
      }
      else reject(console.log('No table with such a name.'))
    });
  });
}

module.exports = {
  getMachines
};