import './Login.css';

const Login = () =>
{
  return (
    <div className="login">
      <h1>Log in</h1>
      <form action="login"
            method="POST">
        <input type="text"
               name="username"
               placeholder="Username"
               required/>
        <input type="password"
               name="password"
               placeholder="Password"
               required/>
        <input className="submitButton"
               type="submit"/>
      </form>
    </div>
  );
 }
        
export default Login;