import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  ArrowRight, 
  Filter, 
  Search, 
  TrendingUp, 
  Leaf, 
  Award, 
  Shield, 
  Info,
  Upload,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Investments = () => {
  const [activeTab, setActiveTab] = useState("invest");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Investment Platform</h1>
            <p className="text-gray-600 mt-2">Invest in sustainable farming or register your farm project for funding</p>
          </div>
          
          <Tabs defaultValue="invest" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="invest">Invest in Farms</TabsTrigger>
              <TabsTrigger value="register">Register Your Farm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invest" className="mt-6">
              <InvestmentDashboard />
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <FarmerRegistration />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Investment Dashboard Component
const InvestmentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('trending');

  // Simulated farm projects data
  const farmProjects = [
    {
      id: 1,
      name: "Organic Rice Project",
      location: "Tamil Nadu",
      image: "https://images.unsplash.com/photo-1618586810102-9ce3483a3189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMGZpZWxkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 200000,
      fundingRaised: 120000,
      returnRate: 12,
      duration: 8,
      riskLevel: "low",
      cropType: "Rice",
      isTrending: true,
      isSocialImpact: true,
      isVerified: true,
      isSecure: true
    },
    {
      id: 2,
      name: "Cotton Farming Initiative",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1599488619759-cf549396e513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdHRvbiUyMGZhcm18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 350000,
      fundingRaised: 150000,
      returnRate: 10,
      duration: 6,
      riskLevel: "moderate",
      cropType: "Cotton",
      isTrending: false,
      isSocialImpact: true,
      isVerified: true,
      isSecure: true
    },
    // ... other farm projects would be here
  ];

  // Filter projects based on search term and filter type
  const filteredProjects = farmProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || project.cropType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Sort projects based on sort selection
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'trending') {
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    } else if (sortBy === 'returnRate') {
      return b.returnRate - a.returnRate;
    } else if (sortBy === 'duration') {
      return a.duration - b.duration;
    } else if (sortBy === 'fundingProgress') {
      return (b.fundingRaised / b.fundingGoal) - (a.fundingRaised / a.fundingGoal);
    }
    return 0;
  });

  // Helper function to get risk color
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invest in Sustainable Farming</h1>
        <p className="text-gray-600 mt-2">Support local farmers, earn competitive returns, and contribute to sustainable agriculture</p>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Other filters */}
        <div>
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Crop Types</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Cotton">Cotton</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Spices">Spices</option>
          </select>
        </div>
        
        <div>
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Locations</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Punjab">Punjab</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Kerala">Kerala</option>
          </select>
        </div>
        
        <div>
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="moderate">Moderate Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
        
        <div>
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="trending">Sort by: Trending</option>
            <option value="returnRate">Sort by: Highest Return</option>
            <option value="duration">Sort by: Shortest Duration</option>
            <option value="fundingProgress">Sort by: Funding Progress</option>
          </select>
        </div>
      </div>
      
      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedProjects.map(project => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow transform hover:-translate-y-1 duration-200">
            <div className="relative h-48">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 p-2 flex space-x-2">
                {project.isTrending && (
                  <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400">
                    🔥 Trending
                  </Badge>
                )}
                {project.isSocialImpact && (
                  <Badge className="bg-emerald-400 text-emerald-900 hover:bg-emerald-400">
                    💚 Social Impact
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.location}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`px-2 py-1 rounded-full text-xs flex items-center ${getRiskColor(project.riskLevel)}`}>
                        <span className="capitalize">{project.riskLevel} Risk</span>
                        <Info className="h-3 w-3 ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        {project.riskLevel === 'low' && 'Low risk investments typically have stable returns with minimal volatility'}
                        {project.riskLevel === 'moderate' && 'Moderate risk investments balance growth potential with some market volatility'}
                        {project.riskLevel === 'high' && 'High risk investments offer greater return potential but with increased volatility'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Funding Progress</span>
                  <span className="font-medium text-green-600">
                    ₹{(project.fundingRaised).toLocaleString()} of ₹{project.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(project.fundingRaised / project.fundingGoal) * 100} 
                  className="h-2 bg-gray-100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-2 rounded-md flex flex-col items-center">
                  <span className="text-xs text-gray-500">Returns</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="font-bold text-blue-700">{project.returnRate}%</span>
                  </div>
                </div>
                <div className="bg-green-50 p-2 rounded-md flex flex-col items-center">
                  <span className="text-xs text-gray-500">Duration</span>
                  <div className="flex items-center">
                    <span className="font-bold text-green-700">{project.duration} months</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  {project.isVerified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <Award className="h-4 w-4 text-blue-600" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Verified Farmer</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {project.isSecure && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-green-600" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Secure Investment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              
              <Link to={`/investment-details/${project.id}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Farmer Registration Component
const FarmerRegistration = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    farmName: '',
    location: '',
    contactPhone: '',
    contactEmail: '',
    
    // Step 2: Farming Operations
    cropType: '',
    cultivationArea: '',
    expectedYield: '',
    farmingPractices: [],
    
    // Step 3: Financial Details
    fundingGoal: '',
    currentInvestments: '',
    costBreakdown: {
      seeds: 0,
      equipment: 0,
      labor: 0,
      other: 0
    },
    expectedReturns: '',
    
    // Step 4: Supporting Documents
    documents: [],
    farmImages: [],
    
    // Step 5: Confirmation
    termsAccepted: false
  });
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission, perhaps with an API call
    alert("Your farm project has been submitted for review. We'll notify you once it's verified and published.");
    // Reset form or redirect as appropriate
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Register Your Farm Project</h2>
        <p className="text-gray-600 mt-2">Complete the registration wizard to list your farm project for funding</p>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${
                i < step ? 'text-green-600' : i === step - 1 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  i < step
                    ? 'bg-green-100 text-green-600 border-2 border-green-600'
                    : i === step - 1
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className="text-xs text-center">
                {i === 0
                  ? 'Basic Info'
                  : i === 1
                  ? 'Farm Details'
                  : i === 2
                  ? 'Financials'
                  : i === 3
                  ? 'Documents'
                  : 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 h-1 bg-green-500 transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Registration Steps */}
      <Card className="mb-8">
        <CardContent className="p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                  <Input
                    type="text"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    placeholder="e.g., Organic Rice Project – Tamil Nadu"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Choose a descriptive name for your farm project</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Chennai, Tamil Nadu"
                      className="pl-10 w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter the location of your farm</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="e.g., +91 9876543210"
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="e.g., farmer@example.com"
                      className="pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Farming Operations & Details */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Farming Operations & Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select crop type</option>
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cultivation Area (acres)</label>
                  <Input
                    type="number"
                    name="cultivationArea"
                    value={formData.cultivationArea}
                    onChange={handleInputChange}
                    placeholder="e.g., 5.5"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Yield</label>
                  <Input
                    type="text"
                    name="expectedYield"
                    value={formData.expectedYield}
                    onChange={handleInputChange}
                    placeholder="e.g., 2000 kg per acre"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Specify expected yield per acre/hectare</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farming Practices</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="organic"
                        name="farmingPractices"
                        value="organic"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="organic" className="ml-2 block text-sm text-gray-700">
                        Organic Farming
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sustainable"
                        name="farmingPractices"
                        value="sustainable"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sustainable" className="ml-2 block text-sm text-gray-700">
                        Sustainable Practices
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="drip"
                        name="farmingPractices"
                        value="drip"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="drip" className="ml-2 block text-sm text-gray-700">
                        Drip Irrigation
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Financial & Funding Details */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Financial & Funding Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Funding Goal (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="number"
                      name="fundingGoal"
                      value={formData.fundingGoal}
                      onChange={handleInputChange}
                      placeholder="e.g., 200000"
                      className="pl-10 w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Total amount needed for your project</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Investments (₹)</label>
                  <Input
                    type="number"
                    name="currentInvestments"
                    value={formData.currentInvestments}
                    onChange={handleInputChange}
                    placeholder="e.g., 50000"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter if you already have some funding</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Cost Breakdown</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Seeds & Inputs (%)</label>
                      <Input
                        type="number"
                        name="seeds"
                        placeholder="e.g., 30"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Equipment (%)</label>
                      <Input
                        type="number"
                        name="equipment"
                        placeholder="e.g., 20"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Labor (%)</label>
                      <Input
                        type="number"
                        name="labor"
                        placeholder="e.g., 40"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Other (%)</label>
                      <Input
                        type="number"
                        name="other"
                        placeholder="e.g., 10"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Total should add up to 100%</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Returns (%)</label>
                  <Input
                    type="number"
                    name="expectedReturns"
                    value={formData.expectedReturns}
                    onChange={handleInputChange}
                    placeholder="e.g., 12"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Annual return percentage for investors</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Supporting Documents & Verification */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Supporting Documents & Verification</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Certifications</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-400 mb-3">Accepted formats: PDF, PNG, JPG (Max 5MB)</p>
                    <Button variant="outline" className="text-sm">
                      Select Files
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload any organic certification, quality certifications, etc.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drop images here or click to upload</p>
                    <p className="text-xs text-gray-400 mb-3">Accepted formats: PNG, JPG (Max 5MB each)</p>
                    <Button variant="outline" className="text-sm">
                      Select Images
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload high-quality images of your farm and crops</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Financial Records (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-400 mb-3">Accepted formats: PDF, XLS (Max 5MB)</p>
                    <Button variant="outline" className="text-sm">
                      Select Files
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload past financial records if available (optional but recommended)</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Verification Process</h4>
                <p className="text-xs text-blue-700">
                  Your project will be reviewed by our team before being listed on the platform. This typically takes 2-3 business days.
                  We may contact you for additional information if needed.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 5: Review & Confirmation */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Review & Confirmation</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Project Summary</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Farm Name</p>
                    <p className="text-sm">{formData.farmName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-sm">{formData.location || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Crop Type</p>
                    <p className="text-sm">{formData.cropType || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cultivation Area</p>
                    <p className="text-sm">{formData.cultivationArea ? `${formData.cultivationArea} acres` : "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Funding Goal</p>
                    <p className="text-sm">{formData.fundingGoal ? `₹${formData.fundingGoal}` : "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expected Returns</p>
                    <p className="text-sm">{formData.expectedReturns ? `${formData.expectedReturns}%` : "Not provided"}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Please review all information for accuracy. You can go back to any previous step to make corrections.
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-green-600 hover:underline">Terms & Conditions</a> and certify that all information provided is accurate
                  </label>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 flex items-center mb-2">
                  <Info className="h-4 w-4 mr-1" />
                  What happens next?
                </h4>
                <ol className="list-decimal list-inside text-xs text-yellow-700 space-y-1">
                  <li>Your project will be submitted for review by our team.</li>
                  <li>Once verified, your project will be listed on the investment dashboard.</li>
                  <li>You'll receive notifications when investors contribute to your project.</li>
                  <li>Funds will be released according to the project milestones.</li>
                </ol>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 1}
              className="text-gray-600"
            >
              Previous Step
            </Button>
            
            {step < totalSteps ? (
              <Button 
                onClick={handleNextStep}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Next Step
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!formData.termsAccepted}
              >
                Submit Project
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;
