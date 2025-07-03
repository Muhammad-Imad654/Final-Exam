import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewArrival from "./NewArrival";

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [priceRange,setPriceRange]=useState([0,100])

    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        });
        setPriceRange([0,params.maxPrice || 100])
    }, [searchParams]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        // console.log({ name, value, checked, type });

        let newFilters = { ...filters }
        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            }
            else {
                newFilters[name] = newFilters[name].filter((item) => item !== value)
            }
        }
        else {
            newFilters[name] = value
        }

        setFilters(newFilters)
        console.log(newFilters);
        
        updateURLParams(newFilters)
    }

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
    
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                newFilters[key].forEach((value) => {
                    params.append(key, value);  // Correctly append multiple values
                });
            } else if (newFilters[key]) {
                params.set(key, newFilters[key]); // Set single values
            }
        });
    
        setSearchParams(params);
    };
    const handlePriceChange =(e)=>{
        const newPrice=e.target.value;
        setPriceRange([0,newPrice])
        const newFilters={...filters,minPrice:0,maxPrice:newPrice};
        setFilters(filters)
        updateURLParams(newFilters)
    }


    // Filter options
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
    ];

    const genders = ["Men", "Women"];

    const categories = ["Top Wear", "Bottom Wear"];

    const colors = [
        { name: "Red", hex: "#FF0000" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Black", hex: "#000000" },
        { name: "Green", hex: "#008000" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Gray", hex: "#808080" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Beige", hex: "#F5F5DC" },
        { name: "Navy", hex: "#000080" },
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Polyester",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",
    ];

    return (
        <div className="p-4 border rounded-md shadow-sm">
            <h3 className="mb-4 text-xl font-medium text-gray-800">Filter</h3>

            {/* Category Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Category
                </label>
                {categories.map((category) => (
                    <div key={category} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))}
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Gender
                </label>
                {genders.map((gender) => (
                    <div key={gender} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="gender"
                            value={gender}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))}
            </div>

            {/* Color Filter with Color Preview */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Color
                </label>
                {colors.map((color) => (
                    <div key={color.name} className="flex items-center mb-1">
                        <input
                            type="radio"
                            name="color"
                            value={color.name}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span
                            className="inline-block w-5 h-5 mr-2 border border-gray-400 rounded-full"
                            style={{ backgroundColor: color.hex }}
                        ></span>
                        <span className="text-gray-700">{color.name}</span>
                    </div>
                ))}
            </div>

            {/* Size Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Size
                </label>
                {sizes.map((size) => (
                    <div key={size} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="size"
                            value={size}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{size}</span>
                    </div>
                ))}
            </div>

            {/* Material Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Material
                </label>
                {materials.map((material) => (
                    <div key={material} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="material"
                            value={material}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{material}</span>
                    </div>
                ))}
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-600">
                    Brand
                </label>
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            name="brand"
                            value={brand}
                            className="w-4 h-4 mr-2 text-blue-500 border-gray-300 focus:ring-blue-400"
                            onChange={handleFilterChange}
                        />
                        <span className="text-gray-700">{brand}</span>
                    </div>
                ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
                <label className="block mb-2 font-medium text-gray-600">
                    Price Range
                </label>
                <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"/>
                    <div className="flex justify-between mt-2 text-gray-600">
                        <span>$0</span>
                        <span>${priceRange[1]}</span>
                    </div>
             </div>
        </div>
    );
};

export default FilterSidebar;
