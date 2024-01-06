import './Home.css';

const Home = () =>
{
  return (
    <div className="home">
      
      <div className="intro">
        <h3>Greetings!</h3>
        <p>This is a simple express/react app that is part of a factory machine monitoring process.
          It's made of a couple of different elements which fetch the data from the database and display it in table format.</p>

        <h4>The login system</h4>
        <p>The apps checks the database for the submitted username, fetches the salt, calculates the hash based on the salt and
          the submitted password and ultimately authorizes the login.</p>

        <h4>Machines: Fetches the data for a single machine</h4>
        <p>The app checks the database for existing machines and displays a button for each one.
           Clicking on a button fetches and displays the data for that machine.</p>

        <h4>Autoreport: Fetches all the data from the past 24h</h4>
        <p>The app checkes the database for existing machines,
           then runs a query that limits the results from 6 am yesterday to 6 am today and displays the results of the query.</p>

        <h4>User Settings</h4>
        <p>A work in progress. At the moment it does nothing except fetch and display the username and the email.</p>
        
        <h4>Logout: logs out the user</h4>
        <p>It redirects the user to the login page and destroys the session.</p>
      </div>

      <h3>To do</h3>
      <ul className="todo">
        <li>Should maybe rewrite the login logic in react instead of directly accessing html dom elements?
            Although the way it's now it doesn't seem that bad.</li>
        <li>In autoreport, the machine name should be in big letters between different machine reports.
            Figure out how to deal with 'if' state logic</li>
        <li>Machines tab should have graphs (graph.js?)</li>
        <li>Figure out how to implement the email autoreport (cronjob in react?)</li>
        <li>Learn css and make it pretty on a wider range of devices</li>
        <li>Rendering full queries in /machines is starting to take a long time.
            It should be split up into pages (maybe 1000 per page).</li>
      </ul>

      <h3>To fix</h3>
      <ul className="tofix">
        <li>Logged-in permission logic should work in react.
            Make it show something like the 404 page with a link to login if not logged in.</li>
        <li>Properly cancel fetch on switching pages.
            Although it's not clear if the currect implementation on heroku still has the issue (it should have it)</li>
        <li>Navbar routing in app.jsx is sketchy</li>
        <li>ccs positioning seems sketchy. Some of the reports move the navbar slightly.</li>
        <li>The time zone in the localhost app seems to be +0 instead of +2.
            The entries are correct, but the displayed time seems wrong and show -2 of what it should be.
            It seems alright on heroku though</li>
      </ul>

      <h3>To think about</h3>
      <ul className="tothink">
        <li>What should be in user settings?</li>
        <li>React hook function vs. class, what and why?</li>
      </ul>

      <h3>Changelog</h3>
      <ul className="changelog">
        <h4>19.4.2023</h4>
        <li>cronAutoreport.js:
        Added automatic emailing that reads the /dist/foo.html file and sends it as an attachment.</li>
        <h4>17.4.2023</h4>
        <li>cronAutoreport.js:
        Added an ejs function that fetches the autoreport data from the database and then renders the file to /dist/foo.html.</li>
        <h4>13.4.2023</h4>
        <li>machines.js and autoreport.js: Sorted machines by name.</li>
        <li>Split the backend code into routes and controllers:
          Added the routes folder and put the remaning index.js code into the corresponding files in the controllers folder.</li>
        <li>Added basic cronjob functionality with controllers/cronAutoreport.js.</li>
        <h4>9.4.2023</h4>
        <li>Migrated from Heroku to Fly.io.</li>
        <li>Minor fixes to get the app working with Databoom db:</li>
        <ul>
          <li>autoreport.js: table_name is now TABLE_NAME.</li>
          <li>Autoreport.jsx/Machines.jsx: Fixed readable_time and unix_timestamp.</li>
        </ul>
        <h4>26.7.2022</h4>
        <li>Redeployed with Databoom db.</li>
        <h4>17.5.2022</h4>
        <li>Changed the database to AWS RDB MySQL.</li>
        <h4>11.11.2021</h4>
        <li>Machines.jsx: Fixed handleClick() not being used warning.</li>
        <h4>7.11.2021</h4>
        <li>UserSettings.jsx: Added (and commented out) the componentDidMount() class method as a hook.
            The judgement on class vs. hook is still out there.</li>
        <h4>25.10.2021</h4>
        <li>login.js: Added a basic IP logger.</li>
        <h4>22.9.2021</h4>
        <li>Made various code parts easier to read.</li>
        <h4>20.9.2021</h4>
        <li>Added a short description of the app in the Dashboard section</li>
        <h4>19.9.2021</h4>
        <li>Machines.jsx: Added onClick() fetching<br />
            machinesData.js: Added corresponding server logic<br />
            index.js: Added a corresponding /machinesData POST request</li>
        <li>Streamlined the names of various functions and variables, added response.status(200/401/500)
            and removed some unneeded server-side console.log() checks</li>
        <h4>18.9.2021</h4>
        <li>Machines.jsx: Added simple css styling to fetched names buttons</li>
        <li>Machines.jsx: Added an onClick() function that returns the names of the machine-buttons clicked</li>
        <li>Fixed login/logout timeout crashing (lacked res.x())</li>
        <li>machines.js/Machines.jsx: Removed an unnecessary array layer in the query</li>
        <li>Removed static.json (apparently isn't needed)</li>
        <li>index.js/machines.js/autoreport.js: Commented out functions that don't need to be exported</li>
      </ul>

    </div>
  );
 }
        
export default Home;