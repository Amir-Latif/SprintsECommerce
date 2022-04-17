import React from 'react';
import classes from './Header.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { Link } from 'react-router-dom';
import Logo from '../minicomponents/Logo';
import LocationAddress from '../minicomponents/LocationAddress';
import {useSelector} from 'react-redux'

function Header(props) {
  
  
  const {user} = useSelector(state=>state.user)
  return (
    <nav className={classes.header}>
      {/* header logo */}
      <Logo imageSrc='http://pngimg.com/uploads/amazon/amazon_PNG11.png' />
      <LocationAddress />

      <div className={classes.headerSearch}>
        <select className={classes.selectOption}>
          <option>All</option>
        </select>
        <input type='text' className={classes.headerSearchInput} />
        <SearchIcon className={classes.searchIcon} />
      </div>

      {/* header navigation and cart count */}
      <div className={classes.headerNav}>
        {/* the user  */}
        <Link to='/signin'>
          <div className={classes.headerOption}>
            <span className={classes.up}>Hello,{user?user.email:"Guest"} </span>
            <span className={classes.down}>{user?"Sign Out":"Sign In"}</span>
          </div>
        </Link>
        {/* the orders and returns */}
        <div className={classes.headerOption}>
          <span className={classes.up}>Returns </span>
          <span className={classes.down}>
            <b>Orders</b>
          </span>
        </div>
        {/* your prime */}
        <Link to='/signin' className={classes.headerOption}>
          <span className={classes.up}>Your </span>
          <span className={classes.down}>prime</span>
        </Link>
        {/* the cart basket  */}
        <Link to='/cart' className={classes.basket}>
          <ShoppingBasketIcon className={classes.basketIcon} />
          <span className={classes.basketCount}>0</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
