import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../minicomponents/Logo';
import { useSelector, useDispatch } from 'react-redux';
import { registerInitiate } from '../../redux/userSlice';
import classes from './CreateAccount.module.css';
function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const navigate = useNavigate();
  let dispatch = useDispatch();
  console.log('user= >', user);
// tell him if the user or the the navigation changed take me to the home page
  useEffect(() => {
    if (user) {
      navigate('/signin');
    }
  }, [user,navigate]);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepasswordChange = (e) => setrePassword(e.target.value);

  //if the user do register well withe no errors Navigate to the home page
  const register = (e) => {
    e.preventDefault();
    
  
  };
  console.log(rePassword);

  return (
    <div className={classes.register}>
      <Logo imageSrc='http://pngimg.com/uploads/amazon/amazon_PNG1.png' />
      <div className={classes.formContainer}>
        <h1 className={classes.formTitle}>Create account</h1>
        <form action='' className={classes.form}>
          <h5 className={classes.inputTitle}>Your name</h5>
          <input
            className={classes.formInput}
            type='text'
            value={name}
            onChange={handleNameChange}
          />
          <h5 className={classes.inputTitle}>Mobile number or email</h5>
          <input
            className={classes.formInput}
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
          <h5 className={classes.inputTitle}>Password</h5>
          <input
            className={classes.formInput}
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='At least 6 characters'
          />

          <h5 className={classes.inputTitle}>Re-enter password</h5>
          <input
            className={classes.formInput}
            type='password'
            value={rePassword}
            onChange={handleRepasswordChange}
          />
          <button
            type='submit'
            onClick={register}
            className={classes.registerBtn}
          >
            continue
          </button>
        </form>
        <div className={classes.privacy}>
          By creating an account, you agree to Amazon's Conditions of Use and
          Privacy Notice.
        </div>
        <span className={classes.toSignin}>
          Already have an account? <Link to='/signin'> Sign in</Link>
        </span>
      </div>
    </div>
  );
}

export default CreateAccount;
