
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Microscope, ShoppingBasket, Truck, Phone, Users, BanknoteIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-agritech-darkGreen text-white min-h-screen flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-agritech-green font-bold">A</span>
          </div>
          <span className="ml-3 text-xl font-semibold">AgriTech</span>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/disease-detection" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Microscope className="h-5 w-5 mr-3" />
              Disease Detection
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/market" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <ShoppingBasket className="h-5 w-5 mr-3" />
              Market & Sales
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/supply-chain" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Truck className="h-5 w-5 mr-3" />
              Supply Chain
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/expert-connect" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Phone className="h-5 w-5 mr-3" />
              Expert Connect
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Users className="h-5 w-5 mr-3" />
              Farmer Community
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/investments" 
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <BanknoteIcon className="h-5 w-5 mr-3" />
              Investments & Loans
            </NavLink>
          </li>
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-white/70">Farmer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
