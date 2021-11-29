import React, { useState ,useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';

import {useDispatch,useSelector} from "react-redux"
import {Login} from "../actions/userAction"

import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';
export default function Signin(props) {
  const dispatch=useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history=useHistory()
  const userData = useSelector( (state) =>state.userSignIn)
  const {userInfo,loading,error} = userData
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: sign in action
    
    dispatch(Login(email,password))

  }
  useEffect(() => {
   
    if (userInfo) {
      
     history.push("/");
    }
  }, [history.push,userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}