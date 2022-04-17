import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import classes from './SignIn.module.css';
import Logo from '../minicomponents/Logo';
import {useSelector,useDispatch}  from "react-redux"


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChagne = (e) => setEmail(e.target.value);
  const {user} = useSelector((state) =>  state.user )
  const dispatch = useDispatch()
  const handlePasswordChange = (e) => setPassword(e.target.value);
  let navigate= useNavigate()
  useEffect(() => { 
    if(user){
      navigate('/home')
    }
    
   },[user,dispatch])
  const signIn = (e) => {
    e.preventDefault();
  
    setEmail("")
    setPassword("")
  };

  return (
    <div className={classes.login}>
      <Logo imageSrc='http://pngimg.com/uploads/amazon/amazon_PNG1.png' />
      <div className={classes.loginContainer}>
        <h1 className={classes.formTitle}>Sign-In</h1>
        <form className={classes.formContainer}>
          <h5 className={classes.inputTitle}>E-mail</h5>
          <input
            className={classes.formInput}
            type='text'
            value={email}
            onChange={handleEmailChagne}
          />
          <h5 className={classes.inputTitle}>Password</h5>
          <input
            className={classes.formInput}
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className={classes.loginSignIn}
            type='submit'
            onClick={signIn}
          >
            Login
          </button>
        </form>
        <p className={classes.privacy}>
          By signing in, you agree to Amazon's Conditions of <br />
          Use and Privacy Notice
        </p>
        <p className={classes.privacy}>Need help?</p>
      </div>
      <div className={classes.toRegister}>
        <h5 className={classes.newtoamazon}>New to Amazon?</h5>
        <Link to='/register'>
          <button className={classes.loginRegister}>
            create your Amazon account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
