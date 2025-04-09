
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Truck, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderId, setOrderId] = useState(null);
  
  useEffect(() => {
    // Get order ID from localStorage
    const storedOrderId = localStorage.getItem('orderId');
    setOrderId(storedOrderId || Math.floor(100000 + Math.random() * 900000));
    
    // Show success toast
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and is being processed.",
    });
  }, [toast]);

  // Get delivery details and product info from localStorage
  const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {
    fullName: "John Doe",
    phoneNumber: "1234567890",
    address: "123 Main St",
    pinCode: "123456"
  };
  
  const selectedQuantity = localStorage.getItem('selectedQuantity') || 1;
  
  // Simulated product info - in a real app this would be fetched from an API
  const productInfo = {
    id: id,
    name: "Organic Tomato Seeds",
    price: 150,
    unit: "kg",
    image: "/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png"
  };
  
  const totalPrice = productInfo.price * selectedQuantity;
  const deliveryFee = 50;
  const grandTotal = totalPrice + deliveryFee;
  
  // Estimated delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const handleTrackOrder = () => {
    navigate(`/order-tracking/${id}`);
  };
  
  const handleContinueShopping = () => {
    navigate('/market');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-agritech-darkGreen mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600">Thank you for your order. Your order has been confirmed.</p>
              <p className="font-medium text-agritech-green mt-2">Order ID: #{orderId}</p>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex items-start">
                  <div className="rounded-full bg-agritech-paleGreen p-2 mr-3">
                    <ShoppingBag className="h-5 w-5 text-agritech-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-agritech-darkGreen">Order Summary</h3>
                    
                    <div className="flex items-start mt-4">
                      <img 
                        src={productInfo.image} 
                        alt={productInfo.name} 
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{productInfo.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {selectedQuantity} {productInfo.unit}
                        </p>
                        <p className="text-sm font-medium text-agritech-green mt-1">
                          ₹{productInfo.price}/{productInfo.unit}
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price ({selectedQuantity} {productInfo.unit})</span>
                        <span>₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span className="text-agritech-green">₹{grandTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-agritech-green mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-medium text-agritech-darkGreen mb-2">Delivery Address</h3>
                      <p className="text-sm">{deliveryDetails.fullName}</p>
                      <p className="text-sm">{deliveryDetails.phoneNumber}</p>
                      <p className="text-sm mt-1">{deliveryDetails.address}</p>
                      <p className="text-sm">PIN: {deliveryDetails.pinCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-agritech-green mt-0.5 mr-2" />
                    <div>
                      <h3 className="font-medium text-agritech-darkGreen mb-2">Delivery Information</h3>
                      <p className="text-sm">
                        <span className="font-medium">Estimated Delivery:</span>
                      </p>
                      <p className="text-agritech-green">{formattedDeliveryDate}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Payment: Cash on Delivery</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <Button 
                className="bg-agritech-green hover:bg-agritech-darkGreen text-white"
                onClick={handleTrackOrder}
              >
                <Truck className="h-4 w-4 mr-2" />
                Track Your Order
              </Button>
              <Button 
                variant="outline" 
                className="border-agritech-green text-agritech-green hover:bg-agritech-paleGreen"
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
