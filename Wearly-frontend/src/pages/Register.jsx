import React, { useEffect, useState } from "react";
import LoginImage from "../assets/register.webp"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlices";
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from "../redux/slices/cartSlices";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const { user, guestId, loading, error } = useSelector((state) => state.auth)
    const { cart } = useSelector((state) => state.cart)

    //Get Redirect parameter
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");
    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/")
                })

            }
            else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
            //If no cart products then redirect to checkout page or home page.
        }
    }, [user, cart, guestId, navigate, isCheckoutRedirect, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegisterError(""); // Clear any previous errors
        dispatch(registerUser({ name, email, password }))
            .unwrap()
            .then(() => {
                // Only navigate after successful registration
                console.log("Registration successful");
                navigate("/login");
            })
            .catch((errorData) => {
                console.error("Registration failed:", errorData);
                setRegisterError(errorData.message || "Registration failed. Please try again.");
            });
        console.log("Email:", email, "Name:", name, "Password:", password);
    };

    return (
        <div className="flex h-screen">
            {/* Left Side - Register Form */}
            <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/2 md:p-12">
                <form className="w-full max-w-md p-8 bg-white border rounded-lg shadow-sm" onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-6">
                        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text">Wearly</h2>
                    </div>
                    <h2 className="mb-6 text-2xl font-bold text-center">Join Our Community 👋</h2>
                    <p className="mb-6 text-center">Create your account to start shopping</p>
                    {registerError && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                            {registerError}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700">
                        {loading ? "Loading..." : "Register Now"}
                    </button>
                    <p className="mt-6 text-sm text-center">Have an Account?
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="ml-1 text-indigo-600 hover:text-indigo-800">
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
            {/* Right Side - Image */}
            <div className="hidden w-1/2 bg-gray-100 md:block">
                <div className="flex flex-col items-center justify-center h-full">
                    <img
                        src={LoginImage}
                        alt="Register to Account"
                        className="object-cover w-full min-h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
