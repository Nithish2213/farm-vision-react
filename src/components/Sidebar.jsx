
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Microscope, 
  ShoppingBasket, 
  Truck, 
  Phone, 
  Users, 
  BanknoteIcon, 
  LogOut,
  Circle
} from 'lucide-react';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div className="w-64 bg-agritech-darkGreen text-white min-h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-agritech-green font-bold">A</span>
          </div>
          <span className="ml-3 text-xl font-semibold">AgriTech</span>
        </div>
      </div>
      
      <div className="mt-2 px-4">
        <div className="flex items-center mb-6 bg-agritech-darkGreen/30 rounded-lg p-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white">{user ? getInitials(user.name) : ''}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-white/70">Welcome back,</p>
            <p className="text-sm font-medium text-white">{user ? user.name : 'Loading...'}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
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
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
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
              to="/market-home" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
                  isActive || location.pathname.includes('/market') || location.pathname.includes('/delivery') || location.pathname.includes('/billing') 
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
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
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
              to="/expert-consultation" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
                  isActive || location.pathname.includes('/expert-chat')
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
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
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
                `flex items-center px-4 py-2.5 rounded-md transition-colors ${
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
      
      <div className="p-4 mt-auto">
        <div 
          onClick={handleProfileClick}
          className="flex items-center p-2 cursor-pointer hover:bg-white/5 rounded-md mb-2"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white">{user ? getInitials(user.name) : ''}</span>
          </div>
          <div className="ml-3 text-sm">
            {user ? user.name : 'Loading...'}
          </div>
        </div>
        
        <div className="flex items-center text-xs text-white/70 pl-2 mb-2">
          <Circle className="h-2 w-2 mr-2 text-green-400 fill-green-400" />
          <span>System Status: Online</span>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
