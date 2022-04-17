import React from 'react';
import classes from './Products.module.scss';
import Product from './Product';


function Products(props) {
  const state = props.state;


  return (
    <div className={classes.home}>
      {state.map((productItem) => {
        return <Product key={productItem._id} product={productItem} />;
      })}
    </div>
  );
}

export default Products;
