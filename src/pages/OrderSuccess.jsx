
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, Users, Calendar, Clock, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the selected quantity from local storage
    const storedQuantity = localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }

    // Get delivery details from local storage
    const storedDeliveryDetails = localStorage.getItem('deliveryDetails');
    if (storedDeliveryDetails) {
      setDeliveryDetails(JSON.parse(storedDeliveryDetails));
    }

    // Get exchange request ID from local storage
    const storedRequestId = localStorage.getItem('exchangeRequestId');
    if (storedRequestId) {
      setRequestId(storedRequestId);
    }

    // Simulate API call to fetch product details
    setTimeout(() => {
      const items = [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          category: 'Seeds',
          unit: 'kg',
          owner: 'John Smith',
          location: 'Springfield Valley',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 2,
          name: 'Natural Compost',
          category: 'Fertilizers',
          unit: 'kg',
          owner: 'Mary Johnson',
          location: 'Green Acres',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 3,
          name: 'Bio Pesticide',
          category: 'Pesticides',
          unit: 'L',
          owner: 'Robert Wilson',
          location: 'Harvest Hills',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 4,
          name: 'Heirloom Corn Seeds',
          category: 'Seeds',
          unit: 'kg',
          owner: 'Sarah Davis',
          location: 'Sunflower Fields',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 5,
          name: 'Organic Fish Emulsion',
          category: 'Fertilizers',
          unit: 'L',
          owner: 'James Miller',
          location: 'Riverside Farm',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 6,
          name: 'Neem Oil Spray',
          category: 'Pesticides',
          unit: 'L',
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

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleTrackRequest = () => {
    navigate(`/order-tracking/${id}`);
  };

  const handleContinueShopping = () => {
    navigate('/farmer-exchange');
  };

  if (loading || !deliveryDetails) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading success details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Product not found. <Button variant="link" onClick={() => navigate('/farmer-exchange')}>Return to market</Button></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-sm overflow-hidden mb-8">
            <div className="bg-agritech-green text-white py-6 px-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-agritech-green" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">Thank You!</h1>
              <p className="text-white/90">Your exchange request has been successfully submitted.</p>
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center mb-6">
                <p className="text-gray-600 mb-2">Exchange Request ID</p>
                <h2 className="text-2xl font-bold text-agritech-darkGreen">{requestId || '123456'}</h2>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{getCurrentDate()}</span>
                  <span className="mx-2">|</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{getCurrentTime()}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                {/* Product Details */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green mr-4">
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Product Details</h3>
                    <div className="flex items-start">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                        <p className="text-sm text-gray-600">Quantity: {quantity} {product.unit}</p>
                        <p className="text-sm text-gray-600">From: {product.owner}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Details */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green mr-4">
                    {deliveryDetails.deliveryMethod === 'home' ? (
                      <Truck className="h-6 w-6" />
                    ) : (
                      <Users className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Delivery Information</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Method: {deliveryDetails.deliveryMethod === 'home' 
                        ? 'Home Delivery' 
                        : 'In-Person Meet-Up'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">Name: {deliveryDetails.fullName}</p>
                    <p className="text-sm text-gray-600 mb-1">Phone: {deliveryDetails.phoneNumber}</p>
                    <p className="text-sm text-gray-600">
                      Address: {deliveryDetails.address}, {deliveryDetails.pinCode}
                      {deliveryDetails.landmark && `, Near ${deliveryDetails.landmark}`}
                    </p>
                  </div>
                </div>
                
                {/* Next Steps */}
                <Card className="bg-agritech-paleGreen border-agritech-green">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">What's Next?</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-agritech-green text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                        <span>Your request will be reviewed by {product.owner}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-agritech-green text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                        <span>Once approved, you will receive a confirmation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-agritech-green text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                        <span>{deliveryDetails.deliveryMethod === 'home' 
                          ? 'The item will be delivered to your address' 
                          : 'You will be notified to arrange a meet-up time and location'}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  className="bg-agritech-green hover:bg-agritech-darkGreen text-white flex-1"
                  onClick={handleTrackRequest}
                >
                  Track Request
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
