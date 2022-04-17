import React from 'react';

import Header from '../components/home/Header';
import CategoryNav from '../components/category/CategoryNav';

import HomeCategories from '../components/category/HomeCategories';
import { categories } from '../utils/Data';
import Banner1 from '../assets/banner/bannerImage1.jpg';
import Banner2 from '../assets/banner/bannerImage2.jpg';
import Banner3 from '../assets/banner/bannerImage3.jpg';
import Banner4 from '../assets/banner/bannerImage4.jpg';
import Banner5 from '../assets/banner/bannerImage5.jpg';
import Banner6 from '../assets/banner/bannerImage6.jpg';
import Slider from '../components/minicomponents/Slider';
import Products from '../components/product/Products';
const BannerImages = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6];
function Home(props) {

  const { state } = props;

  return (
    <div>
      <Header />
      <CategoryNav />
      <Slider images={BannerImages} />

      <Products state={state}/>
      <HomeCategories categories={categories} />
    </div>
  );
}

export default Home;
