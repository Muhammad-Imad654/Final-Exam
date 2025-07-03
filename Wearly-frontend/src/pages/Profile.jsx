import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlices";
import { clearCart } from "../redux/slices/cartSlices";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);  
  const navigate=useNavigate()
  const dispatch=useDispatch() //useDispatch is not used but it is required to avoid error
  useEffect(()=>{
    if(!user){
        navigate("/login")
    } 
  },[user,navigate])

const handleLogout=()=>{
  dispatch(logoutUser())
  dispatch(clearCart())
  navigate("/login")
}
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex-grow p-4 mx-auto md:p-6">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full p-6 rounded-lg shadow-md md:w-1/4">
            <h1 className="mb-4 text-2xl font-bold md:text-3xl">{user?.name}</h1>
            <p className="mb-4 text-lg text-gray-600">{user?.email}</p>
            <button onClick={handleLogout} className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
          {/* Right Section: Orders table */}
          <div className="w-full md:w-2/3">
          <MyOrdersPage/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;