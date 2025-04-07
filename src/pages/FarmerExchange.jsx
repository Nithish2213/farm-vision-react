
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FarmerExchange = () => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
    {
      id: 1,
      name: 'Organic Tomato Seeds',
      category: 'Seeds',
      quantity: '2kg',
      owner: 'John Smith',
      location: 'Springfield Valley',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
    },
    {
      id: 2,
      name: 'Natural Compost',
      category: 'Fertilizers',
      quantity: '25kg',
      owner: 'Mary Johnson',
      location: 'Green Acres',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
    },
    {
      id: 3,
      name: 'Bio Pesticide',
      category: 'Pesticides',
      quantity: '5L',
      owner: 'Robert Wilson',
      location: 'Harvest Hills',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
    },
    {
      id: 4,
      name: 'Heirloom Corn Seeds',
      category: 'Seeds',
      quantity: '3kg',
      owner: 'Sarah Davis',
      location: 'Sunflower Fields',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
    },
    {
      id: 5,
      name: 'Organic Fish Emulsion',
      category: 'Fertilizers',
      quantity: '10L',
      owner: 'James Miller',
      location: 'Riverside Farm',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
    },
    {
      id: 6,
      name: 'Neem Oil Spray',
      category: 'Pesticides',
      quantity: '2L',
      owner: 'Emma Brown',
      location: 'Mountain View',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
    }
  ];

  const filteredItems = items.filter(item => {
    // Apply category filter
    if (activeTab !== 'All Items' && item.category !== activeTab) {
      return false;
    }

    // Apply search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.owner.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <h1 className="text-xl font-bold text-agritech-green mb-6">Trade Seeds, Fertilizers & Tools</h1>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by item name, farmer, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'All Items'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('All Items')}
            >
              All Items
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'Seeds'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Seeds')}
            >
              Seeds
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'Fertilizers'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Fertilizers')}
            >
              Fertilizers
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'Pesticides'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Pesticides')}
            >
              Pesticides
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link to={`/item-details/${item.id}`} key={item.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-agritech-darkGreen">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Quantity: {item.quantity}</p>
                  
                  <div className="flex items-center mb-1 text-sm">
                    <User className="h-4 w-4 mr-1 text-agritech-green" />
                    <span>{item.owner}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-agritech-green" />
                    <span>{item.location}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerExchange;
