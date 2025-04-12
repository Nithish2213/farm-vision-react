
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Filter, 
  Search, 
  TrendingUp, 
  Leaf, 
  Award, 
  Shield, 
  Info 
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

const Investment = () => {
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
    {
      id: 3,
      name: "Sustainable Wheat Farm",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1567954970774-59c8b7d63c34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hlYXQlMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 180000,
      fundingRaised: 162000,
      returnRate: 14,
      duration: 5,
      riskLevel: "low",
      cropType: "Wheat",
      isTrending: true,
      isSocialImpact: false,
      isVerified: true,
      isSecure: true
    },
    {
      id: 4,
      name: "Vegetable Polyhouse Project",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1512466699224-9d8217f4e9e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlJTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 400000,
      fundingRaised: 120000,
      returnRate: 16,
      duration: 4,
      riskLevel: "high",
      cropType: "Vegetables",
      isTrending: false,
      isSocialImpact: true,
      isVerified: true,
      isSecure: true
    },
    {
      id: 5,
      name: "Organic Mango Orchard",
      location: "Andhra Pradesh",
      image: "https://images.unsplash.com/photo-1623584973952-f9b2885e4419?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuZ28lMjB0cmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 500000,
      fundingRaised: 220000,
      returnRate: 15,
      duration: 12,
      riskLevel: "moderate",
      cropType: "Fruits",
      isTrending: true,
      isSocialImpact: true,
      isVerified: true,
      isSecure: true
    },
    {
      id: 6,
      name: "Spice Farming Collective",
      location: "Kerala",
      image: "https://images.unsplash.com/photo-1598566360146-e74de5c98dd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpY2UlMjBmYXJtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      fundingGoal: 250000,
      fundingRaised: 75000,
      returnRate: 18,
      duration: 7,
      riskLevel: "high",
      cropType: "Spices",
      isTrending: false,
      isSocialImpact: true,
      isVerified: false,
      isSecure: true
    }
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <select 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green focus:border-transparent"
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
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green focus:border-transparent"
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
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green focus:border-transparent"
              >
                <option value="All">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            
            <div>
              <select 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-agritech-green focus:border-transparent"
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
                      <span className="font-medium text-agritech-green">
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
                    <Button className="w-full bg-agritech-green hover:bg-agritech-darkGreen">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
