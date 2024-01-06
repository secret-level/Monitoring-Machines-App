const mysql = require('mysql');
const { mysqlConfig } = require('./config.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const getAutoreport = (request, response) =>
{
  if (request.session.loggedin)
  {
    sendTableNamesContentAutoreport(response);
  }
  else
  {
    console.log('/autoreport not logged in.');
    response.status(401).redirect('/');//needs to be fixed in react
  }
};

function getTableNamesAutoreport(dataAutoreport)
{
  return new Promise((resolve, reject) =>
  {
    mysqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_name REGEXP '^wc[0-9]+'",
    (error, results, fields) =>
    {
      if (error) reject(error)
      else if (results.length)
      {
        (results.forEach((tableName) => dataAutoreport.push([tableName.TABLE_NAME])));//EXTRA ARRAY?
        resolve(dataAutoreport.sort());
      }
      else reject(console.log('No table with such a name.'))
    });
  });
}

function getTableContentAutoreport(dataAutoreport, index)
{
  return new Promise((resolve, reject) =>
  {
    //let today = new Date().toISOString().slice(0, 10) + " 06:00:00";//ORIGINAL
    let today = new Date();//temp
    today.setDate(today.getDate() - 437);//temp
    today = today.toISOString().slice(0, 10) + " 06:00:00";//temp

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 467);
    yesterday = yesterday.toISOString().slice(0, 10) + " 06:00:00";

    mysqlConnection.query(`SELECT * FROM ${dataAutoreport[index]} WHERE readable_time BETWEEN '${yesterday}' AND '${today}'`,
    /*mysqlConnection.query("SELECT * FROM ? WHERE readable_time BETWEEN ? AND ?",
    [dataAutoreport[index], yesterday, today],*///why doesnt this work? DATETIME NEEDS QUOTATION MARKS LIKE A STRING
    (error, results, fields) =>
    {
      if (error) reject(error)
      else if (results.length) resolve(dataAutoreport[index].push(results))
      else
      {
        console.log(`getTableContentAutoreport(): ${dataAutoreport[index]} n/a`);
        resolve(dataAutoreport[index].push([]));
      }
    });
  });
};

async function sendTableNamesContentAutoreport(response)
{
  try
  {
    let dataAutoreport = [];

    await getTableNamesAutoreport(dataAutoreport);
    for (let index = 0; index < dataAutoreport.length; index++)
    {
      await getTableContentAutoreport(dataAutoreport, index);
    }
    response.status(200).json(JSON.stringify(dataAutoreport));
  }
  catch(error)
  {
    console.log(error);
    console.log('catch sendTableNamesContentAutoreport()');
    response.status(500).end();
  }
}

module.exports = {
  getAutoreport,
  getTableNamesAutoreport,
  getTableContentAutoreport
};