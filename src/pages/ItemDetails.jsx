import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, User, Send } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('self');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching item data
    const items = [
      {
        id: 1,
        name: 'Organic Tomato Seeds',
        category: 'Seeds',
        quantity: '2kg',
        owner: 'John Smith',
        location: 'Springfield Valley',
        image: '/lovable-uploads/dfae19bc-0068-4451-9902-2b41432ac120.png'
      },
      {
        id: 2,
        name: 'Natural Compost',
        category: 'Fertilizers',
        quantity: '25kg',
        owner: 'Mary Johnson',
        location: 'Green Acres',
        image: '/lovable-uploads/e748ea16-1c32-432e-a630-245153964862.png'
      },
      // ... other items
    ];
    
    const foundItem = items.find(item => item.id === parseInt(id));
    setItem(foundItem);

    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Example initial messages
    setMessages([
      {
        sender: 'John Smith',
        content: 'Hello, I\'m interested in trading my organic tomato seeds.',
        time: '10:20 AM'
      },
      {
        sender: 'You',
        content: 'Hi John, I\'d love to exchange. What quantity are you looking to trade?',
        time: '10:22 AM'
      },
      {
        sender: 'John Smith',
        content: 'I have 2kg available. What do you have to exchange?',
        time: '10:33 AM'
      }
    ]);
  }, [id]);

  const handleMessageSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      sender: 'You',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleExchangeConfirm = () => {
    toast({
      title: "Exchange Request Sent!",
      description: deliveryOption === 'self' 
        ? "You'll be notified when the farmer accepts your request for self-pickup."
        : "You'll be notified when the delivery partner is assigned.",
    });
    
    // Navigate back to farmer exchange
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
      
      <div className="flex-1 grid md:grid-cols-3">
        {/* Left Column: Item Details */}
        <div className="p-6 border-r border-gray-200">
          <h1 className="text-xl font-bold text-agritech-green mb-4">Item Details</h1>
          
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
          </div>
          
          <h2 className="text-lg font-semibold text-agritech-darkGreen mb-2">{item.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Quantity: {item.quantity}</p>
          
          <div className="flex items-center mb-2 text-sm">
            <div className="w-8 h-8 rounded-full bg-agritech-green flex items-center justify-center text-white mr-2">
              <User className="h-4 w-4" />
            </div>
            <span>{item.owner}</span>
          </div>
          
          <div className="flex items-center mb-4 text-sm">
            <div className="w-8 h-8 rounded-full bg-agritech-lightGreen flex items-center justify-center text-white mr-2">
              <MapPin className="h-4 w-4" />
            </div>
            <span>{item.location}</span>
          </div>
          
          <Separator className="my-4" />
          
          <h3 className="text-md font-medium mb-3">Delivery Options</h3>
          
          <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="mb-4">
            <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md mb-2">
              <RadioGroupItem value="self" id="self" />
              <Label htmlFor="self" className="cursor-pointer flex-1">Self Pickup</Label>
            </div>
            <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="cursor-pointer flex-1">Delivery Partner</Label>
            </div>
          </RadioGroup>
          
          <Button 
            className="w-full bg-agritech-green text-white hover:bg-agritech-darkGreen"
            onClick={handleExchangeConfirm}
          >
            Confirm Exchange
          </Button>
        </div>
        
        {/* Right Column: Chat */}
        <div className="md:col-span-2 flex flex-col h-screen">
          <div className="bg-white p-4 border-b border-gray-200">
            <h2 className="font-medium">{item.owner}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.sender === 'You' ? 'flex justify-end' : ''}`}
              >
                {message.sender !== 'You' && (
                  <div className="flex mb-1 items-center">
                    <span className="font-medium">{message.sender}</span>
                  </div>
                )}
                
                <div 
                  className={`p-3 rounded-lg max-w-xs md:max-w-md ${
                    message.sender === 'You' 
                      ? 'bg-agritech-lightGreen text-agritech-darkGreen ml-auto' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-agritech-green"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
            />
            <button 
              className="bg-agritech-green text-white px-4 py-2 rounded-r-md hover:bg-agritech-darkGreen"
              onClick={handleMessageSend}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
