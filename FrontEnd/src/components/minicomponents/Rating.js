import React from 'react';
import classes from './Rating.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


function Rating(props) {
  const { rating, reviewsNum } = props;
  
  return (
    <div className={classes.container}>
      {rating >= 1 ? (
        <StarIcon className={classes.ratingIcon} />
      ) : rating >= 0.5 ? (
        <StarHalfIcon className={classes.ratingIcon} />
      ) : (
        <StarOutlineIcon className={classes.ratingIcon} />
      )}
      {rating >= 2 ? (
        <StarIcon className={classes.ratingIcon} />
      ) : rating >= 1.5 ? (
        <StarHalfIcon className={classes.ratingIcon} />
      ) : (
        <StarOutlineIcon className={classes.ratingIcon} />
      )}
      {rating >= 3 ? (
        <StarIcon className={classes.ratingIcon} />
      ) : rating >= 2.5 ? (
        <StarHalfIcon className={classes.ratingIcon} />
      ) : (
        <StarOutlineIcon className={classes.ratingIcon} />
      )}
      {rating >= 4 ? (
        <StarIcon className={classes.ratingIcon} />
      ) : rating >= 3.5 ? (
        <StarHalfIcon className={classes.ratingIcon} />
      ) : (
        <StarOutlineIcon className={classes.ratingIcon} />
      )}
      {rating >= 5 ? (
        <StarIcon className={classes.ratingIcon} />
      ) : rating >= 4.5 ? (
        <StarHalfIcon className={classes.ratingIcon} />
      ) : (
        <StarOutlineIcon className={classes.ratingIcon} />
      )}
      <span className={classes.reviewCount}>{reviewsNum}</span>
    </div>
  );
}

export default Rating;
