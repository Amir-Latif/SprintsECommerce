import React from 'react'
import classes from './AddToCart.module.css';
import LocationOnOutLinedIcon from '@material-ui/icons/LocationOnOutlined';


const address = 'ahmed-Al hawamdeyah';
const sellerName = 'nike';
const inStock = true;


function AddToCart({price}) {
  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.price}>
      
          <sup style={{ fontSize: '10px', color: 'grey' }}>EGP</sup>{' '}
          {price.split('.')[0]}
          <span style={{ fontSize: '10px',marginTop:"10px", color: 'grey' }}>
            {price.split('.')[1]}
          </span>
        </h3>
      </div>
      <div className={classes['address-container']}>
        <LocationOnOutLinedIcon />
        <p className={classes.address}>Deliver to {address}</p>
      </div>
      <div>{inStock && <p className={classes.stock}>In Stock</p>}</div>
      <div className={classes['quantity-container']}>
        <span>Qty:</span>
        <select name='quantity' id='quantity' className={classes.select}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </div>
      <div className={classes.btnGroup}>
        <button className={`${classes.btn} ${classes.light}`}>
          Add to Cart
        </button>
        <button className={`${classes.btn} ${classes.dark}`}>Buy Now</button>
      </div>
      <div className={classes.sellerContainer}>
        <p>Sold by </p>
        <p>{sellerName}</p>
      </div>
    </div>
  );
}

export default AddToCart