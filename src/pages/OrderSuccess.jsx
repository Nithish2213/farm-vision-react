
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Truck, MapPin, Calendar, Clock, Package, Home, ChevronRight } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the selected quantity from local storage
    const storedQuantity = localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }

    // Get order ID from local storage
    const storedOrderId = localStorage.getItem('orderId');
    if (storedOrderId) {
      setOrderId(storedOrderId);
    } else {
      // Generate a random order ID if not present
      const newOrderId = Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      localStorage.setItem('orderId', newOrderId);
    }

    // Get delivery details from local storage
    const storedDetails = localStorage.getItem('deliveryDetails');
    if (storedDetails) {
      setDeliveryDetails(JSON.parse(storedDetails));
    }

    // Simulate API call to fetch product details
    setTimeout(() => {
      const items = [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          category: 'Seeds',
          availableQuantity: 12,
          unit: 'kg',
          price: 150,
          owner: 'John Smith',
          location: 'Springfield Valley',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 2,
          name: 'Natural Compost',
          category: 'Fertilizers',
          availableQuantity: 250,
          unit: 'kg',
          price: 75,
          owner: 'Mary Johnson',
          location: 'Green Acres',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 3,
          name: 'Bio Pesticide',
          category: 'Pesticides',
          availableQuantity: 50,
          unit: 'L',
          price: 200,
          owner: 'Robert Wilson',
          location: 'Harvest Hills',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 4,
          name: 'Heirloom Corn Seeds',
          category: 'Seeds',
          availableQuantity: 30,
          unit: 'kg',
          price: 120,
          owner: 'Sarah Davis',
          location: 'Sunflower Fields',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 5,
          name: 'Organic Fish Emulsion',
          category: 'Fertilizers',
          availableQuantity: 100,
          unit: 'L',
          price: 180,
          owner: 'James Miller',
          location: 'Riverside Farm',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 6,
          name: 'Neem Oil Spray',
          category: 'Pesticides',
          availableQuantity: 20,
          unit: 'L',
          price: 220,
          owner: 'Emma Brown',
          location: 'Mountain View',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        }
      ];
      
      const foundProduct = items.find(item => item.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleTrackOrder = () => {
    navigate(`/order-tracking/${orderId}`);
  };

  const handleContinueShopping = () => {
    navigate('/farmer-exchange');
  };

  // Calculate estimated delivery date (5 days from now)
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product || !deliveryDetails) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Missing information. <Button variant="link" onClick={() => navigate('/farmer-exchange')}>Return to market</Button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agritech-paleGreen mb-4">
                <Check className="h-8 w-8 text-agritech-green" />
              </div>
              <h1 className="text-2xl font-bold text-agritech-darkGreen mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
              <p className="font-medium mt-2">Order ID: #{orderId}</p>
            </div>
            
            {/* Order Details */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <h2 className="font-semibold text-gray-700 mb-4">Order Details</h2>
                
                <div className="flex items-start mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-agritech-darkGreen">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {quantity} {product.unit}</p>
                    <p className="text-sm text-gray-600">Price: ₹{product.price}/{product.unit}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs text-gray-500">{product.location}</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-2 mr-3">
                      <Home className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Delivery Address</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {deliveryDetails.fullName}, {deliveryDetails.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {deliveryDetails.address}
                        {deliveryDetails.landmark && `, Near ${deliveryDetails.landmark}`},
                        PIN: {deliveryDetails.pinCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-2 mr-3">
                      <Package className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Payment Method</h4>
                      <p className="text-sm text-gray-600 mt-1">Cash on Delivery</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-gray-100 p-2 mr-3">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Estimated Delivery</h4>
                      <p className="text-sm text-gray-600 mt-1">{getEstimatedDeliveryDate()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Order Status */}
            <Card className="mb-8 border-agritech-green">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 text-agritech-green mr-2" />
                  <h2 className="font-semibold text-agritech-darkGreen">Track Your Order</h2>
                </div>
                
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-agritech-green text-white flex items-center justify-center z-10">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 h-8 w-0.5 bg-gray-200 -z-10"></div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center z-10">
                      <Package className="h-4 w-4" />
                    </div>
                    <p className="ml-3 text-gray-500">Processing</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-agritech-green text-white"
                  onClick={handleTrackOrder}
                >
                  Track Order <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="text-agritech-green border-agritech-green"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
