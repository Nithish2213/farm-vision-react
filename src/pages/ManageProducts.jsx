
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Edit, Trash, Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const ManageProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('products');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: 101,
      name: 'Organic Tomato Seeds',
      category: 'Seeds',
      quantity: 12,
      unit: 'kg',
      price: 150,
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
      orders: 3
    },
    {
      id: 102,
      name: 'Natural Compost',
      category: 'Fertilizers',
      quantity: 35,
      unit: 'kg',
      price: 75,
      image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
      orders: 1
    }
  ]);
  
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 1001,
      productId: 101,
      productName: 'Organic Tomato Seeds',
      productImage: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
      customerName: 'John Doe',
      phone: '9876543210',
      address: '123 Green Street, Eco City, EC 12345',
      quantity: 2,
      unit: 'kg',
      price: 150,
      total: 300,
      status: 'Pending',
      date: '2025-04-07'
    },
    {
      id: 1002,
      productId: 101,
      productName: 'Organic Tomato Seeds',
      productImage: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
      customerName: 'Emily Johnson',
      phone: '8765432109',
      address: '456 Earth Lane, Green Village, GV 56789',
      quantity: 3,
      unit: 'kg',
      price: 150,
      total: 450,
      status: 'Shipped',
      date: '2025-04-05'
    },
    {
      id: 1003,
      productId: 101,
      productName: 'Organic Tomato Seeds',
      productImage: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
      customerName: 'Michael Brown',
      phone: '7654321098',
      address: '789 Nature Blvd, Eco Town, ET 98765',
      quantity: 1,
      unit: 'kg',
      price: 150,
      total: 150,
      status: 'Delivered',
      date: '2025-04-02'
    },
    {
      id: 1004,
      productId: 102,
      productName: 'Natural Compost',
      productImage: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
      customerName: 'Sarah Wilson',
      phone: '6543210987',
      address: '101 Eco Park, Sustainable Heights, SH 45678',
      quantity: 5,
      unit: 'kg',
      price: 75,
      total: 375,
      status: 'Packed',
      date: '2025-04-06'
    }
  ]);

  const handleEditProduct = (productId) => {
    navigate('/market');
    // In a real app, you would open the edit dialog on the market page with this product
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Your product has been removed from the marketplace.",
    });
  };

  const handleAddProduct = () => {
    navigate('/market');
  };

  const handleViewOrders = (productId) => {
    setActiveTab('orders');
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
    
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} status changed to ${newStatus}.`,
    });
    
    setShowOrderDetails(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Packed':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'Shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-agritech-green mb-4"
            onClick={() => navigate('/market')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Marketplace
          </Button>
          
          <h1 className="text-xl font-bold text-agritech-darkGreen">Manage Your Products</h1>
          <p className="text-gray-600">View and manage your products and orders</p>
        </div>
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="mb-4">
              <Button 
                className="bg-agritech-green text-white"
                onClick={handleAddProduct}
              >
                Add New Product
              </Button>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-agritech-darkGreen">{product.name}</h3>
                      <div className="flex justify-between mt-1 mb-2">
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm font-medium text-agritech-green">₹{product.price}/{product.unit}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Available: {product.quantity} {product.unit} | 
                        Orders: <span className="font-medium">{product.orders}</span>
                      </p>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-agritech-green text-white"
                          onClick={() => handleViewOrders(product.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" /> View Orders
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-4 w-4 text-agritech-green" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
                <Button 
                  className="bg-agritech-green text-white"
                  onClick={handleAddProduct}
                >
                  Sell Your First Product
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-agritech-darkGreen mb-4">Customer Orders</h2>
              
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Total</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">#{order.id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img 
                                src={order.productImage} 
                                alt={order.productName} 
                                className="w-10 h-10 rounded-md object-cover mr-3"
                              />
                              <span className="text-sm font-medium">{order.productName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{order.customerName}</td>
                          <td className="py-3 px-4 text-sm">{order.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getStatusIcon(order.status)}
                              <span className="ml-2">{order.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">₹{order.total}</td>
                          <td className="py-3 px-4 text-center">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-agritech-green"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No orders found for your products.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-start">
                <img 
                  src={selectedOrder.productImage} 
                  alt={selectedOrder.productName} 
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{selectedOrder.productName}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {selectedOrder.quantity} {selectedOrder.unit}
                  </p>
                  <p className="text-sm font-medium text-agritech-green mt-1">
                    ₹{selectedOrder.total}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Customer Information</h4>
                <p className="text-sm">{selectedOrder.customerName}</p>
                <p className="text-sm">{selectedOrder.phone}</p>
                <p className="text-sm">{selectedOrder.address}</p>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Order Status</h4>
                <div className="flex items-center mb-3">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-2">{selectedOrder.status}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Update Status:</p>
                  <Select
                    defaultValue={selectedOrder.status}
                    onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Packed">Packed</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOrderDetails(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageProducts;
