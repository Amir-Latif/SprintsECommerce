import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../utils/Data';
import srcImage from '../../assets/p1.jpg';
import classes from './ProductDetails.module.css';
import Rating from '../minicomponents/Rating';

import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';

function ProductDetails(state) {
  let { id } = useParams();

  console.log(state);
  const productInfo = data.find((product) => product._id === id);
  console.log(productInfo);

  return (
    <div className={classes['single-product-container']}>
     
      <div class>
        <div className={classes['single-product']}>
          <img
            src={productInfo.images[0]}
            alt='image'
            className={classes['single-product-image']}
          />
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
