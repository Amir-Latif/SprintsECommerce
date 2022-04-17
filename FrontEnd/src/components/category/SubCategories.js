import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './SubCategories.module.css';

function SubCategories(props) {
  const { showSub, setShowSub } = props;

  

  return (
    <>
      <div className={classes.container} onClick={() => setShowSub(false)} />

      <div className={classes.sidebar}>
        <button onClick={() => setShowSub(false)}>Main meneu</button>
        <Link to='/home'>All Mobile Phones</Link>
      </div>
    </>
  );
}

export default SubCategories;
