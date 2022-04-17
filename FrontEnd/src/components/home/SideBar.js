import React, { useState } from 'react';

import classes from './SideBar.module.css';
import SubCategories from '../category/SubCategories';

function SideBar(props) {
  const { showSidebar, setShowSidebar } = props;

  const [showSub, setShowSub] = useState(false);


  
  return (
    <>
    <div className={classes.container}  onClick={() =>  setShowSidebar(false)}/>
      
      <div className={classes.sidebar}>
        <button
          onClick={() => setShowSidebar(false)}
          className={classes.exitIcon}
        >
          X
        </button>
        <div>
          <h1>Mobiles</h1>
          <span className={classes.toSubCat} onClick={() => setShowSub(true)} >
          to
          </span>
          {showSub && (
            <SubCategories showSub={showSub} setShowSub={setShowSub} />
          )}
        </div>
    </div>
    </>
  );
}

export default SideBar;
