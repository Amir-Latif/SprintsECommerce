import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from '../components/product/ProductDetails'

function ProductDetailsScreen({state}) {
  let {id} = useParams()
  return (
    <div>
        <ProductDetails state={state} id = {id}/>
    </div>
  )
}

export default ProductDetailsScreen