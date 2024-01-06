const mysql = require('mysql');
const cron = require('node-cron');
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { mkdir, writeFile } = require('fs').promises;
const { mysqlConfig } = require('./config.js');
const { getTableNamesAutoreport,
        getTableContentAutoreport } = require('./autoreport.js');

const mysqlConnection = mysql.createPool(mysqlConfig);

const cronAutoreport = cron.schedule('0 6 * * *', () =>
{
  console.log(new Date().toISOString());
  // create /dist/autoreport.html and send it per email
  sendTableNamesContentAutoreport();
});

// RUN IT ALL AT THE START TO TEST
//sendTableNamesContentAutoreport();

async function main() {

  let transporter = nodemailer.createTransport(
  {
    host: process.env.NODEMAILERHOST,
    port: process.env.NODEMAILERPORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILERUSER,
      pass: process.env.NODEMAILERPASS
    }
  });

  const autoreportPath = path.join(__dirname, '..', '..', '..', 'dist', 'autoreport.html');

  let message = await transporter.sendMail(
  {
    from: process.env.NODEMAILERFROM,
    to: process.env.NODEMAILERTO,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>heya</b>',
    attachments: [{ path: autoreportPath }]
  });

  console.log('Message sent: %s', message.messageId);
}

// COULD MAYBE PARTIALLY IMPORT
async function sendTableNamesContentAutoreport(response)
{
  try
  {
    let dataAutoreport = [];

    await getTableNamesAutoreport(dataAutoreport);
    for(let index = 0; index < dataAutoreport.length; index++)
    {
      await getTableContentAutoreport(dataAutoreport, index);
    }

    await mkdir("dist", { recursive: true });

    // https://stackoverflow.com/questions/35151187/datetime-formatting-customization-in-ejs
    // ejs and react use the date object differently (string, format, etc)
    const renderHtml = await ejs
      .renderFile("views/autoreport.ejs", { dataAutoreport })
      .catch(error => console.log(error));

    await writeFile("dist/autoreport.html", renderHtml, "utf8");

    main().catch(console.error);
  }
  catch(error)
  {
    console.log(error);
    console.log('catch sendTableNamesContentAutoreport()');
  }
}

module.exports = {
  cronAutoreport
};
