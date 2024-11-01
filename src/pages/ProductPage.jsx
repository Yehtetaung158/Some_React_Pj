import React from 'react'
import  Container  from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductList from '../components/ProductList'

const ProductPage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPage={"Products"}/>
        <ProductList/>
      </Container>
    </section>
  )
}

export default ProductPage