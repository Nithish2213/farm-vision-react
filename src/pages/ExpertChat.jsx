
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Mic, 
  Image, 
  Phone, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Drawer, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle,
  DrawerTrigger 
} from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';

// Mock experts data - same as in ExpertConsultation.jsx
const experts = [
  {
    id: 1,
    name: 'Dr. Ravi Sharma',
    image: 'https://i.pravatar.cc/150?img=11',
    specialty: ['Crop Disease', 'Soil Treatment'],
    experience: '15+ years in field research',
    rating: 4.8,
    reviews: 127,
    status: 'online',
    responseTime: 'Usually responds in 10 minutes'
  },
  {
    id: 2,
    name: 'Prof. Amelia Singh',
    image: 'https://i.pravatar.cc/150?img=32',
    specialty: ['Organic Farming', 'Pest Management'],
    experience: '12 years in agricultural sciences',
    rating: 4.6,
    reviews: 89,
    status: 'online',
    responseTime: 'Usually responds in 15 minutes'
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    image: 'https://i.pravatar.cc/150?img=15',
    specialty: ['Irrigation Systems', 'Crop Yield Optimization'],
    experience: '8 years in agricultural engineering',
    rating: 4.9,
    reviews: 103,
    status: 'away',
    responseTime: 'Usually responds in 1 hour'
  },
  {
    id: 4,
    name: 'Ms. Leila Patel',
    image: 'https://i.pravatar.cc/150?img=23',
    specialty: ['Sustainable Farming', 'Climate Adaptation'],
    experience: '10 years in environmental agriculture',
    rating: 4.7,
    reviews: 64,
    status: 'offline',
    responseTime: 'Usually responds in 24 hours'
  }
];

// Sample messages
const sampleMessages = [
  {
    id: 1,
    sender: 'user',
    text: "Hello Dr. Sharma, I've noticed some unusual spots on my rice paddy leaves. They started appearing last week. Can you help identify what might be causing this?",
    timestamp: new Date(new Date().getTime() - 35 * 60000).toISOString()
  },
  {
    id: 2,
    sender: 'expert',
    text: "Hello! I'd be happy to help you identify the issue with your rice paddy. Could you please send me a clear photo of the affected leaves? This will help me give you a more accurate diagnosis.",
    timestamp: new Date(new Date().getTime() - 32 * 60000).toISOString()
  },
  {
    id: 3,
    sender: 'user',
    text: "Here's a photo of the affected leaves. The spots are brown with yellow halos around them.",
    image: 'https://source.unsplash.com/random/400x300/?plant,disease',
    timestamp: new Date(new Date().getTime() - 30 * 60000).toISOString()
  },
  {
    id: 4,
    sender: 'expert',
    text: "Thank you for the photo. Based on what I can see, this appears to be Rice Blast Disease (Magnaporthe oryzae). It's a fungal disease that commonly affects rice crops, especially in humid conditions.",
    timestamp: new Date(new Date().getTime() - 28 * 60000).toISOString()
  },
  {
    id: 5,
    sender: 'expert',
    text: "Here's my diagnosis and recommendation:",
    diagnosis: {
      issue: "Rice Blast Disease",
      severity: "Moderate",
      treatment: [
        "Apply a fungicide containing tricyclazole or azoxystrobin as soon as possible",
        "Improve field drainage to reduce humidity around plants",
        "Remove and destroy severely infected plants",
        "For future prevention, consider using resistant rice varieties"
      ]
    },
    timestamp: new Date(new Date().getTime() - 25 * 60000).toISOString()
  }
];

