import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import classes from './CategoryNav.module.css';
import SideBar from '../home/SideBar';
const mainCategroies = [
  'fashion',
  'mobile Phones',
  'electronics',
  'perfumes',
  'mobile',
  'applience',
  'Home',
];
function CategoryNav() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={classes.container}>
      <div>
        <span className={classes.categoryWrapper}>
          <button
            to='/'
            className={classes.sidebarBtn}
            onClick={() => setShowSidebar(true)}
          >
            All
            
          </button>

        </span>
       { showSidebar && <SideBar showSidebar = {showSidebar} setShowSidebar = {setShowSidebar}/>}
      </div>
      <div className={classes.categoriesContainer}>
        {mainCategroies.map((category) => {
          return (
            <span className={classes.categoryWrapper} key={category}>
              <Link to='/home' className={classes.categoryItem}>
                {category}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryNav;
