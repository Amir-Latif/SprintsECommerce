import React from 'react'
import classes from './Logo.module.css'
import {Link} from 'react-router-dom'

function Logo({imageSrc}) {



  return (
    <Link to='/home'>
      <div className={classes.headerLogoContainer}>
          
        <img
          src={imageSrc}
          alt='amazonlogo'
          className={classes.headerLogo}
        />
      </div>
    </Link>
  );
}

export default Logo