const ExpertChat = () => {
  const { expertId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef(null);
  
  const [expert, setExpert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAttaching, setIsAttaching] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [isExpertTyping, setIsExpertTyping] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Find expert based on ID
  useEffect(() => {
    const foundExpert = experts.find(e => e.id === parseInt(expertId));
    if (foundExpert) {
      setExpert(foundExpert);
      setMessages(sampleMessages);
    } else {
      navigate('/expert-consultation');
    }
  }, [expertId, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Check for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() && !attachment) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    if (attachment) {
      userMessage.image = URL.createObjectURL(attachment);
    }
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setAttachment(null);
    
    // Simulate expert typing
    setIsExpertTyping(true);
    setTimeout(() => {
      setIsExpertTyping(false);
      
      // Add expert response after delay
      const expertResponse = {
        id: messages.length + 2,
        sender: 'expert',
        text: "I've received your message. Let me analyze this information and I'll get back to you shortly with my expert opinion.",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, expertResponse]);
    }, 3000);
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
      setIsAttaching(false);
    }
  };
  
  // Handle voice recording
  const handleVoiceRecording = () => {
    toast({
      title: "Voice Recording",
      description: "Voice recording feature will be available soon!",
      duration: 3000
    });
  };
  
  // Handle bookmark
  const handleBookmark = (messageId) => {
    toast({
      title: "Advice Bookmarked",
      description: "This expert advice has been saved to your profile.",
      duration: 3000
    });
  };
  
  // Handle feedback submission
  const handleFeedbackSubmit = (type) => {
    toast({
      title: "Thank You!",
      description: "Your feedback has been submitted.",
      duration: 3000
    });
    setShowFeedbackDialog(false);
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (!expert) return null;
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 text-gray-500"
              onClick={() => navigate('/expert-consultation')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="h-full w-full object-cover"
                />
                <div className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white ${
                  expert.status === 'online' ? 'bg-green-500' :
                  expert.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                }`} />
              </div>
              
              <div>
                <h2 className="font-medium text-gray-800">{expert.name}</h2>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">
                    {expert.specialty.join(' • ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-600"
              onClick={() => window.alert('Call feature coming soon!')}
            >
              <Phone className="h-4 w-4" />
              <span className="ml-1 hidden md:inline">Call</span>
            </Button>
            
            <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-600"
                >
                  <Star className="h-4 w-4" />
                  <span className="ml-1 hidden md:inline">Rate</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rate Your Experience</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-600 mb-4">How was your consultation with {expert.name}?</p>
                  <div className="flex justify-center space-x-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className="h-8 w-8 cursor-pointer text-gray-300 hover:text-amber-400 transition-colors"
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <textarea 
                    className="w-full mt-4 p-2 border rounded-md"
                    placeholder="Share your feedback (optional)"
                    rows={3}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>Cancel</Button>
                  <Button onClick={() => handleFeedbackSubmit('rating')}>Submit Feedback</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="bg-green-50 py-1 px-4 text-center text-xs text-green-700 border-b border-green-100">
          <div className="flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Connected to {expert.name} – {expert.responseTime}</span>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-green-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text && <p className="text-sm">{message.text}</p>}
                  
                  {message.image && (
                    <div className="mt-2 rounded-md overflow-hidden">
                      <img 
                        src={message.image} 
                        alt="Attachment" 
                        className="w-full h-auto max-h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  {message.diagnosis && (
                    <div className={`mt-3 p-3 rounded-md ${
                      message.sender === 'user' ? 'bg-green-600' : 'bg-green-50 text-gray-800'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className={`font-medium ${message.sender === 'user' ? 'text-white' : 'text-green-800'}`}>
                          Diagnosis: {message.diagnosis.issue}
                        </h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          message.diagnosis.severity === 'Low' ? 'bg-green-200 text-green-800' :
                          message.diagnosis.severity === 'Moderate' ? 'bg-amber-200 text-amber-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {message.diagnosis.severity}
                        </span>
                      </div>
                      
                      <div className="text-sm mt-2">
                        <p className={`font-medium mb-1 ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                          Recommended Actions:
                        </p>
                        <ul className={`list-disc pl-5 ${message.sender === 'user' ? 'text-white' : 'text-gray-600'}`}>
                          {message.diagnosis.treatment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        
                        <div className="mt-3 flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-xs"
                            onClick={() => handleBookmark(message.id)}
                          >
                            <Bookmark className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Expert Typing Indicator */}
            {isExpertTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 rounded-2xl p-3 shadow-sm text-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Attachment Preview */}
        {attachment && (
          <div className="p-2 bg-gray-100 border-t">
            <div className="flex items-center">
              <div className="w-16 h-16 border rounded overflow-hidden mr-2">
                <img 
                  src={URL.createObjectURL(attachment)} 
                  alt="Attachment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm truncate">{attachment.name}</p>
                <p className="text-xs text-gray-500">{Math.round(attachment.size / 1024)} KB</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500"
                onClick={() => setAttachment(null)}
              >
                <span className="sr-only">Remove</span>
                &times;
              </Button>
            </div>
          </div>
        )}
        
        {/* Chat Input */}
        <div className="bg-white border-t p-3">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center">
              {isMobile ? (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Add Attachment</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                        <Image className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Upload Photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                      <button 
                        className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={handleVoiceRecording}
                      >
                        <Mic className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">Voice Message</span>
                      </button>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" onClick={() => {/* Close drawer */}}>Cancel</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-500"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <Image className="h-5 w-5" />
                    <input 
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-500"
                    onClick={handleVoiceRecording}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              <div className="flex-1 mx-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <Button 
                disabled={!newMessage.trim() && !attachment}
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-2 text-center">
              <div className="flex justify-center space-x-6 border-t pt-2 text-xs text-gray-500">
                <button className="flex items-center" onClick={() => handleFeedbackSubmit('thumbsUp')}>
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Helpful
                </button>
                <button className="flex items-center" onClick={() => handleFeedbackSubmit('thumbsDown')}>
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  Not Helpful
                </button>
                <button className="flex items-center" onClick={() => setShowFeedbackDialog(true)}>
                  <Star className="h-3 w-3 mr-1" />
                  Rate Advice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertChat;
