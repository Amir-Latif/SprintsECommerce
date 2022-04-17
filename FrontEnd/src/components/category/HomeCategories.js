import React from 'react';
import Category from './Category';
import classes from './HomeCategories.module.css';

function HomeCategories(props) {
  const { categories } = props;
  return (
    <div className={classes.container}>
      {categories.map((category) => {
        return <Category category={category} key={category.id} />;
      })}
    </div>
  );
}

export default HomeCategories;
