import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Machines from './Machines.jsx';
import Autoreport from './Autoreport.jsx';
import UserSettings from './UserSettings.jsx';
import NotFound from './NotFound.jsx';

function App()
{
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          
          <Route exact path="/">
            <Login />
          </Route>
          
          <Route exact path="/home">
            <Navbar />
            <Home />
          </Route>
          
          <Route exact path="/machines">
            <Navbar />
            <Machines />
          </Route>

          <Route exact path="/autoreport">
            <Navbar />
            <Autoreport />
          </Route>

          <Route exact path="/usersettings">
            <Navbar />
            <UserSettings />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        
        </Switch>
      </div>
    </BrowserRouter>
  );
 }
        
export default App;