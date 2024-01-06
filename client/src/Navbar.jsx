import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () =>
{
 const handleClick = () =>
  {
    fetch('/logout',
    {
      method: 'GET'
    });
  }

  return (
    <div>
      <ul className="navbar">
        <li><Link to="/home">Dashboard</Link></li>
        <li><Link to="/machines">Machines</Link></li>
        <li><Link to="/autoreport">Autoreport</Link></li>
        <li><Link to="/usersettings">User Settings</Link></li>
        <li><Link to="/" onClick={handleClick}>Logout</Link></li>
      </ul>
    </div>
  );
 }
        
export default Navbar;