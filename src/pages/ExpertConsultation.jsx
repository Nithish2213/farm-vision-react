
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Leaf, 
  MessageSquare, 
  Search, 
  Star, 
  Filter,
  Phone,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

// Mock expert data
const experts = [
  {
    id: 1,
    name: 'Dr. Ravi Sharma',
    image: 'https://i.pravatar.cc/150?img=11',
    specialty: ['Crop Disease', 'Soil Treatment'],
    experience: '15+ years in field research',
    rating: 4.8,
    reviews: 127,
    status: 'online', // online, away, offline
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

const ExpertConsultation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cropType, setCropType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [minRating, setMinRating] = useState('');
  
  const filteredExperts = experts.filter(expert => {
    // Search term filter
    if (searchTerm && !expert.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !expert.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Rating filter
    if (minRating && expert.rating < parseInt(minRating)) {
      return false;
    }
    
    return true;
  });

  const handleStartChat = (expertId) => {
    navigate(`/expert-chat/${expertId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <MessageSquare className="h-6 w-6 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Consult an Agricultural Expert</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Get advice from certified professionals on crops, soil, and plant health.
          </p>
        </div>
        
        {/* Search & Filter Panel */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 sticky top-0 z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search experts by name or specialty..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder="Crop Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paddy">Paddy</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leaf_curl">Leaf Curl</SelectItem>
                  <SelectItem value="root_rot">Root Rot</SelectItem>
                  <SelectItem value="pest_infestation">Pest Infestation</SelectItem>
                  <SelectItem value="poor_growth">Poor Growth</SelectItem>
                  <SelectItem value="discoloration">Discoloration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="Soil Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                  <SelectItem value="chalky">Chalky</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Additional Filter Row */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Filter by rating:</span>
              <div className="flex space-x-2">
                {[3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className={`px-2 py-1 text-xs rounded-full flex items-center ${
                      minRating === rating.toString()
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setMinRating(minRating === rating.toString() ? '' : rating.toString())}
                  >
                    {rating}+ <Star className="h-3 w-3 ml-1 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <button
              className="text-sm text-purple-600 hover:text-purple-800"
              onClick={() => {
                setSearchTerm('');
                setCropType('');
                setIssueType('');
                setSoilType('');
                setMinRating('');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => (
              <Card 
                key={expert.id} 
                className="hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden rounded-xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="relative h-14 w-14 rounded-full overflow-hidden mr-3 border-2 border-green-100">
                        <img 
                          src={expert.image} 
                          alt={expert.name} 
                          className="h-full w-full object-cover"
                        />
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          expert.status === 'online' ? 'bg-green-500' :
                          expert.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{expert.name}</h3>
                        <div className="flex mt-1">
                          {Array.from({ length: Math.floor(expert.rating) }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({expert.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          expert.status === 'online' ? 'bg-green-100 text-green-700' :
                          expert.status === 'away' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {expert.status === 'online' ? 'Online' :
                           expert.status === 'away' ? 'Away' : 'Offline'}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-500" />
                          <p className="text-xs">{expert.responseTime}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {expert.specialty.map((spec, i) => (
                        <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{expert.experience}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      onClick={() => window.alert('Request a call feature coming soon!')}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Request Call
                    </Button>
                    
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                      onClick={() => handleStartChat(expert.id)}
                    >
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mb-4 text-gray-400">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No experts found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search filters</p>
              <Button 
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setCropType('');
                  setIssueType('');
                  setSoilType('');
                  setMinRating('');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertConsultation;
