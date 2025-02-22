import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  enterUsernameActionCreator,
  enterPasswordActionCreator,
  enterEmailActionCreator,
  registerSubmitActionCreator,
} from '../actions/actions';
import styles from '../styles.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log('clicked');
    const user = {
      username: auth.username,
      email: auth.email,
      password: auth.password,
    };
    e.preventDefault();
    dispatch(registerSubmitActionCreator(user));
    navigate('/dashboard');
  };
  return (
    <div className='loginStyles'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signUpContainer">
        <label className="loginContainer" id="loginContainer">
          <input
          placeholder='username'
            onChange={(e) =>
              dispatch(enterUsernameActionCreator(e.target.value))
            }
            type="text"
            id="username"
          />
        </label>
        <label className="loginEmailContainer" id="loginEmailContainer">
          <input
          placeholder='email address'
            onChange={(e) => dispatch(enterEmailActionCreator(e.target.value))}
            type="email"
            id="email"
          />
        </label>
        <label className="passwordContainer" id="passwordContainer">
          <input
          placeholder='password'
            onChange={(e) =>
              dispatch(enterPasswordActionCreator(e.target.value))
            }
            type="password"
            id="password"
          />
        </label>
        <button id="signUpButton" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
