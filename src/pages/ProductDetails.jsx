
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StepIndicator from '../components/StepIndicator';
import QuantitySelector from '../components/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, User, Star, Award, ShieldCheck, Leaf } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
          description: 'High-quality organic tomato seeds from heirloom varieties. These seeds have been carefully selected for disease resistance and high yield.',
          quality: 'Premium',
          benefits: [
            'Disease resistant', 
            'High germination rate', 
            'Non-GMO', 
            'Organically grown'
          ],
          usage: 'Ideal for both small gardens and commercial farming. Plant in well-drained soil with full sun exposure.',
          rating: 4.8,
          reviews: 24
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
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
          description: 'Nutrient-rich natural compost made from organic materials. This compost is perfect for enriching soil and promoting healthy plant growth.',
          quality: 'High',
          benefits: [
            'Improves soil structure', 
            'Enhances water retention', 
            'Promotes beneficial microorganisms', 
            'Free from synthetic chemicals'
          ],
          usage: 'Mix with garden soil before planting or use as mulch around existing plants.',
          rating: 4.5,
          reviews: 18
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
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
          description: 'Environmentally friendly bio pesticide that effectively controls pests without harming beneficial insects.',
          quality: 'Standard',
          benefits: [
            'Eco-friendly', 
            'Safe for beneficial insects', 
            'No chemical residue', 
            'Biodegradable'
          ],
          usage: 'Dilute as directed and spray on affected plants. Best applied early morning or late evening.',
          rating: 4.2,
          reviews: 15
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
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
          description: "Traditional heirloom corn seeds passed down through generations. These non-GMO seeds produce sweet, flavorful corn.",
          quality: 'Premium',
          benefits: [
            'Heritage variety', 
            'Sweet flavor', 
            'High nutritional value', 
            'Open-pollinated'
          ],
          usage: 'Plant in full sun after all danger of frost has passed. Space rows 30-36 inches apart.',
          rating: 4.7,
          reviews: 22
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
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
          description: 'Liquid fertilizer made from fish byproducts. Rich in nitrogen and other essential nutrients that promote healthy plant growth.',
          quality: 'Premium',
          benefits: [
            'Fast-acting nitrogen', 
            'Contains trace minerals', 
            'Promotes lush foliage', 
            'Natural source'
          ],
          usage: 'Dilute with water as directed and apply to soil around plants or as foliar spray.',
          rating: 4.4,
          reviews: 17
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
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
          description: 'Natural neem oil spray that works as both an insecticide and fungicide. Effective against a wide range of common garden pests and diseases.',
          quality: 'High',
          benefits: [
            'Dual action', 
            'Safe for humans and pets', 
            'No harmful residue', 
            'OMRI listed'
          ],
          usage: 'Spray thoroughly on plant surfaces, including undersides of leaves. Apply every 7-14 days as needed.',
          rating: 4.3,
          reviews: 19
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
    // Store selected quantity in local storage for use in next steps
    localStorage.setItem('selectedQuantity', newQuantity);
    if (product) {
      setTotalPrice(product.price * newQuantity);
    }
  };

  const handleBuyNow = () => {
    // Store selected quantity in local storage for use in next steps
    localStorage.setItem('selectedQuantity', quantity);
    navigate(`/delivery-details/${id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading product details...</p>
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
        <div className="max-w-6xl mx-auto">
          <StepIndicator currentStep={1} />
          
          <Button 
            variant="ghost" 
            className="mb-4 text-agritech-green" 
            onClick={() => navigate('/farmer-exchange')}
          >
            &larr; Back to Market
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full aspect-square object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-agritech-darkGreen">{product.name}</h1>
                  <div className="flex items-center mt-1 mb-2">
                    <Badge variant="outline" className="bg-agritech-paleGreen text-agritech-darkGreen border-agritech-green mr-2">
                      {product.category}
                    </Badge>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Badge className="bg-agritech-green">{product.quality}</Badge>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-agritech-paleGreen flex items-center justify-center text-agritech-green mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{product.owner}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600 font-medium">Price:</p>
                  <p className="text-xl font-semibold text-agritech-green">₹{product.price}/{product.unit}</p>
                </div>
                
                <p className="text-gray-600 font-medium mb-2">Available Quantity:</p>
                <p className="text-lg text-agritech-darkGreen mb-4">
                  {product.availableQuantity} {product.unit}
                </p>
                
                <div className="flex items-center mb-3">
                  <p className="text-gray-600 font-medium mr-4">Select Quantity:</p>
                  <QuantitySelector 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    min={1} 
                    max={product.availableQuantity}
                  />
                  <span className="ml-2 text-gray-500">{product.unit}</span>
                </div>
                
                <div className="flex justify-between items-center mb-5 p-3 bg-agritech-paleGreen rounded-lg">
                  <p className="font-medium">Total Price:</p>
                  <p className="text-xl font-bold text-agritech-darkGreen">₹{totalPrice}</p>
                </div>
                
                <Button 
                  className="w-full bg-agritech-green hover:bg-agritech-darkGreen text-white py-6 text-base rounded-md transition-all hover:shadow-md"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Details Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-agritech-darkGreen mb-4">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <Award className="h-5 w-5 text-agritech-green mr-2" />
                  Benefits
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="flex items-center text-lg font-medium mb-3">
                  <ShieldCheck className="h-5 w-5 text-agritech-green mr-2" />
                  Usage Guidelines
                </h3>
                <p className="text-gray-700">{product.usage}</p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <Card className="bg-agritech-paleGreen border-agritech-green p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Leaf className="h-10 w-10 text-agritech-green mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-agritech-darkGreen">Ready to Buy?</h3>
                  <p className="text-gray-700">Get premium quality {product.name.toLowerCase()} at the best price</p>
                </div>
              </div>
              <Button 
                className="bg-agritech-green hover:bg-agritech-darkGreen text-white py-6 px-8 text-base rounded-md transition-all hover:shadow-md"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
