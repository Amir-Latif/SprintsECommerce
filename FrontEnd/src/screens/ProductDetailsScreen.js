import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/product/ProductDetails'
import Header from '../components/home/Header'
import CategoryNav from '../components/category/CategoryNav'

function ProductDetailsScreen({state}) {
  let {id} = useParams()
  return (
    <div>
        <Header/>
        <CategoryNav/>
        <ProductDetails state={state} id = {id}/>
    </div>
  )
}

export default ProductDetailsScreen