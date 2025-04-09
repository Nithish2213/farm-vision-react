
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { CheckCircle, Package, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    // Show success toast
    toast({
      title: "Order Placed Successfully!",
      description: `Order #${id} has been confirmed and is being processed.`,
    });
    
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(order => order.id.toString() === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id, toast]);

  if (!order) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            <div className="bg-agritech-paleGreen p-6 text-center">
              <CheckCircle className="h-16 w-16 text-agritech-green mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-agritech-darkGreen mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <p className="text-lg font-medium text-agritech-green mt-2">
                Order #{order.id}
              </p>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Order Details</h2>
                <div className="flex items-start">
                  <img 
                    src={order.product.image} 
                    alt={order.product.name} 
                    className="w-20 h-20 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-agritech-darkGreen">{order.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Qty: {order.quantity} {order.product.unit}
                    </p>
                    <p className="text-sm font-medium text-agritech-green mt-1">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-agritech-green mr-3" />
                  <div>
                    <p className="font-medium">Delivery Status</p>
                    <p className="text-sm text-gray-600">Order Pending</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-agritech-green mr-3" />
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-agritech-green mr-3" />
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-gray-600">Cash on Delivery</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-agritech-green hover:bg-agritech-darkGreen flex-1"
                  onClick={() => navigate(`/track-orders`)}
                >
                  Track Your Order
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-agritech-green text-agritech-green hover:bg-agritech-paleGreen flex-1"
                  onClick={() => navigate('/market')}
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

export default OrderConfirmation;
