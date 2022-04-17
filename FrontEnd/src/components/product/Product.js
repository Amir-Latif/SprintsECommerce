import React from 'react';
import Rating from '../minicomponents/Rating';
import classes from './Product.module.scss';
import shirt from '../../assets/p1.jpg'
import { Link } from 'react-router-dom';


function Product(props) {
    
  const {price, reviews, rating,title,description,_id}  = props.product;
 
  return (
    <div  className={classes.productContainer}>
      <img src={shirt} alt={title} className={classes.productImage} />
      <Link to={`/product/${_id}`}>
      <h3 className={classes.productTitle}>{title}</h3>
      </Link>
      <span className={classes.productDescription}>{description}</span>
      <Rating rating={rating} reviewsNum={reviews.length} />
      <span className={classes.productPrice}>{price}</span>
    </div>
  );
}

export default Product;
