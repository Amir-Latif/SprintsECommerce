import React, { useEffect ,useState} from 'react';
import classes from './Slider.module.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ArrowBackIos } from '@mui/icons-material';

function Slider({ images }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = images.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, images]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 10000);
    return () => { 
        clearInterval(slider)
     }
  },[index]);

  return (
    <div className={classes.section}>
      <div className={classes.SectionCenter}>
        {images.map((image, indexImage) => {
          let position = classes.nextSlide;
          if (indexImage === index) {
            position = classes.activeSlide;
          }
          if (
            indexImage === index - 1 ||
            (index === 0 && indexImage === images.length - 1)
          ) {
            position = classes.lastSlide;
          }
          return (
            <article className={position} key={indexImage}>
              <img
                src={image}
                alt='banner-imag'
                className={classes.bannerImage}
              />
            </article>
          );
        })}
        <p className={classes.prev} onClick={() => { setIndex(index-1) }}>
            <ArrowBackIos/>
        </p>
        <p className={classes.next} onClick={() => { setIndex(index+1) }}>
            <ArrowForwardIosIcon/>
        </p>
      </div>
    </div>
  );
}

export default Slider;
