import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom"; // Important if you're using nested routing

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex flex-col min-h-screen md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="z-20 flex items-center p-4 text-white bg-gray-900 md:hidden">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Sidebar and overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* renders nested routes if using react-router */}
      </div>
    </div>
  );
};

export default AdminLayout;
