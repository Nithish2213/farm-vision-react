import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, User, Send, Clock, X, Check, Truck, Map, Calendar, FileText } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('self');
  const [showSelfPickupConfirm, setShowSelfPickupConfirm] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showDeliveryConfirm, setShowDeliveryConfirm] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    preferredTime: '13:00',
    notes: '',
  });
  const messageContainerRef = useRef(null);
  
  const [userStatus] = useState('Online');

  useEffect(() => {
    const items = [
      {
        id: 1,
        name: 'Organic Tomato Seeds',
        category: 'Seeds',
        quantity: '2kg',
        owner: 'John Smith',
        location: 'Springfield Valley',
        image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png',
        description: 'High-quality organic tomato seeds from heirloom varieties. Perfect for both gardens and farming.'
      },
      {
        id: 2,
        name: 'Natural Compost',
        category: 'Fertilizers',
        quantity: '25kg',
        owner: 'Mary Johnson',
        location: 'Green Acres',
        image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png',
        description: 'Nutrient-rich natural compost made from organic materials. Safe for all crops.'
      },
    ];
    
    const foundItem = items.find(item => item.id === parseInt(id));
    setItem(foundItem);

    setMessages([
      {
        sender: 'John Smith',
        content: 'Hello, I\'m interested in trading my organic tomato seeds.',
        time: '10:20 AM',
        isUser: false
      },
      {
        sender: 'You',
        content: 'Hi John, I\'d love to exchange. What quantity are you looking to trade?',
        time: '10:22 AM',
        isUser: true
      },
      {
        sender: 'John Smith',
        content: 'I have 2kg available. What do you have to exchange?',
        time: '10:33 AM',
        isUser: false
      }
    ]);
  }, [id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      sender: 'You',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      const response = {
        sender: item.owner,
        content: "Thanks for your message. I'm looking forward to exchanging items with you.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleExchangeConfirm = () => {
    if (deliveryOption === 'self') {
      setShowSelfPickupConfirm(true);
    } else {
      setShowDeliveryForm(true);
    }
  };

  const handleDeliveryFormSubmit = (e) => {
    e.preventDefault();
    setShowDeliveryForm(false);
    setShowDeliveryConfirm(true);
  };

  const closeAllDialogs = () => {
    setShowSelfPickupConfirm(false);
    setShowDeliveryForm(false);
    setShowDeliveryConfirm(false);
  };

  const backToChat = () => {
    closeAllDialogs();
    toast({
      title: "Exchange confirmed!",
      description: "You can continue chatting to arrange details.",
    });
  };

  const backToMarket = () => {
    closeAllDialogs();
    navigate('/farmer-exchange');
  };

  if (!item) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 grid md:grid-cols-3 h-screen">
        <div className="p-6 border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <h2 className="text-lg font-semibold text-agritech-darkGreen mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-4">Quantity: {item.quantity}</p>
            
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-agritech-green flex items-center justify-center text-white mr-2">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium">{item.owner}</span>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-agritech-lightGreen flex items-center justify-center text-white mr-2">
                <MapPin className="h-4 w-4" />
              </div>
              <span>{item.location}</span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
            <h3 className="text-md font-medium mb-3">Delivery Options</h3>
            
            <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="mb-4 space-y-3">
              <div className={`flex items-center p-3 border rounded-md cursor-pointer ${deliveryOption === 'self' ? 'border-agritech-green bg-agritech-paleGreen' : 'border-gray-200'}`}>
                <RadioGroupItem value="self" id="self" className="mr-2" />
                <Label htmlFor="self" className="flex items-center flex-1 cursor-pointer">
                  <span className="mr-2 text-xl" role="img" aria-label="self pickup">🚶</span>
                  <span>Self Pickup</span>
                </Label>
              </div>
              <div className={`flex items-center p-3 border rounded-md cursor-pointer ${deliveryOption === 'delivery' ? 'border-agritech-green bg-agritech-paleGreen' : 'border-gray-200'}`}>
                <RadioGroupItem value="delivery" id="delivery" className="mr-2" />
                <Label htmlFor="delivery" className="flex items-center flex-1 cursor-pointer">
                  <span className="mr-2 text-xl" role="img" aria-label="delivery">🚚</span>
                  <span>Delivery Partner</span>
                </Label>
              </div>
            </RadioGroup>
            
            <Button 
              className="w-full bg-agritech-green hover:bg-agritech-darkGreen text-white py-6 text-base rounded-full transition-all hover:shadow-md"
              onClick={handleExchangeConfirm}
            >
              Confirm Exchange
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2 flex flex-col h-screen">
          <div className="bg-white p-4 border-b border-gray-200 flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${item.owner.replace(' ', '+')}&background=7FFF00&color=fff`} />
              <AvatarFallback>{item.owner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{item.owner}</h2>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-500">{userStatus}</span>
              </div>
            </div>
          </div>
          
          <ScrollArea ref={messageContainerRef} className="flex-1 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-xs md:max-w-md">
                    {!message.isUser && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback>{message.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{message.sender}</span>
                      </div>
                    )}
                    
                    <div 
                      className={`p-3 rounded-2xl ${
                        message.isUser 
                          ? 'bg-agritech-green text-white ml-auto rounded-br-none' 
                          : 'bg-white border border-gray-100 shadow-sm rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 bg-gray-100 border-0 rounded-l-full focus:outline-none focus:ring-2 focus:ring-agritech-green"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
              />
              <button 
                className="bg-agritech-green text-white p-3 rounded-r-full hover:bg-agritech-darkGreen transition-colors"
                onClick={handleMessageSend}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showSelfPickupConfirm} onOpenChange={setShowSelfPickupConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Self Pickup Exchange Confirmed</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-agritech-paleGreen p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Item:</span>
                <span className="font-medium">{item?.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{item?.quantity}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">From:</span>
                <span className="font-medium">{item?.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Location:</span>
                <span className="font-medium">{item?.location}</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Map className="h-5 w-5 text-agritech-green mr-2" />
                <span className="font-medium">Pickup Location</span>
              </div>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-2">
                <p className="text-gray-500 text-sm">Map preview would appear here</p>
              </div>
              <p className="text-sm text-gray-600">
                Please contact {item?.owner} in chat to coordinate pickup time.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Pickup Checklist:</h4>
              <div className="flex items-start space-x-2">
                <Checkbox id="bring" defaultChecked />
                <Label htmlFor="bring" className="text-sm">Bring item for exchange</Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="confirm" defaultChecked />
                <Label htmlFor="confirm" className="text-sm">Confirm time with {item?.owner}</Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="ontime" defaultChecked />
                <Label htmlFor="ontime" className="text-sm">Be on time</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full" variant="outline" onClick={backToMarket}>
              Return to Market
            </Button>
            <Button className="w-full bg-agritech-green" onClick={backToChat}>
              Go Back to Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeliveryForm} onOpenChange={setShowDeliveryForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Delivery Details</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleDeliveryFormSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Address</Label>
              <input
                id="pickup"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={deliveryDetails.pickupAddress}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, pickupAddress: e.target.value})}
                placeholder="Enter pickup address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dropoff">Drop-off Address</Label>
              <input
                id="dropoff"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={deliveryDetails.dropoffAddress}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, dropoffAddress: e.target.value})}
                placeholder="Enter drop-off address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <select
                id="time"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={deliveryDetails.preferredTime}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, preferredTime: e.target.value})}
              >
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <textarea
                id="notes"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={deliveryDetails.notes}
                onChange={(e) => setDeliveryDetails({...deliveryDetails, notes: e.target.value})}
                placeholder="E.g., Leave with neighbor if not home"
                rows={3}
              />
            </div>
            
            <div className="bg-agritech-paleGreen p-4 rounded-lg">
              <h4 className="font-medium mb-2">Delivery Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Item:</span>
                  <span className="font-medium">{item?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{item?.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Mode:</span>
                  <span className="font-medium">Delivery Partner</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Delivery:</span>
                  <span className="font-medium">2-3 days</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="button" className="w-full" variant="outline" onClick={() => setShowDeliveryForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="w-full bg-agritech-green">
                Confirm Delivery
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeliveryConfirm} onOpenChange={setShowDeliveryConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Delivery Request Sent</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Check className="h-8 w-8 text-agritech-green" />
              </div>
              <p className="text-gray-600">Your delivery is being scheduled. Stay in chat for updates.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-agritech-green text-white flex items-center justify-center z-10">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="ml-2 font-medium">Pending</span>
                  </div>
                  <span className="text-xs text-gray-500">Now</span>
                </div>
                <div className="absolute top-4 left-4 h-full w-0.5 bg-gray-200 -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center z-10">
                      <span>2</span>
                    </div>
                    <span className="ml-2 text-gray-500">Picked Up</span>
                  </div>
                  <span className="text-xs text-gray-500">Est. Tomorrow</span>
                </div>
                <div className="absolute top-4 left-4 h-full w-0.5 bg-gray-200 -z-10"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center z-10">
                      <span>3</span>
                    </div>
                    <span className="ml-2 text-gray-500">In Transit</span>
                  </div>
                  <span className="text-xs text-gray-500">Est. 2 days</span>
                </div>
                <div className="absolute top-4 left-4 h-full w-0.5 bg-gray-200 -z-10"></div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                      <span>4</span>
                    </div>
                    <span className="ml-2 text-gray-500">Delivered</span>
                  </div>
                  <span className="text-xs text-gray-500">Est. 3 days</span>
                </div>
              </div>
            </div>
            
            <div className="bg-agritech-paleGreen p-4 rounded-lg space-y-2">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-agritech-green mr-2" />
                <span className="font-medium">Delivery Details</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Pickup:</p>
                  <p className="font-medium">{deliveryDetails.pickupAddress || '123 Farm St, Springfield'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Drop-off:</p>
                  <p className="font-medium">{deliveryDetails.dropoffAddress || '456 Market Ave, Greenville'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Time:</p>
                  <p className="font-medium">
                    {deliveryDetails.preferredTime ? 
                      new Date(`2023-01-01T${deliveryDetails.preferredTime}`).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'}) : 
                      '1:00 PM'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Item:</p>
                  <p className="font-medium">{item?.name}</p>
                </div>
              </div>
              
              {deliveryDetails.notes && (
                <div className="text-sm">
                  <p className="text-gray-500">Notes:</p>
                  <p>{deliveryDetails.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full" variant="outline" onClick={backToMarket}>
              Return to Market
            </Button>
            <Button className="w-full bg-agritech-green" onClick={backToChat}>
              Go Back to Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemDetails;
