import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../utils/Data';

import classes from './ProductDetails.module.css';
import Rating from '../minicomponents/Rating';


import AddToCart from '../minicomponents/AddToCart';

function ProductDetails(state) {
  let { id } = useParams();

  console.log(state);
  const productInfo = data.find((product) => product._id === id);
  console.log(productInfo);

  return (
    <div className={classes['single-product-container']}>
     
      <div className={classes.layout} >
        <div className={classes['single-product']}>
          <div className={classes['image-container']}>
          <img
            src={productInfo.images[0]}
            alt='image'
            className={classes['single-product-image']}
          />
          </div>
          <div className={classes['single-product-info']}>
            <div className={classes['single-product-title']}>
              {productInfo.title}
            </div>

            <Rating
              rating={productInfo.rating}
              reviewsNum={productInfo.reviews.length}
            />
            <p className={classes['single-product-price']}>
              Price:<strong>LE</strong>
              <strong>{productInfo.price}</strong>
            </p>
            <div className={classes['single-product-description']}>
              <h4>Product Desription</h4>
              <p>{productInfo.description}</p>
            </div>
        </div>
           
              <AddToCart price = {productInfo.price} />
             
          </div>
      </div>
    </div>
  );
}



export default ProductDetails;
