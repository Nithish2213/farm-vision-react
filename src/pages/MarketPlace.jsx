
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, MapPin, User, Plus, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MarketPlace = () => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in a real app, this would come from an API
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Tomato Seeds',
      category: 'Seeds',
      quantity: 12,
      unit: 'kg',
      price: 150,
      owner: 'John Smith',
      location: 'Springfield Valley',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
    },
    {
      id: 2,
      name: 'Natural Compost',
      category: 'Fertilizers',
      quantity: 250,
      unit: 'kg',
      price: 75,
      owner: 'Mary Johnson',
      location: 'Green Acres',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
    },
    {
      id: 3,
      name: 'Bio Pesticide',
      category: 'Pesticides',
      quantity: 50,
      unit: 'L',
      price: 200,
      owner: 'Robert Wilson',
      location: 'Harvest Hills',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
    },
    {
      id: 4,
      name: 'Heirloom Corn Seeds',
      category: 'Seeds',
      quantity: 30,
      unit: 'kg',
      price: 120,
      owner: 'Sarah Davis',
      location: 'Sunflower Fields',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
    },
    {
      id: 5,
      name: 'Organic Fish Emulsion',
      category: 'Fertilizers',
      quantity: 100,
      unit: 'L',
      price: 180,
      owner: 'James Miller',
      location: 'Riverside Farm',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
    },
    {
      id: 6,
      name: 'Neem Oil Spray',
      category: 'Pesticides',
      quantity: 20,
      unit: 'L',
      price: 220,
      owner: 'Emma Brown',
      location: 'Mountain View',
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
    }
  ]);

  const filteredProducts = products.filter(product => {
    if (activeTab !== 'All Items' && product.category !== activeTab) {
      return false;
    }

    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.owner.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyNow = (productId) => {
    navigate(`/delivery-details/${productId}`);
  };

  const handleManageProducts = () => {
    navigate('/manage-products');
  };

  const handleTrackOrders = () => {
    navigate('/order-tracking/1');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-xl font-bold text-agritech-green">Green Products Marketplace</h1>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                className="bg-agritech-green text-white"
                onClick={() => navigate('/manage-products')}
              >
                <Plus className="h-4 w-4 mr-2" /> Sell a Product
              </Button>
              <Button 
                variant="outline" 
                className="text-agritech-green border-agritech-green"
                onClick={handleTrackOrders}
              >
                <ChevronRight className="h-4 w-4 mr-2" /> Track Orders
              </Button>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name, seller, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'All Items'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('All Items')}
            >
              All Items
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'Seeds'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Seeds')}
            >
              Seeds
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'Fertilizers'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Fertilizers')}
            >
              Fertilizers
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'Pesticides'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Pesticides')}
            >
              Pesticides
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'Tools'
                  ? 'bg-agritech-green text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('Tools')}
            >
              Tools
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleProductDetails(product.id)}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 
                    className="text-lg font-semibold text-agritech-darkGreen cursor-pointer"
                    onClick={() => handleProductDetails(product.id)}
                  >
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                <p className="text-sm text-gray-500 mb-2">Available: {product.quantity} {product.unit}</p>
                <p className="text-lg font-semibold text-agritech-green mb-2">₹{product.price}/{product.unit}</p>
                
                <div className="flex items-center mb-3 text-sm">
                  <User className="h-4 w-4 mr-1 text-agritech-green" />
                  <span>{product.owner}</span>
                </div>
                
                <div className="flex items-center text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 text-agritech-green" />
                  <span>{product.location}</span>
                </div>
                
                <Button 
                  className="w-full bg-agritech-green text-white hover:bg-agritech-darkGreen"
                  onClick={() => handleBuyNow(product.id)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
