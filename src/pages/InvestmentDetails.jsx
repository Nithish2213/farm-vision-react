import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Award, 
  Info, 
  Download, 
  Lock,
  CheckCircle
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
import { Slider } from '@/components/ui/slider';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll simulate with mock data
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
        isSecure: true,
        farmerName: "Rajesh Kumar",
        farmerImage: "https://randomuser.me/api/portraits/men/32.jpg",
        farmerRating: 4.8,
        reviewCount: 48,
        story: "This organic rice project aims to support traditional farming methods while ensuring sustainable income for farmers. We use natural pest control and water conservation techniques to minimize environmental impact.",
        allocationBreakdown: [
          { category: "Seeds & Farming Inputs", percentage: 40, color: "bg-green-500" },
          { category: "Labor & Operations", percentage: 30, color: "bg-blue-500" },
          { category: "Equipment & Tech", percentage: 20, color: "bg-amber-500" },
          { category: "Insurance & Risk Mitigation", percentage: 10, color: "bg-purple-500" }
        ],
        riskFactors: [
          { factor: "Weather Volatility", risk: 15 },
          { factor: "Crop Failure History", risk: 8 },
          { factor: "Market Price Fluctuation", risk: 20 }
        ],
        documents: [
          { name: "Farm Certification", type: "PDF", size: "2.4 MB" },
          { name: "Past Performance Report", type: "PDF", size: "3.1 MB" },
          { name: "Insurance Certificate", type: "PDF", size: "1.8 MB" }
        ],
        timeline: [
          { stage: "Investment", date: "Current", isActive: true },
          { stage: "Seeding", date: "May 2023", isActive: false },
          { stage: "Growth", date: "July 2023", isActive: false },
          { stage: "Harvest", date: "September 2023", isActive: false },
          { stage: "Returns Distribution", date: "October 2023", isActive: false }
        ]
      },
      // ... (other projects would be here)
    ];

    const selectedProject = farmProjects.find(p => p.id.toString() === id);
    setProject(selectedProject);
    setLoading(false);
  }, [id]);

  // Calculate expected returns (simple calculation for demo purposes)
  const calculateReturn = (amount) => {
    if (!project) return 0;
    // Calculate based on annual return rate prorated for the project duration
    return Math.round(amount * (1 + (project.returnRate/100 * project.duration/12)));
  };

  // Helper function to get risk color
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock payment processing
  const handleInvestment = () => {
    // In a real app, you would process payment through a secure gateway
    // Then redirect to the investment tracking page
    navigate('/investment-tracking');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Project not found</p>
            <Link to="/investment" className="text-agritech-green hover:underline mt-2 inline-block">
              Return to Investment Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center">
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Funding ends in 14 days
              </span>
            </div>
          </div>
          
          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
            <div className="flex items-center mt-2">
              <p className="text-gray-600">{project.location}</p>
              <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
              <div className={`px-2 py-0.5 rounded-full text-xs flex items-center ${getRiskColor(project.riskLevel)}`}>
                <span className="capitalize">{project.riskLevel} Risk</span>
              </div>
            </div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Project Overview & Farmer Details - Left Column */}
            <div className="lg:col-span-2">
              <Card className="mb-6 overflow-hidden shadow-sm">
                <div className="h-64 relative">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 p-3 flex space-x-2">
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
                
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Project Story</h2>
                    <p className="text-gray-600">{project.story}</p>
                  </div>
                  
                  <div className="flex items-start mb-6">
                    <img 
                      src={project.farmerImage} 
                      alt={project.farmerName} 
                      className="w-12 h-12 rounded-full mr-4 border-2 border-green-500"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{project.farmerName}</h3>
                        <CheckCircle className="w-4 h-4 ml-1 text-green-600 fill-green-600" />
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center mr-2">
                          <Award className="w-3 h-3 mr-1" /> Verified
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({project.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Project Timeline</h2>
                    <div className="relative flex justify-between pt-2">
                      {project.timeline.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            stage.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-xs mt-1 whitespace-nowrap">{stage.stage}</span>
                          <span className="text-xs text-gray-500">{stage.date}</span>
                        </div>
                      ))}
                      <div className="absolute top-5 w-full h-0.5 bg-gray-200 -z-10"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Risk Assessment</h2>
                    <div className="space-y-2">
                      {project.riskFactors.map((factor, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{factor.factor}</span>
                            <span>{factor.risk}%</span>
                          </div>
                          <Progress value={factor.risk} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow-sm">
                <CardHeader>
                  <CardTitle>Project Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.documents.map((doc, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                            <Download className="h-5 w-5" />
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">Verified</div>
                        </div>
                        <h4 className="font-medium mb-1">{doc.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{doc.size}</span>
                          <button className="text-agritech-green text-sm flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Investment Calculator & Payment - Right Column */}
            <div>
              <Card className="overflow-hidden shadow-sm sticky top-6">
                <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
                  <CardTitle>Investment Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="font-medium text-gray-700">Project funding</span>
                      <span className="text-green-700">
                        ₹{project.fundingRaised.toLocaleString()} of ₹{project.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(project.fundingRaised / project.fundingGoal) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{Math.round((project.fundingRaised / project.fundingGoal) * 100)}% Funded</span>
                      <span>{Math.round((1 - project.fundingRaised / project.fundingGoal) * 100)}% Remaining</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Investment Allocation</h3>
                    <div className="space-y-3">
                      {project.allocationBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${item.color} mr-2`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.category}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <Progress value={item.percentage} className={`h-2 ${item.color}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Investment Simulator</h3>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      If you invest:
                    </label>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">₹1,000</span>
                        <span className="text-2xl font-bold text-gray-800">₹{investmentAmount.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">₹50,000</span>
                      </div>
                      <Slider
                        defaultValue={[investmentAmount]}
                        min={1000}
                        max={50000}
                        step={500}
                        onValueChange={(value) => setInvestmentAmount(value[0])}
                        className="my-4"
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-700 mb-2">You may earn:</div>
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-2xl font-bold text-blue-700">₹{calculateReturn(investmentAmount).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        in {project.duration} months (Est. {project.returnRate}% annual return)
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        checked={isTermsAccepted} 
                        onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                        className="h-4 w-4 text-agritech-green focus:ring-agritech-green border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the Terms & Conditions
                      </label>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-sm text-agritech-green underline cursor-pointer block mb-4">
                          Read Before You Invest
                        </span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Important Information</DialogTitle>
                          <DialogDescription>
                            Please read these important terms before proceeding
                          </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[300px] overflow-y-auto text-sm text-gray-600 space-y-4 p-1">
                          <p>Agricultural investments involve certain risks, including but not limited to weather conditions, market fluctuations, and operational challenges.</p>
                          <p>While we make every effort to protect your investment through insurance and risk management practices, returns cannot be guaranteed.</p>
                          <p>The projected returns are based on historical data and reasonable expectations, but actual results may vary.</p>
                          <p>Your principal is invested directly in the farm operations and will be returned along with any profits at the end of the crop cycle, typically 8 months.</p>
                          <p>By investing, you agree to our full terms and conditions, which include provisions for dispute resolution and limitations of liability.</p>
                          <p>Investments are not covered by traditional banking insurance programs but are secured through our platform's protection policies.</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsTermsAccepted(true)}>I Understand</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      onClick={handleInvestment}
                      disabled={!isTermsAccepted}
                      className="w-full bg-agritech-green hover:bg-agritech-darkGreen text-white flex items-center justify-center"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Invest Now
                    </Button>
                    
                    <div className="mt-3 text-xs text-center text-gray-500">
                      <Shield className="h-3 w-3 inline mr-1" />
                      Secure payment through verified channels
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <Shield className="w-3 h-3 text-gray-500" />
                      <span>Verified by AgriTech</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <Award className="w-3 h-3 text-blue-500" />
                      <span>Insured Investment</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <Users className="w-3 h-3 text-green-500" />
                      <span>48 Others Invested</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;
