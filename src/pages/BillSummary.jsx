
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Truck, Edit, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const BillSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the selected quantity from local storage
    const storedQuantity = localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }

    // Get delivery details from local storage
    const storedDetails = localStorage.getItem('deliveryDetails');
    if (storedDetails) {
      setDeliveryDetails(JSON.parse(storedDetails));
    }

    // Get total price from local storage
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
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
      if (foundProduct && !storedTotalPrice) {
        setTotalPrice(foundProduct.price * quantity);
      }
      setLoading(false);
    }, 500);
  }, [id, quantity]);

  const handlePlaceOrder = () => {
    // Generate a random order ID
    const orderId = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('orderId', orderId);
    
    // Navigate to order success page
    navigate(`/order-success/${id}`);
  };

  const handleEditAddress = () => {
    navigate(`/delivery-details/${id}`);
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

  // Calculate delivery fee
  const deliveryFee = 50;
  const grandTotal = totalPrice + deliveryFee;

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
            <h1 className="text-xl font-bold text-agritech-darkGreen mb-4">Bill Summary</h1>
            
            {/* Product Details */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-700 mb-3">Product Details</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-agritech-darkGreen text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Price: ₹{product.price}/{product.unit}</p>
                          <p className="text-sm text-gray-600">Quantity: {quantity} {product.unit}</p>
                        </div>
                        <p className="font-semibold text-agritech-darkGreen">₹{totalPrice}</p>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center mt-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Delivery Details */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-700">Delivery Address</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-agritech-green h-8 px-2"
                  onClick={handleEditAddress}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="rounded-full bg-agritech-paleGreen p-2 mr-3">
                      <Truck className="h-5 w-5 text-agritech-green" />
                    </div>
                    <div>
                      <h3 className="font-medium">{deliveryDetails.fullName}</h3>
                      <p className="text-sm text-gray-600">{deliveryDetails.phoneNumber}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {deliveryDetails.address}
                        {deliveryDetails.landmark && `, Near ${deliveryDetails.landmark}`}
                      </p>
                      <p className="text-sm text-gray-600">PIN: {deliveryDetails.pinCode}</p>
                      {deliveryDetails.specialInstructions && (
                        <p className="text-sm text-gray-600 mt-1 italic">
                          "{deliveryDetails.specialInstructions}"
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Price Summary */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-700 mb-3">Price Details</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Price ({quantity} {product.unit})</p>
                      <p>₹{totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Delivery Fee</p>
                      <p>₹{deliveryFee}</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <p>Total Amount</p>
                      <p className="text-agritech-green">₹{grandTotal}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-700 mb-3">Payment Method</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-agritech-green mr-2" />
                    <p>Cash on Delivery</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/delivery-details/${id}`)}
              >
                Back
              </Button>
              <Button 
                className="bg-agritech-green hover:bg-agritech-darkGreen text-white px-8"
                onClick={handlePlaceOrder}
              >
                Place Your Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
