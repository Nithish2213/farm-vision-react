
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash, Eye, Plus, Package, User, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ManageProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Seeds',
    quantity: '',
    unit: 'kg',
    price: '',
    location: '',
    description: '',
    image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png', // Default image
  });

  useEffect(() => {
    // Simulate fetching data
    // In a real app, you would fetch from an API
    setTimeout(() => {
      setProducts([
        {
          id: 5,
          name: 'Organic Fish Emulsion',
          category: 'Fertilizers',
          quantity: 100,
          unit: 'L',
          price: 180,
          location: 'Riverside Farm',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
          description: 'Liquid fertilizer made from fish byproducts. Rich in nitrogen and other essential nutrients.'
        },
        {
          id: 6,
          name: 'Neem Oil Spray',
          category: 'Pesticides',
          quantity: 20,
          unit: 'L',
          price: 220,
          location: 'Mountain View',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
          description: 'Natural neem oil spray that works as both an insecticide and fungicide.'
        }
      ]);
    }, 500);
  }, []);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      location: product.location,
      description: product.description,
      image: product.image,
    });
    setShowEditProduct(true);
  };

  const handleViewOrders = (product) => {
    setSelectedProduct(product);
    // Simulate fetching orders for this product
    setTimeout(() => {
      setOrders([
        {
          id: 101,
          productId: product.id,
          customerName: 'John Doe',
          phoneNumber: '1234567890',
          address: '123 Main St, Cityville',
          pinCode: '123456',
          quantity: 2,
          status: 'Pending',
          orderDate: '2025-04-02'
        },
        {
          id: 102,
          productId: product.id,
          customerName: 'Jane Smith',
          phoneNumber: '0987654321',
          address: '456 Elm St, Townsville',
          pinCode: '654321',
          quantity: 1,
          status: 'Shipped',
          orderDate: '2025-04-01'
        }
      ]);
      setShowOrders(true);
    }, 300);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "The product has been removed from your listings.",
    });
  };

  const handleSubmitProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newProductItem = {
      id: Date.now(), // Simple unique ID generation
      ...newProduct,
    };

    setProducts([...products, newProductItem]);
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      category: 'Seeds',
      quantity: '',
      unit: 'kg',
      price: '',
      location: '',
      description: '',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
    });

    toast({
      title: "Product Added",
      description: "Your product has been listed on the marketplace.",
    });
  };

  const handleUpdateProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    setProducts(products.map(product => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          ...newProduct,
        };
      }
      return product;
    }));

    setShowEditProduct(false);
    setSelectedProduct(null);
    setNewProduct({
      name: '',
      category: 'Seeds',
      quantity: '',
      unit: 'kg',
      price: '',
      location: '',
      description: '',
      image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
    });

    toast({
      title: "Product Updated",
      description: "Your product has been updated successfully.",
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus
        };
      }
      return order;
    }));

    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} is now ${newStatus}`,
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Packed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-agritech-darkGreen">Manage Products</h1>
            <Button 
              className="bg-agritech-green text-white"
              onClick={handleAddProduct}
            >
              <Plus className="h-4 w-4 mr-2" /> Add New Product
            </Button>
          </div>
          
          <Tabs defaultValue="products" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="products">Your Products</TabsTrigger>
              <TabsTrigger value="sales">Sales Overview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-700 mb-1">No Products Yet</h2>
                  <p className="text-gray-500 mb-4">You haven't added any products to sell</p>
                  <Button 
                    className="bg-agritech-green text-white"
                    onClick={handleAddProduct}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Your First Product
                  </Button>
                </div>
              ) : (
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
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold text-agritech-darkGreen">{product.name}</h3>
                          <Badge variant="outline" className="bg-agritech-paleGreen text-agritech-darkGreen border-none">
                            {product.category}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm text-gray-600">Available: {product.quantity} {product.unit}</p>
                          <p className="font-semibold text-agritech-green">₹{product.price}/{product.unit}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{product.location}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 text-agritech-green border-agritech-green hover:bg-agritech-paleGreen"
                            onClick={() => handleViewOrders(product)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Orders
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sales">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>
                  <p className="text-gray-500">
                    Track your sales performance and manage orders from one place.
                    This feature will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name*</Label>
              <Input 
                id="name" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <select 
                id="category" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Pesticides">Pesticides</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity*</Label>
                <Input 
                  id="quantity" 
                  type="number"
                  value={newProduct.quantity} 
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  placeholder="Available quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit*</Label>
                <select 
                  id="unit" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per unit (₹)*</Label>
              <Input 
                id="price" 
                type="number"
                value={newProduct.price} 
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="Price per unit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location*</Label>
              <Input 
                id="location" 
                value={newProduct.location} 
                onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                placeholder="Your location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                placeholder="Describe your product"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                value={newProduct.image} 
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                placeholder="Product image URL"
              />
              <p className="text-xs text-gray-500">Use a public image URL or upload to an image hosting service</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProduct(false)}>Cancel</Button>
            <Button className="bg-agritech-green" onClick={handleSubmitProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name*</Label>
              <Input 
                id="edit-name" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category*</Label>
              <select 
                id="edit-category" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Pesticides">Pesticides</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity*</Label>
                <Input 
                  id="edit-quantity" 
                  type="number"
                  value={newProduct.quantity} 
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-unit">Unit*</Label>
                <select 
                  id="edit-unit" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                >
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="L">L</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price">Price per unit (₹)*</Label>
              <Input 
                id="edit-price" 
                type="number"
                value={newProduct.price} 
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Location*</Label>
              <Input 
                id="edit-location" 
                value={newProduct.location} 
                onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input 
                id="edit-image" 
                value={newProduct.image} 
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditProduct(false)}>Cancel</Button>
            <Button className="bg-agritech-green" onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Orders Dialog */}
      <Dialog open={showOrders} onOpenChange={setShowOrders}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Orders for {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No orders yet for this product</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-xs text-gray-500">Ordered on: {order.orderDate}</p>
                        </div>
                        <Badge className={getStatusBadgeColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <User className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.phoneNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm">{order.address}</p>
                          <p className="text-xs text-gray-500">PIN: {order.pinCode}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <div>
                          <p className="text-sm">
                            <span className="text-gray-500">Quantity:</span> {order.quantity} {selectedProduct?.unit}
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-500">Total:</span> ₹{(selectedProduct?.price || 0) * order.quantity}
                          </p>
                        </div>
                        
                        <select 
                          className="p-1.5 text-sm border border-gray-300 rounded-md bg-white"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowOrders(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProducts;
