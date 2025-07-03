import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters,setFilters } from './../../redux/slices/productSlice';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const handleSearch = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setFilters({ search: searchTerm }));
        dispatch(fetchProductsByFilters({ search: searchTerm })); 
        navigate(`/collection/all/?search=${searchTerm}`)
         setIsOpen(false);
    };

    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ?
            "absolute top-0 left-0 w-full bg-white h-24 z-50 shadow-md flex" : "w-auto"}`}>

            {isOpen ? (
                <form onSubmit={handleSubmit} className="relative flex items-center justify-center w-full">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-2 pr-10 text-gray-700 placeholder-gray-500 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <button type="submit" className="absolute text-gray-600 transition duration-200 transform -translate-y-1/2 right-3 top-1/2 hover:text-black">
                            <FaMagnifyingGlass className="w-5 h-5" />
                        </button>
                    </div>
                    <button type="button" onClick={handleSearch} className="absolute text-gray-600 transition duration-200 transform -translate-y-1/2 right-6 top-1/2 hover:text-black">
                        <IoClose className="w-5 h-5" />
                    </button>
                </form>
            ) : (
                <button
                    onClick={handleSearch}
                    className="transition duration-300 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
                >
                    <FaMagnifyingGlass className="w-5 h-5 text-gray-700" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
