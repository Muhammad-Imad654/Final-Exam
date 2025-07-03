import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {logoutUser} from "../../redux/slices/authSlices"
import {clearCart} from "../../redux/slices/cartSlices"

const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/");
        dispatch(clearCart())
    };

    return (
        <div className="min-h-screen p-6 text-white bg-indigo-900 w-50">
            <div className="mb-8 text-center">
                <Link to="/admin" className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text">
                    Wearly Admin
                </Link>
            </div>

            <h2 className="px-4 py-2 mb-6 text-xl font-medium text-center border-b border-indigo-700">
                Dashboard
            </h2>

            <nav className="flex flex-col space-y-2">
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-indigo-700 text-white py-3 px-4 rounded-lg flex items-center space-x-2"
                            : "text-indigo-200 hover:bg-indigo-800 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                    }
                >
                    <FaUser />
                    <span>Users</span>
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-indigo-700 text-white py-3 px-4 rounded-lg flex items-center space-x-2"
                            : "text-indigo-200 hover:bg-indigo-800 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                    }
                >
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-indigo-700 text-white py-3 px-4 rounded-lg flex items-center space-x-2"
                            : "text-indigo-200 hover:bg-indigo-800 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                    }
                >
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-indigo-700 text-white py-3 px-4 rounded-lg flex items-center space-x-2"
                            : "text-indigo-200 hover:bg-indigo-800 hover:text-white py-3 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                    }
                >
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
            </nav>

            <div className="mt-auto pt-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};


export default AdminSidebar;