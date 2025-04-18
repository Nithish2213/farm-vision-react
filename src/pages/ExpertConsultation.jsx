import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  MessageSquare, 
  Video,
  Star,
  Clock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Sidebar from '../components/Sidebar';
import AppointmentModal from '../components/AppointmentModal';

const experts = [
  {
    id: 1,
    name: "Dr. Ravi Kumar",
    specialty: "Soil & Crop Disease Specialist",
    experience: "12 years experience",
    languages: ["English", "Hindi"],
    rating: 4.8,
    status: "Available Now",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Organic Farming Expert",
    experience: "15 years experience",
    languages: ["English", "Mandarin"],
    rating: 4.9,
    status: "Available Now",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 3,
    name: "Dr. John Smith",
    specialty: "Pest Management Specialist",
    experience: "10 years experience",
    languages: ["English", "Spanish"],
    rating: 4.7,
    status: "In Session",
    image: "https://i.pravatar.cc/150?img=15"
  },
  {
    id: 4,
    name: "Dr. Maria Garcia",
    specialty: "Sustainable Agriculture Expert",
    experience: "8 years experience",
    languages: ["English", "Spanish"],
    rating: 4.6,
    status: "Available Now",
    image: "https://i.pravatar.cc/150?img=23"
  }
];

const ExpertConsultation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cropType, setCropType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const availableExperts = experts.filter(e => e.status === "Available Now").length;
  
  const filteredExperts = experts.filter(expert => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expert.name.toLowerCase().includes(searchLower) ||
      expert.specialty.toLowerCase().includes(searchLower)
    );
  });

  const handleAppointmentRequest = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f0fff4]">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Consult an Agricultural Expert</h1>
            <span className="text-green-600 font-semibold">Available Experts: {availableExperts}</span>
          </div>
          <p className="text-gray-600">Get expert guidance for your farming needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by expert name or specialty..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={cropType} onValueChange={setCropType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Crop Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
            </SelectContent>
          </Select>

          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Soil Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clay">Clay</SelectItem>
              <SelectItem value="sandy">Sandy</SelectItem>
              <SelectItem value="loamy">Loamy</SelectItem>
              <SelectItem value="silt">Silt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      expert.status === "Available Now" ? "bg-green-500" : 
                      expert.status === "In Session" ? "bg-yellow-500" : "bg-gray-500"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{expert.name}</h3>
                        <p className="text-sm text-gray-600">{expert.specialty}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        expert.status === "Available Now" ? "bg-green-100 text-green-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {expert.status}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {expert.experience}
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center mr-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{expert.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {expert.languages.map((lang, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleAppointmentRequest(expert)}
                        disabled={expert.status !== "Available Now"}
                      >
                        Request Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showModal && (
          <AppointmentModal
            expert={selectedExpert}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ExpertConsultation;
