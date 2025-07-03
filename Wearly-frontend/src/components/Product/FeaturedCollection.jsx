import React from 'react'
import { Link } from 'react-router-dom'
import featured from "../../assets/featured.webp"

const FeaturedCollection = () => {
    return (
        <section className='px-4 py-16 lg:px-0'>
            <div className="container mx-auto overflow-hidden rounded-3xl shadow-lg">
                <div className="flex flex-col-reverse items-center lg:flex-row">
                    <div className="p-8 text-center lg:p-16 lg:w-1/2 lg:text-left bg-gradient-to-br from-indigo-50 to-purple-50">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-indigo-600 uppercase bg-indigo-100 rounded-full">Featured Collection</span>
                        <h2 className="mb-2 text-lg font-semibold text-indigo-600">Comfort Meets Style</h2>
                        <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">Designed for Your Everyday Journey</h2>
                        <p className="mb-8 text-gray-600 text-large">
                            Discover Wearly's premium collection of comfortable clothing that effortlessly blends fashion with functionality. Our pieces are thoughtfully designed to elevate your everyday style.
                        </p>
                        <Link to="/collection/all" className='inline-block px-8 py-3 text-lg font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700'>
                            Explore Collection
                        </Link>               
                    </div>
                    <div className="lg:w-1/2 overflow-hidden">
                        <img 
                            src={featured} 
                            alt="Wearly Featured Collection" 
                            className='w-full h-full object-cover transition-transform duration-700 hover:scale-105' 
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCollection
