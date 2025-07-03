import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/slices/productSlice';
import { updateProduct } from '../../redux/slices/adminProductSlices';
import { toast } from 'sonner';
import axios from 'axios';

const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading } = useSelector((state) => state.products);
    const { error } = useSelector((state) => state.adminProducts);

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: '',
        material: '',
        gender: '',
        images: []
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData);
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.url, altText: file.name }]
            }));
        } catch (error) {
            console.error('Image upload failed:', error);
            const imageUrl = URL.createObjectURL(file);
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: imageUrl, altText: file.name }]
            }));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData }))
        toast.success('Product updated successfully');
        navigate('/admin/products');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl">Loading product data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl p-6 mx-auto">
                <p className="text-xl text-red-500">Error: {error}</p>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="mb-6 text-3xl font-bold">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {[
                    { label: 'Product Name', name: 'name', type: 'text' },
                    { label: 'Price', name: 'price', type: 'number' },
                    { label: 'Count in Stock', name: 'countInStock', type: 'number' },
                    { label: 'SKU', name: 'sku', type: 'text' },
                    { label: 'Category', name: 'category', type: 'text' },
                    { label: 'Brand', name: 'brand', type: 'text' },
                    { label: 'Collections', name: 'collections', type: 'text' },
                    { label: 'Material', name: 'material', type: 'text' }
                ].map(({ label, name, type }) => (
                    <div className="mb-6" key={name}>
                        <label className="block mb-2 font-semibold">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={productData[name]}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-500 rounded-md"
                        />
                    </div>
                ))}

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full p-2 border border-gray-500 rounded-md"
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Gender</label>
                    <select
                        name="gender"
                        value={productData.gender}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-500 rounded-md"
                    >
                        <option value="">Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={productData.sizes?.join(", ") || ""}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                sizes: e.target.value.split(",").map(size => size.trim())
                            })
                        }
                        required
                        className="w-full p-2 border border-gray-500 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Colors (comma-separated)</label>
                    <input
                        type="text"
                        name="colors"
                        value={productData.colors?.join(", ") || ""}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                colors: e.target.value.split(",").map(color => color.trim())
                            })
                        }
                        required
                        className="w-full p-2 border border-gray-500 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Upload Image</label>
                    <input type="file" onChange={handleImageUpload} disabled={uploading} />
                    {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {productData.images?.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.url}
                                    alt={image.altText || "Product Image"}
                                    className="object-cover w-20 h-20 rounded-md shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProductData({
                                            ...productData,
                                            images: productData.images.filter((_, i) => i !== index)
                                        })
                                    }
                                    className="absolute top-0 right-0 w-6 h-6 text-white bg-red-500 rounded-full"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="w-full py-2 text-white transition-colors bg-gray-500 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;
