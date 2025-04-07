
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle,
  User,
  ShieldCheck,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState('requested');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);

  const statuses = [
    { key: 'requested', label: 'Requested', description: 'Exchange request submitted' },
    { key: 'approved', label: 'Approved', description: 'Request approved by farmer' },
    { key: 'ready', label: 'Ready for Delivery', description: 'Item ready for pickup/delivery' },
    { key: 'delivered', label: 'Completed', description: 'Exchange successfully completed' }
  ];

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

    // Get exchange request ID from local storage
    const storedRequestId = localStorage.getItem('exchangeRequestId');
    if (storedRequestId) {
      setRequestId(storedRequestId);
    }

    // Simulate API call to fetch product details and similar items
    setTimeout(() => {
      const items = [
        {
          id: 1,
          name: 'Organic Tomato Seeds',
          category: 'Seeds',
          unit: 'kg',
          owner: 'John Smith',
          location: 'Springfield Valley',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 2,
          name: 'Natural Compost',
          category: 'Fertilizers',
          unit: 'kg',
          owner: 'Mary Johnson',
          location: 'Green Acres',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 3,
          name: 'Bio Pesticide',
          category: 'Pesticides',
          unit: 'L',
          owner: 'Robert Wilson',
          location: 'Harvest Hills',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 4,
          name: 'Heirloom Corn Seeds',
          category: 'Seeds',
          unit: 'kg',
          owner: 'Sarah Davis',
          location: 'Sunflower Fields',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        },
        {
          id: 5,
          name: 'Organic Fish Emulsion',
          category: 'Fertilizers',
          unit: 'L',
          owner: 'James Miller',
          location: 'Riverside Farm',
          image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
        },
        {
          id: 6,
          name: 'Neem Oil Spray',
          category: 'Pesticides',
          unit: 'L',
          owner: 'Emma Brown',
          location: 'Mountain View',
          image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
        }
      ];
      
      const foundProduct = items.find(item => item.id === parseInt(id));
      setProduct(foundProduct);
      
      // Get similar items (excluding current product)
      const similar = items
        .filter(item => item.category === foundProduct.category && item.id !== foundProduct.id)
        .slice(0, 4);
      setSimilarItems(similar);
      
      setLoading(false);
    }, 500);
  }, [id]);

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCancelExchange = () => {
    setShowCancelDialog(false);
    
    toast({
      title: "Exchange Request Cancelled",
      description: "Your exchange request has been successfully cancelled.",
    });
    
    setTimeout(() => {
      navigate('/farmer-exchange');
    }, 1500);
  };

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  const getStatusIndex = (statusKey) => {
    return statuses.findIndex(status => status.key === statusKey);
  };

  if (loading || !deliveryDetails) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading tracking details...</p>
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
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-agritech-green" 
            onClick={() => navigate('/farmer-exchange')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
          </Button>
          
          <Card className="bg-white shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                  <h1 className="text-xl font-bold text-agritech-darkGreen">Track Your Exchange</h1>
                  <p className="text-gray-600">Request ID: {requestId || '123456'}</p>
                </div>
                <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{getCurrentDate()}</span>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              {/* Status Timeline */}
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-7 w-0.5 bg-gray-200"></div>
                
                {statuses.map((status, index) => {
                  const statusIndex = getStatusIndex(currentStatus);
                  const isComplete = index <= statusIndex;
                  const isCurrent = index === statusIndex;
                  
                  return (
                    <div key={status.key} className="relative flex items-start mb-6 last:mb-0">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center z-10 mr-4 ${
                        isComplete 
                          ? 'bg-agritech-green text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isComplete ? (
                          <CheckCircle className="h-8 w-8" />
                        ) : (
                          <span className="text-lg font-medium">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h3 className={`font-semibold text-lg ${isCurrent ? 'text-agritech-darkGreen' : 'text-gray-700'}`}>
                          {status.label}
                          {isCurrent && <span className="ml-2 text-sm font-normal text-agritech-green">(Current)</span>}
                        </h3>
                        <p className="text-gray-600">{status.description}</p>
                        
                        {isCurrent && status.key === 'requested' && (
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => setShowCancelDialog(true)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel Request
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-6" />
              
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <div className="flex items-start">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">Category: {product.category}</p>
                      <p className="text-sm text-gray-600">Quantity: {quantity} {product.unit}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <User className="h-3 w-3 mr-1 text-agritech-green" />
                        <span>{product.owner}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Information */}
                <div className="space-y-2">
                  <h3 className="font-semibold mb-2">Delivery Information</h3>
                  <p className="text-sm text-gray-700 flex items-center mb-1">
                    {deliveryDetails.deliveryMethod === 'home' ? (
                      <>
                        <Truck className="h-4 w-4 mr-1 text-agritech-green" />
                        <span>Home Delivery</span>
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4 mr-1 text-agritech-green" />
                        <span>In-Person Meet-Up</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">Name: {deliveryDetails.fullName}</p>
                  <p className="text-sm text-gray-700 mb-1">Phone: {deliveryDetails.phoneNumber}</p>
                  <p className="text-sm text-gray-700">
                    Address: {deliveryDetails.address}, {deliveryDetails.pinCode}
                    {deliveryDetails.landmark && `, Near ${deliveryDetails.landmark}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Similar Items Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-agritech-darkGreen mb-4">Similar Items</h2>
            
            <Carousel>
              <CarouselContent>
                {similarItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-agritech-darkGreen">{item.name}</h3>
                        <p className="text-sm text-gray-500">Category: {item.category}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <User className="h-4 w-4 mr-1 text-agritech-green" />
                          <span>{item.owner}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0 mr-2" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel>
          </div>
          
          {/* Trust and Safety Section */}
          <Card className="bg-agritech-paleGreen border-agritech-green mb-6">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <ShieldCheck className="h-5 w-5 text-agritech-green mr-2" />
                <h3 className="font-semibold">Trust & Safety</h3>
              </div>
              <p className="text-gray-700 text-sm">
                All exchanges on AgriTech are verified for quality and authenticity. 
                If you face any issues with your exchange, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Cancel Exchange Request?</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            
            <p className="text-center text-gray-700 mb-2">
              Are you sure you want to cancel your exchange request for:
            </p>
            <p className="text-center font-medium mb-4">
              {product.name} ({quantity} {product.unit})
            </p>
            <p className="text-center text-gray-500 text-sm">
              This action cannot be undone.
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="sm:flex-1"
              onClick={() => setShowCancelDialog(false)}
            >
              No, Keep Request
            </Button>
            <Button 
              variant="destructive" 
              className="sm:flex-1"
              onClick={handleCancelExchange}
            >
              Yes, Cancel Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderTracking;
