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
  Clock,
  ChevronDown,
  ChevronUp,
  Info,
  PlayCircle,
  AlertCircle,
  CheckCircle,
  Lock,
  TrendingUp,
  Shield,
  Clipboard,
  CreditCard
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import InvestmentCard from '../components/InvestmentCard';

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

// Mock farm investment opportunities
const farmInvestments = [
  {
    id: 1,
    name: "Organic Rice Farm",
    farmer: {
      name: "Rajesh Kumar",
      image: "https://i.pravatar.cc/150?img=33",
      verified: true
    },
    location: "Tamil Nadu",
    fundingGoal: 50000,
    currentFunding: 23500,
    returnRate: 12,
    duration: 8,
    risk: "low",
    description: "Support our organic rice farming project that uses traditional methods and supports 5 local families.",
    allocationBreakdown: [
      { category: "Seeds & Fertilizer", percentage: 30 },
      { category: "Labor", percentage: 40 },
      { category: "Equipment", percentage: 20 },
      { category: "Marketing", percentage: 10 }
    ]
  },
  {
    id: 2,
    name: "Sustainable Mango Orchard",
    farmer: {
      name: "Priya Singh",
      image: "https://i.pravatar.cc/150?img=25",
      verified: true
    },
    location: "Maharashtra",
    fundingGoal: 75000,
    currentFunding: 52000,
    returnRate: 15,
    duration: 12,
    risk: "medium",
    description: "Invest in our mango orchard expansion that uses drip irrigation and organic pest control methods.",
    allocationBreakdown: [
      { category: "Saplings", percentage: 35 },
      { category: "Irrigation", percentage: 25 },
      { category: "Labor", percentage: 30 },
      { category: "Other", percentage: 10 }
    ]
  },
  {
    id: 3,
    name: "Hydroponic Vegetable Greenhouse",
    farmer: {
      name: "Amit Patel",
      image: "https://i.pravatar.cc/150?img=12",
      verified: true
    },
    location: "Gujarat",
    fundingGoal: 120000,
    currentFunding: 35000,
    returnRate: 18,
    duration: 6,
    risk: "high",
    description: "Support modern farming with this hydroponic greenhouse project that produces year-round vegetables.",
    allocationBreakdown: [
      { category: "Structure", percentage: 40 },
      { category: "Hydroponic System", percentage: 30 },
      { category: "Seeds & Nutrients", percentage: 20 },
      { category: "Energy", percentage: 10 }
    ]
  }
];

const ExpertConsultation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cropType, setCropType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [soilType, setSoilType] = useState('');
  const [minRating, setMinRating] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [tabValue, setTabValue] = useState("experts");
  
  const filteredExperts = experts.filter(expert => {
    if (searchTerm && !expert.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !expert.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    if (minRating && expert.rating < parseInt(minRating)) {
      return false;
    }
    
    return true;
  });

  const handleStartChat = (expertId) => {
    navigate(`/expert-chat/${expertId}`);
  };

  const calculateReturn = (amount, rate, months) => {
    return Math.round(amount * (1 + (rate / 100) * (months / 12)));
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskDescription = (risk) => {
    switch(risk) {
      case 'low':
        return 'Lower risk due to established crop patterns and favorable climate conditions.';
      case 'medium':
        return 'Moderate risk due to seasonal variations and market fluctuations.';
      case 'high':
        return 'Higher risk due to innovative techniques or climate-sensitive crops.';
      default:
        return 'Risk assessment information not available.';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <div className="text-center mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="experts" className="px-6">
                <MessageSquare className="h-5 w-5 mr-2" />
                Expert Consultation
              </TabsTrigger>
              <TabsTrigger value="invest" className="px-6">
                <TrendingUp className="h-5 w-5 mr-2" />
                Farm Investments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="experts">
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
          </TabsContent>
          
          <TabsContent value="invest">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Leaf className="h-6 w-6 text-green-500" />
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Invest in Farm Projects</h1>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Support farmers directly and earn returns while promoting sustainable agriculture.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {farmInvestments.map((investment) => (
                <InvestmentCard 
                  key={investment.id}
                  investment={investment}
                />
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Clipboard className="h-5 w-5 mr-2 text-green-600" />
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>When do I get my money back?</AccordionTrigger>
                  <AccordionContent>
                    Returns are distributed after the harvest cycle is complete. The exact timeline varies by project, 
                    but is typically between 6-12 months. You'll receive notifications as the project progresses and 
                    when your returns are ready to be claimed.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What if the crop fails?</AccordionTrigger>
                  <AccordionContent>
                    Each project has risk mitigation measures in place, including crop insurance where available. 
                    In case of crop failure, you'll be compensated based on the insurance coverage of the project. 
                    The risk level indicator on each project gives you a sense of the potential risk involved.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is this SEBI approved?</AccordionTrigger>
                  <AccordionContent>
                    Our platform operates as a peer-to-peer lending marketplace specifically for agricultural projects. 
                    While we comply with all relevant regulations, these investments are not securities regulated by SEBI. 
                    They are direct funding arrangements between you and the farmers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How are farmers vetted?</AccordionTrigger>
                  <AccordionContent>
                    All farmers on our platform undergo a rigorous verification process. This includes document verification, 
                    farm visits, credit history checks, and assessment of farming experience. Only farmers meeting our 
                    criteria are allowed to list projects.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-6 flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Important Notice</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Investment in agricultural projects carries risks, including but not limited to crop failure, 
                  weather events, and market fluctuations. Please read our full 
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-purple-600 hover:text-purple-800 underline mx-1">
                        terms and conditions
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Investment Terms & Conditions</DialogTitle>
                        <DialogDescription>
                          Please read carefully before investing
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="max-h-[60vh] overflow-y-auto pr-2">
                        <div className="space-y-4 text-sm">
                          <h3 className="font-semibold text-base">Risk Disclosure</h3>
                          <p>
                            Investment in agricultural projects involves substantial risks. The value of your investment can go down as well as up, and you may not get back the amount invested. Past performance is not a reliable indicator of future results.
                          </p>
                          
                          <h3 className="font-semibold text-base">Project Risks</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Weather events including drought, flood, or extreme temperatures may affect crop yield</li>
                            <li>Pest infestations or crop diseases may reduce harvest quantity or quality</li>
                            <li>Market fluctuations may affect the selling price of agricultural products</li>
                            <li>Operation risks related to farming equipment, labor, or management issues</li>
                          </ul>
                          
                          <h3 className="font-semibold text-base">Farmer Verification</h3>
                          <p>
                            While we thoroughly verify farmers on our platform, we cannot guarantee the success of their agricultural projects. Our verification process includes:
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Identity verification through government-issued ID</li>
                            <li>Land ownership or lease verification</li>
                            <li>Agricultural expertise assessment</li>
                            <li>Credit history check where available</li>
                          </ul>
                          
                          <h3 className="font-semibold text-base">Investment Terms</h3>
                          <p>
                            Your investment represents a loan to the farmer for the specific agricultural project described. Returns are based on the success of the project and are not guaranteed. Investment terms, including duration and expected returns, are specified for each project.
                          </p>
                          
                          <h3 className="font-semibold text-base">Exit Options</h3>
                          <p>
                            These investments are not liquid and have no secondary market. You should be prepared to hold your investment until project completion as specified in the project timeline.
                          </p>
                        </div>
                      </div>
                      
                      <DialogFooter className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">By investing, you accept these terms</span>
                        </div>
                        <DialogClose asChild>
                          <Button>I Understand</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  before investing.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpertConsultation;
