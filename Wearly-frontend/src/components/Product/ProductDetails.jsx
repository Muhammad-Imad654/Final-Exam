import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlices';




const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products
    )
    const { user, guestId } = useSelector((state) => state.auth)
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const productFetchId = productId || id;
    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId)),
                dispatch(fetchSimilarProducts({ id: productFetchId }))
        }
    }, [dispatch, productFetchId])


    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    useEffect(() => {
        setIsButtonDisabled(!selectedSize || !selectedColor);
    }, [selectedSize, selectedColor]);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", {
                duration: 1000,
            });
            return;
        }

        setIsButtonDisabled(true);

        setTimeout(() => {
            toast.success("Product addded to cart", {
                duration: 1000,
            }, 500)
        })
        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id,
            })
        )
            .then(() => {
                toast.success('Product added to the cart', { duration: 1000 });
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };


    return (
        <div className="p-6">
            {selectedProduct && (
                <div className="max-w-6xl p-8 mx-auto bg-white rounded-lg">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side - Thumbnail List */}
                        <div className="flex-col hidden mr-6 space-y-4 md:flex">
                            {selectedProduct?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.altText || `Thumbnail ${index}`}
                                    className={`object-cover w-20 h-20 rounded-lg cursor-pointer ${mainImage === image.url ? 'border-2 border-black' : 'border-gray-300'}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="md:w-1/2">
                            <div className="mb-4">
                                <img
                                    src={mainImage}
                                    alt="Main Product"
                                    className="object-cover w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Mobile Thumbnail Gallery */}
                        <div className="flex mb-4 space-x-4 overflow-x-scroll md:hidden">
                            {selectedProduct?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.alttext || `Thumbnail ${index}`}
                                    className={`object-cover w-20 h-20 rounded-lg cursor-pointer ${mainImage === image.url ? 'border-2 border-black' : 'border-gray-600'}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Right Side - Product Info */}
                        <div className="md:w-1/2 md:ml-10">
                            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">{selectedProduct.name}</h1>

                            {selectedProduct.originalPrice && (
                                <p className="mb-1 text-lg text-gray-600 line-through">
                                    ${selectedProduct.originalPrice}
                                </p>
                            )}
                            <p className="mb-2 text-xl text-gray-500">${selectedProduct.price}</p>

                            <p className="mb-4 text-gray-600">{selectedProduct.description}</p>

                            {/* Color Options */}
                            <div className="mb-4">
                                <p className="text-gray-700">Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct?.colors?.map((color) => (
                                        <button
                                            key={color}
                                            className={`w-8 h-8 border rounded-full ${selectedColor === color ? 'ring-2 ring-black' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setSelectedColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Options */}
                            <div className="mb-4">
                                <p className="text-gray-700">Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct?.sizes?.map((size) => (
                                        <button
                                            key={size}
                                            className={`px-4 py-2 border rounded-3xl ${selectedSize === size ? 'bg-black text-white' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <p className="text-gray-700">Quantity:</p>
                                <div className="flex items-center mt-2 space-x-4">
                                    <button
                                        className="px-2 py-1 text-lg bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange("minus")}
                                    >
                                        −
                                    </button>
                                    <span className="text-lg">{quantity}</span>
                                    <button
                                        className="px-2 py-1 text-lg bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange("plus")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className={`w-full px-6 py-2 mb-4 text-white rounded ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
                            >
                                Add to Cart
                            </button>

                            {/* Product Characteristics */}
                            <div className="mt-10 text-gray-600">
                                <h3 className="mb-4 text-xl font-bold">Characteristics:</h3>
                                <table className="w-full text-sm text-left text-gray-600">
                                    <tbody>
                                        <tr>
                                            <td className="py-1">Brand:</td>
                                            <td className="py-1">{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1">Material:</td>
                                            <td className="py-1">{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Similar Products */}
                    <div className="mt-20">
                        <h2 className="mb-4 text-2xl font-medium text-center">You May Also Like</h2>
                        <ProductGrid products={similarProducts} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails; 
