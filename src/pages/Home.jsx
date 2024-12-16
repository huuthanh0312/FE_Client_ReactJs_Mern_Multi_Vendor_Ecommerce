import React, { useEffect } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Category from '../components/Category'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getProducts } from '../store/Reducers/homeReducer'

const Home = () => {
  const dispatch = useDispatch()
  const { categories, products, latestProducts, topRatedProducts, discountProducts } = useSelector(
    (state) => state.home
  )
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Category />
      <FeatureProducts products={products} />
      <div className="container flex flex-wrap mx-auto py-8">
        <div className="w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
          <div className="overflow-hidden">
            <Products title="Latest Product" products={latestProducts} />
          </div>
          <div className="overflow-hidden">
            <Products title="Top Rated Product" products={topRatedProducts} />
          </div>
          <div className="overflow-hidden">
            <Products title="Discount Product" products={discountProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
