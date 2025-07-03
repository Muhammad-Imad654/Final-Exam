import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSideBar from '../components/Product/FilterSideBar'
import SortOptions from '../components/Product/SortOptions'
import ProductGrid from '../components/Product/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from './../redux/slices/productSlice';

const CollectionPage = () => {
    const { collection } = useParams()
    const [ searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { products, error, loading } = useSelector((state) => state.products)
    const queryParams = Object.fromEntries([...searchParams])
    const SideBarRef = useRef(null)
    const [isSidebaropen, setIsSidebaropen] = useState(false)

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }))
    }, [dispatch, collection, searchParams])

    const togglesideBar = () => {
        setIsSidebaropen(!isSidebaropen)
    }

    const handleClickoutside = (e) => {
        if (SideBarRef.current && !SideBarRef.current.contains(e.target)) {
            setIsSidebaropen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickoutside)
        return () => {
            document.removeEventListener("mousedown", handleClickoutside)
        }
    }, [])


    return (
        <div className='flex flex-col lg:flex-row'>
            <button
                className="flex items-center justify-center p-2 border lg:hidden"
                onClick={togglesideBar}
            >
                <FaFilter className='mr-2' /> Filters
            </button>

            {/* Sidebar */}
            <div
                ref={SideBarRef}
                className={`lg:block ${isSidebaropen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSideBar />
            </div>

            {/* Product Section */}
            <div className="flex-grow p-4">
                <h2 className="mb-4 text-2xl uppercase">All collection</h2>
                <SortOptions />
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage
