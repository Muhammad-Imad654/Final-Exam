// Home.jsx
import React, { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/Product/GenderCollection';
import NewArrival from '../components/Product/NewArrival';
import ProductDetails from '../components/Product/ProductDetails';
import ProductGrid from '../components/Product/ProductGrid';
import FeaturedCollection from '../components/Product/FeaturedCollection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from './../redux/slices/productSlice';
import axios from 'axios';

const Home = () => {
const dispatch=useDispatch()
const {products,loading,error}=useSelector((state)=>state.products)
const [bestSellerProduct,setbestSellerproduct]=useState(null)
useEffect(()=>{
    dispatch(fetchProductsByFilters({
        gender:"Women",
        category:"Bottom wear",
        limit:8,
    })
) 
const fetchBestSeller=async()=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
        setbestSellerproduct(response.data)
    } catch (error) {
        console.error(error);
        
    }
}
fetchBestSeller()
 },[dispatch]) 

    return (
        <div>
            <Hero />
            <GenderCollection />
            <NewArrival />

            {/* Best Seller */} 
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="mb-6 text-center">
                        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-indigo-600 uppercase bg-indigo-100 rounded-full">Featured</span>
                        <h2 className='text-3xl font-bold'>Our Best Seller</h2>
                        <div className="w-20 h-1 mx-auto mt-2 bg-indigo-600 rounded"></div>
                    </div>
                    {bestSellerProduct ? (
                        <ProductDetails productId={bestSellerProduct._id} />
                    ) : (
                        <div className="flex items-center justify-center h-40">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                            <span className="ml-2 text-indigo-600">Loading best seller product...</span>
                        </div>
                    )}
                </div>
            </div>

            <div className='container px-4 py-12 mx-auto'>
                <div className="mb-6 text-center">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-indigo-600 uppercase bg-indigo-100 rounded-full">Collection</span>
                    <h2 className='text-3xl font-bold'>
                        Top Wears for Women
                    </h2>
                    <div className="w-20 h-1 mx-auto mt-2 bg-indigo-600 rounded"></div>
                </div>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            <FeaturedCollection />
        </div>
    );
};

export default Home;