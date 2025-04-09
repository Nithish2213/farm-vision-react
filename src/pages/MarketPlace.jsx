
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, MapPin, User, Plus, Edit, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const MarketPlace = () => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [isSeller, setIsSeller] = useState(true); // Mock seller role - in real app would come from auth
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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in a real app, this would come from an API
  const [products, setProducts] = useState([
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
      description: 'High-quality organic tomato seeds from heirloom varieties. These seeds have been carefully selected for disease resistance and high yield. Perfect for both small gardens and commercial farming.'
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
      description: 'Nutrient-rich natural compost made from organic materials. This compost is perfect for enriching soil and promoting healthy plant growth. Free from synthetic chemicals and safe for all types of crops.'
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
      description: 'Environmentally friendly bio pesticide that effectively controls pests without harming beneficial insects. Made from natural ingredients and safe for use on all food crops.'
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
      description: "Traditional heirloom corn seeds passed down through generations. These non-GMO seeds produce sweet, flavorful corn that's perfect for direct consumption or processing."
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
      description: 'Liquid fertilizer made from fish byproducts. Rich in nitrogen and other essential nutrients that promote healthy plant growth. Ideal for vegetable gardens and flower beds.'
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
      description: 'Natural neem oil spray that works as both an insecticide and fungicide. Effective against a wide range of common garden pests and diseases while being safe for humans and pets.'
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

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
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

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product Deleted",
      description: "Your product has been removed from the marketplace.",
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
      id: products.length + 1, // This is a simplistic approach, in a real app you'd use a unique ID
      ...newProduct,
      owner: "You", // In a real app, this would be the current user's name
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
      description: "Your product has been added to the marketplace.",
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
      if (product.id === editProductId) {
        return {
          ...product,
          ...newProduct,
        };
      }
      return product;
    }));

    setShowEditProduct(false);
    setEditProductId(null);
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-agritech-green">Green Products Marketplace</h1>
            <div className="flex space-x-3">
              {isSeller && (
                <>
                  <Button 
                    className="bg-agritech-green text-white"
                    onClick={handleAddProduct}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Sell a Product
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-agritech-green border-agritech-green"
                    onClick={handleManageProducts}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Manage Products
                  </Button>
                </>
              )}
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
                  {isSeller && product.owner === "You" && (
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-500 hover:text-agritech-green"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  )}
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

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sell a New Product</DialogTitle>
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
    </div>
  );
};

export default MarketPlace;
