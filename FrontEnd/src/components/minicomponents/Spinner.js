import React from 'react';
import classes from './Spinner.module.css';
function Spinner() {
  console.log('spinner in running');
  return <div className={classes.spinner}></div>;
}

export default Spinner;
