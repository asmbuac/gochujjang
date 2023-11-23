import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <img src="/src/assets/logo.png" alt="" />
      <div className="wrapper">
        <h1>Login</h1>
        <form>
          <input type="text" required placeholder="Username or Email" />
          <input type="password" required placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
