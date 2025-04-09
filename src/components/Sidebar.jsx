
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Leaf, ShoppingBag, MessageSquare, UserCircle, FolderSync, ChevronRight, Plus, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Disease Detection', path: '/disease-detection', icon: Leaf },
    { name: 'Market & Sales', path: '/market', icon: ShoppingBag },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
    { name: 'Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-full bg-white shadow-md text-agritech-green"
        aria-label="Toggle Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out md:transition-none flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-agritech-darkGreen">AgriTech</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-agritech-paleGreen text-agritech-darkGreen font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-6 px-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Farmer Tools
            </div>
            <ul className="space-y-1 px-3">
              <li>
                <NavLink
                  to="/manage-products"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-agritech-paleGreen text-agritech-darkGreen font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <FolderSync className="h-5 w-5 mr-3" />
                  <span>Manage Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/order-tracking"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-agritech-paleGreen text-agritech-darkGreen font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <ChevronRight className="h-5 w-5 mr-3" />
                  <span>Track Orders</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green">
                <UserCircle className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Name</p>
                <p className="text-xs text-gray-500">Farmer</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
