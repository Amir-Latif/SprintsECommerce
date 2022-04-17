import React from 'react';
import classes from './Category.module.css';
import { Link } from 'react-router-dom';

const SubCategory = (props) => {
  const { title, imageSrc } = props;
  return (
    <div className={classes.subCateoryConainer}>
      <div className={classes.ImageWrap}>
        <img
          src={props.imageSrc}
          alt={title}
          className={classes.categoryImage}
        />
      </div>
      <span className={classes.SubCategoryTitle}>{title}</span>
    </div>
  );
};

function Category(props) {
  
  return (
    <div className={classes.container}>
      <div className={classes.categoryTitle}>
        <h2>{props.category.catTitle}</h2>
      </div>
      <div className={classes.subCategoriesContainer}>
        {props.category.subCategory.map((sub) => {
          return (
            <SubCategory
              title={sub.title}
              imageSrc={sub.image}
              key={sub.title}
            />
          );
        })}
      </div>
      <Link to='/home'>See more</Link>
    </div>
  );
}

export default Category;
