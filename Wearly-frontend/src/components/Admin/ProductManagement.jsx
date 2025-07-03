import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlices";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 mx-auto max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold">Product Management</h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">SKU</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{product.name}</td>
                                    <td className="px-4 py-3">${product.price}</td>
                                    <td className="px-4 py-3">{product.sku}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/admin/products/${product._id}/edit`}
                                                className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
