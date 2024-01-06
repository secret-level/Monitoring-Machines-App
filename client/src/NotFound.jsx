import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () =>
{
  return (
    <div className="notFound">
      <h2>Sorry</h2>
      <p>This page cannot be found</p>
      <Link to="/home">Back to the homepage...</Link>
    </div>
  );
}

export default NotFound;