import React from 'react';

function Login() {
  return (
    <div className="box">
      <div className="box__container">
        <div className="box__form">
          <h2>Login form</h2>
          <form action="">
            <div className="inputBox">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBox">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
