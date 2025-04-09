
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Truck, ArrowLeft, MapPin } from 'lucide-react';
import QuantitySelector from '../components/QuantitySelector';

const deliveryFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  landmark: z.string().optional(),
  pinCode: z.string().min(5, { message: 'Please enter a valid PIN code' }),
  specialInstructions: z.string().optional()
});

const DeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const form = useForm({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      address: '',
      landmark: '',
      pinCode: '',
      specialInstructions: ''
    }
  });

  useEffect(() => {
    // Get the selected quantity from local storage
    const storedQuantity = localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
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
      if (foundProduct) {
        setTotalPrice(foundProduct.price * quantity);
      }
      setLoading(false);
    }, 500);
  }, [id, quantity]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    localStorage.setItem('selectedQuantity', newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const onSubmit = (data) => {
    // Store form data for bill summary page
    localStorage.setItem('deliveryDetails', JSON.stringify(data));
    localStorage.setItem('totalPrice', totalPrice);
    
    // Navigate to bill summary page
    navigate(`/bill-summary/${id}`);
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
          <StepIndicator currentStep={2} />
          
          <Button 
            variant="ghost" 
            className="mb-6 text-agritech-green" 
            onClick={() => navigate(`/product/${id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-xl font-bold text-agritech-darkGreen mb-4">Delivery Details</h1>
            
            {/* Order Summary */}
            <Card className="bg-agritech-paleGreen border-agritech-green mb-6">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-agritech-darkGreen">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <p className="text-sm text-gray-600 mr-4">Price: ₹{product.price}/{product.unit}</p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Quantity:</span>
                        <QuantitySelector 
                          value={quantity} 
                          onChange={handleQuantityChange} 
                          min={1} 
                          max={product.availableQuantity}
                          className="h-8 scale-90 origin-left"
                        />
                        <span className="ml-2 text-sm">{product.unit}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                      </p>
                      <p className="font-semibold text-agritech-darkGreen">Total: ₹{totalPrice}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landmark (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nearby landmark" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your PIN code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-2">
                  <div className="flex items-center mb-2">
                    <Truck className="h-4 w-4 mr-2 text-agritech-green" />
                    <Label className="font-medium">Home Delivery</Label>
                  </div>
                  <p className="text-sm text-gray-500">Your order will be delivered to your specified address</p>
                </div>
                
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions for delivery" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(`/product/${id}`)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-agritech-green hover:bg-agritech-darkGreen text-white px-8"
                  >
                    Deliver to This Address
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
