
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Truck, MapPin, Calendar, Clock, Package, Home, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const statusOptions = [
  { id: 'confirmed', name: 'Order Confirmed', icon: Check, time: '2 hours ago' },
  { id: 'processing', name: 'Processing', icon: Package, time: 'Estimated: Today' },
  { id: 'shipped', name: 'Shipped', icon: Truck, time: 'Estimated: Tomorrow' },
  { id: 'delivered', name: 'Delivered', icon: CheckCircle, time: 'Estimated: 5 days' }
];

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  
  useEffect(() => {
    // Simulate fetching similar products
    setTimeout(() => {
      const products = [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          category: 'Seeds',
          price: 150,
          unit: 'kg',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 3,
          name: 'Bio Pesticide',
          category: 'Pesticides',
          price: 200,
          unit: 'L',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 4,
          name: 'Heirloom Corn Seeds',
          category: 'Seeds',
          price: 120,
          unit: 'kg',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        }
      ];
      setSimilarProducts(products);
    }, 500);
  }, []);

  const handleCancelOrder = () => {
    setShowCancelDialog(false);
    toast({
      title: "Order Cancelled",
      description: "Your order has been cancelled successfully.",
    });
    setTimeout(() => {
      navigate('/farmer-exchange');
    }, 1500);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Show cancel option only for confirmed and processing statuses
  const canCancel = ['confirmed', 'processing'].includes(currentStatus);
  
  // Order information from localStorage
  const orderInfo = {
    product: {
      name: "Organic Tomato Seeds",
      image: "/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png",
      quantity: localStorage.getItem('selectedQuantity') || 1,
      unit: "kg",
      price: 150
    },
    address: JSON.parse(localStorage.getItem('deliveryDetails')) || {
      fullName: "John Doe",
      phoneNumber: "1234567890",
      address: "123 Main St",
      pinCode: "123456"
    },
    orderId: id,
    orderDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    estimatedDelivery: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 5);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    })()
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-agritech-darkGreen">Track Your Order</h1>
            <Button 
              variant="ghost" 
              className="text-agritech-green" 
              onClick={() => navigate('/farmer-exchange')}
            >
              Back to Market
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Order Status Card */}
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold">Order Status</h2>
                    <p className="text-sm text-gray-500">Order #: {orderInfo.orderId}</p>
                  </div>
                  
                  <div className="relative space-y-6 mb-6">
                    {statusOptions.map((status, index) => {
                      const isActive = statusOptions.findIndex(s => s.id === currentStatus) >= index;
                      const Icon = status.icon;
                      
                      return (
                        <div key={status.id} className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            isActive 
                              ? 'bg-agritech-green text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="ml-4">
                            <p className={`font-medium ${isActive ? 'text-agritech-darkGreen' : 'text-gray-500'}`}>
                              {status.name}
                            </p>
                            <p className="text-xs text-gray-500">{status.time}</p>
                          </div>
                          {index < statusOptions.length - 1 && (
                            <div className={`absolute ml-4 mt-8 h-12 w-0.5 ${
                              isActive && statusOptions[index + 1].id !== currentStatus
                                ? 'bg-agritech-green' 
                                : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-agritech-green mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Ordered on:</p>
                        <p className="font-medium">{orderInfo.orderDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Truck className="h-4 w-4 text-agritech-green mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Estimated delivery:</p>
                        <p className="font-medium">{orderInfo.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                  
                  {canCancel && (
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        className="text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() => setShowCancelDialog(true)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel Order
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Details Card */}
            <div>
              <Card>
                <CardContent className="p-5">
                  <h2 className="font-semibold mb-4">Order Details</h2>
                  
                  <div className="flex items-start mb-4">
                    <img 
                      src={orderInfo.product.image} 
                      alt={orderInfo.product.name} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-agritech-darkGreen">{orderInfo.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {orderInfo.product.quantity} {orderInfo.product.unit}
                      </p>
                      <p className="text-sm font-medium text-agritech-green mt-1">
                        ₹{orderInfo.product.price * orderInfo.product.quantity}
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Delivery Address</h3>
                    <p className="text-sm text-gray-600">
                      {orderInfo.address.fullName}, {orderInfo.address.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      {orderInfo.address.address}, PIN: {orderInfo.address.pinCode}
                    </p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Payment</h3>
                    <p className="text-sm text-gray-600">Cash on Delivery</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Similar Products Section */}
          <div className="mb-8">
            <h2 className="font-semibold text-gray-700 mb-4">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {similarProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-agritech-darkGreen text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="text-sm font-semibold text-agritech-green mt-1">₹{product.price}/{product.unit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Your Order?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to cancel your order? This action cannot be undone.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <div className="flex items-start">
                <img 
                  src={orderInfo.product.image} 
                  alt={orderInfo.product.name} 
                  className="w-12 h-12 object-cover rounded-md mr-3"
                />
                <div>
                  <h3 className="font-medium text-sm">{orderInfo.product.name}</h3>
                  <p className="text-xs text-gray-600">
                    Order #{orderInfo.orderId}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Order
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelOrder}
            >
              Yes, Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderTracking;
