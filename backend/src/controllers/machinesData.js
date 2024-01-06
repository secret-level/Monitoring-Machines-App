const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const postMachinesData = (request, response) =>
{
  if (request.session.loggedin)
  {
    sendTableContentMachinesData(request.body.machineName, response);
  }
  else
  {
    console.log('/machinesData not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
};

function getTableContentMachinesData(machineName)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query(`SELECT * FROM ${machineName}`,
    (error, results, fields) =>
    {
      if (error) reject(error)
      else if (results.length)
      {
        results.forEach((object) => object.ime = machineName);
        resolve(results);
      }
      else
      {
        console.log(`getTableContentMachinesData() ${machineName} n/a`);
        resolve([{
          "ime": `${machineName}`,
          "id": "n/a",
          "deluje": "n/a",
          "alarm": "n/a",
          "unix_timestamp": "n/a",
          "readable_time": "n/a"
        }]);
      }
    });
  });
};

async function sendTableContentMachinesData(machineName, response)
{
  try
  {
    const sendContent = await getTableContentMachinesData(machineName);
    response.status(200).json(JSON.stringify(sendContent));
  }
  catch(error)
  {
    console.log(error);
    console.log('/machinesData catch()');
    response.status(500).end;
  }
}

module.exports = {
  postMachinesData
};