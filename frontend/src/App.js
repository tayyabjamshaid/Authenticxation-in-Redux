import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";
import SignInScreen from "./screens/Signin";
import RegisterScreen from "./screens/registerScreen";
import Data from "./screens/Data";
import { Logout } from "./actions/userAction";
import { BrowserRouter, Link, Route, useHistory } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userSignIn);
  const { userInfo } = userData;

  const signoutHandler = () => {
    dispatch(Logout());
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              amazona
            </Link>

            {userInfo ? (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link>{userInfo.email}</Link>
                </li>
                <li>
                  <Link to="/data">Data</Link>
                </li>
                <li>
                  <Link onClick={() => signoutHandler()}>SignOut</Link>
                </li>
              </ul>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </nav>

        <main>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/data" component={Data} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />

          <div></div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
