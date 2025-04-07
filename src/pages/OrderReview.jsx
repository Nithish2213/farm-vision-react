
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, Truck, Users, MapPin, User, Edit } from 'lucide-react';

const OrderReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
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

    // Simulate API call to fetch product details
    setTimeout(() => {
      const items = [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          category: 'Seeds',
          availableQuantity: 12,
          unit: 'kg',
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

  const handleConfirmExchange = () => {
    // Generate a random exchange request ID
    const requestId = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('exchangeRequestId', requestId);
    
    // Navigate to success page
    navigate(`/order-success/${id}`);
  };

  if (loading || !deliveryDetails) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading review details...</p>
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
          <StepIndicator currentStep={3} />
          
          <Button 
            variant="ghost" 
            className="mb-6 text-agritech-green" 
            onClick={() => navigate(`/delivery-details/${id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Delivery Details
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-xl font-bold text-agritech-darkGreen mb-4">Order Review</h1>
            <p className="text-gray-600 mb-6">Please review your exchange details before confirming.</p>
            
            {/* Product Summary */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green mr-4">
                    <Package className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-lg">Product Details</h2>
                        <p className="text-gray-600 mb-2">Review your selected item</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-agritech-green p-0 h-8"
                        onClick={() => navigate(`/product/${id}`)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-start">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                        <p className="text-sm text-gray-600">Quantity: {quantity} {product.unit}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <User className="h-4 w-4 mr-1 text-agritech-green" />
                          <span>{product.owner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Delivery Details */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green mr-4">
                    {deliveryDetails.deliveryMethod === 'home' ? (
                      <Truck className="h-8 w-8" />
                    ) : (
                      <Users className="h-8 w-8" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-lg">Delivery Information</h2>
                        <p className="text-gray-600 mb-2">
                          {deliveryDetails.deliveryMethod === 'home' 
                            ? 'Home Delivery' 
                            : 'In-Person Meet-Up'}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-agritech-green p-0 h-8"
                        onClick={() => navigate(`/delivery-details/${id}`)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{deliveryDetails.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{deliveryDetails.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{deliveryDetails.address}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {deliveryDetails.landmark && (
                          <div>
                            <p className="text-sm text-gray-500">Landmark</p>
                            <p className="font-medium">{deliveryDetails.landmark}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">PIN Code</p>
                          <p className="font-medium">{deliveryDetails.pinCode}</p>
                        </div>
                      </div>
                      
                      {deliveryDetails.specialInstructions && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500">Special Instructions</p>
                          <p className="font-medium">{deliveryDetails.specialInstructions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Final Agreement */}
            <Card className="bg-agritech-paleGreen border-agritech-green mb-6">
              <CardContent className="p-4">
                <p className="text-center text-gray-700">
                  By confirming this exchange request, you agree to the AgriTech terms and conditions for farmer exchanges.
                </p>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/delivery-details/${id}`)}
              >
                Back
              </Button>
              <Button 
                className="bg-agritech-green hover:bg-agritech-darkGreen text-white px-8"
                onClick={handleConfirmExchange}
              >
                Confirm Exchange Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
