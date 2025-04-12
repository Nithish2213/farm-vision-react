
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart4, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  Download,
  History,
  Bell 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

// Mock data for the investments
const myInvestments = [
  {
    id: 1,
    name: "Organic Rice Project",
    location: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1618586810102-9ce3483a3189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMGZpZWxkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    investedAmount: 15000,
    expectedReturn: 16800,
    returnRate: 12,
    duration: 8,
    progress: 45,
    timeRemaining: "4 months",
    currentStage: "Growth",
    nextPayout: "October 15, 2023",
    status: "active",
    updates: [
      { date: "April 10, 2023", message: "Investment confirmed", type: "success" },
      { date: "May 5, 2023", message: "Seeding completed successfully", type: "success" },
      { date: "June 15, 2023", message: "Growth phase started, all crops showing healthy development", type: "success" },
      { date: "July 2, 2023", message: "Slight pest issues detected, preventive measures applied", type: "warning" }
    ]
  },
  {
    id: 2,
    name: "Cotton Farming Initiative",
    location: "Gujarat",
    image: "https://images.unsplash.com/photo-1599488619759-cf549396e513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdHRvbiUyMGZhcm18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    investedAmount: 10000,
    expectedReturn: 11000,
    returnRate: 10,
    duration: 6,
    progress: 80,
    timeRemaining: "1 month",
    currentStage: "Pre-Harvest",
    nextPayout: "August 30, 2023",
    status: "active",
    updates: [
      { date: "March 1, 2023", message: "Investment confirmed", type: "success" },
      { date: "March 15, 2023", message: "Seeding completed successfully", type: "success" },
      { date: "April 20, 2023", message: "Growth phase showing excellent progress", type: "success" },
      { date: "June 10, 2023", message: "Pre-harvest preparations underway", type: "success" },
      { date: "July 1, 2023", message: "Harvest scheduled for August 15", type: "info" }
    ]
  },
  {
    id: 3,
    name: "Sustainable Wheat Farm",
    location: "Punjab",
    image: "https://images.unsplash.com/photo-1567954970774-59c8b7d63c34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hlYXQlMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    investedAmount: 20000,
    expectedReturn: 22800,
    returnRate: 14,
    duration: 5,
    progress: 100,
    timeRemaining: "Completed",
    currentStage: "Completed",
    nextPayout: "Available Now",
    status: "completed",
    updates: [
      { date: "January 5, 2023", message: "Investment confirmed", type: "success" },
      { date: "January 20, 2023", message: "Seeding completed successfully", type: "success" },
      { date: "February 25, 2023", message: "Growth phase proceeding well despite cold weather", type: "success" },
      { date: "April 10, 2023", message: "Harvest completed with better than expected yield", type: "success" },
      { date: "May 15, 2023", message: "Final return calculated: 14.2% (₹22,840)", type: "success" },
      { date: "June 1, 2023", message: "Funds ready for withdrawal", type: "success" }
    ]
  }
];

const InvestmentTracking = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Get investments based on active tab
  const getFilteredInvestments = () => {
    if (activeTab === "all") return myInvestments;
    return myInvestments.filter(inv => inv.status === activeTab);
  };
  
  // Calculate total stats
  const totalInvested = myInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalExpectedReturn = myInvestments.reduce((sum, inv) => sum + inv.expectedReturn, 0);
  const availableWithdrawals = myInvestments
    .filter(inv => inv.status === "completed")
    .reduce((sum, inv) => sum + inv.expectedReturn, 0);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <Link 
              to="/investment" 
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Investment Dashboard
            </Link>
            <Button 
              onClick={() => {}} 
              variant="outline" 
              className="text-agritech-green border-agritech-green"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Investment Report
            </Button>
          </div>
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Investment Portfolio</h1>
            <p className="text-gray-600 mt-1">Track your farm investments and manage your returns</p>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-800">₹{totalInvested.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <BarChart4 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Expected Returns</p>
                    <p className="text-2xl font-bold text-blue-600">₹{totalExpectedReturn.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">{((totalExpectedReturn/totalInvested - 1) * 100).toFixed(1)}%</span>
                  <span className="ml-1">overall return</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Available for Withdrawal</p>
                    <p className="text-2xl font-bold text-green-600">₹{availableWithdrawals.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <Bell className="h-6 w-6" />
                  </div>
                </div>
                {availableWithdrawals > 0 && (
                  <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white">
                    Withdraw Earnings
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Investments List with Tabs */}
          <Card className="mb-8 overflow-hidden shadow-sm">
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
              <CardDescription>Track progress and performance of your farm investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Investments</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="space-y-6">
                  {getFilteredInvestments().map(investment => (
                    <div key={investment.id} className="bg-white rounded-lg border overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-4">
                        {/* Project Image and Basic Info */}
                        <div className="relative h-full">
                          <img 
                            src={investment.image} 
                            alt={investment.name} 
                            className="w-full h-full object-cover"
                            style={{ maxHeight: '200px' }}
                          />
                          <div className="absolute top-2 left-2">
                            {investment.status === 'completed' ? (
                              <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
                            ) : (
                              <Badge className="bg-blue-500 hover:bg-blue-600">Active</Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Investment Details */}
                        <div className="p-4 lg:col-span-3">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                              <h3 className="text-lg font-bold text-gray-900">{investment.name}</h3>
                              <p className="text-sm text-gray-600 mb-4">{investment.location}</p>
                              
                              <div className="mb-4">
                                <div className="flex justify-between mb-1 text-sm">
                                  <span className="text-gray-600">Project Progress</span>
                                  <span className="text-gray-700 font-medium">{investment.progress}%</span>
                                </div>
                                <Progress value={investment.progress} className="h-2" />
                              </div>
                              
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                <div>
                                  <div className="text-xs text-gray-500">Invested</div>
                                  <div className="font-semibold">₹{investment.investedAmount.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Expected Return</div>
                                  <div className="font-semibold text-green-600">₹{investment.expectedReturn.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Current Stage</div>
                                  <div className="font-semibold">{investment.currentStage}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Time Remaining</div>
                                  <div className="font-semibold">{investment.timeRemaining}</div>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Updates</h4>
                                <div className="space-y-2">
                                  {investment.updates.slice(-2).map((update, index) => (
                                    <div key={index} className="flex items-start">
                                      <div className={`mt-1 h-3 w-3 rounded-full mr-2 ${
                                        update.type === 'success' ? 'bg-green-500' : 
                                        update.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                                      }`}></div>
                                      <div>
                                        <p className="text-sm">{update.message}</p>
                                        <p className="text-xs text-gray-500">{update.date}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t lg:border-t-0 lg:border-l p-4 flex flex-col">
                              <div className="mb-auto">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Payout</h4>
                                <div className="flex items-center mb-4">
                                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className={investment.status === 'completed' ? 'text-green-600 font-medium' : ''}>
                                    {investment.nextPayout}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-2 mt-4">
                                <Button 
                                  className="w-full"
                                  variant="outline"
                                >
                                  View Details
                                </Button>
                                
                                {investment.status === 'completed' && (
                                  <Button 
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    Withdraw Earnings
                                  </Button>
                                )}
                                
                                <Button 
                                  className="w-full"
                                  variant="ghost"
                                >
                                  <History className="h-4 w-4 mr-2" />
                                  View All Updates
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Performance Chart Section */}
          <Card className="mb-8 overflow-hidden shadow-sm">
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
              <CardDescription>Track how your investments are growing over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Performance chart will be displayed here</p>
                {/* In a real app, you would integrate a charting library like recharts here */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTracking;
