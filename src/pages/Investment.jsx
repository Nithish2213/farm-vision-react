import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Shield, 
  Lock, 
  TrendingUp, 
  Droplet, 
  Leaf, 
  Sun, 
  Sprout, 
  Leaf as Seedling, 
  Flower2, 
  Wheat, 
  DollarSign, 
  BarChart4, 
  PieChart, 
  Clock, 
  AlertTriangle, 
  Check, 
  Info, 
  Download, 
  BadgeCheck, 
  CheckCircle
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Investment = () => {
  const navigate = useNavigate();
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [progress, setProgress] = useState(68);

  const calculateReturn = (amount) => {
    return Math.round(amount * (1 + (0.12 * 8/12)));
  };

  const timelineStages = [
    { icon: Seedling, label: 'Investment', active: true },
    { icon: Sprout, label: 'Seed Stage', active: false },
    { icon: Flower2, label: 'Growth', active: false },
    { icon: Wheat, label: 'Harvest', active: false },
    { icon: DollarSign, label: 'Return', active: false },
  ];

  const faqItems = [
    {
      question: 'When do I get my money back?',
      answer: "Returns are distributed after the harvest cycle, typically 8 months from the investment date. You'll receive notifications as your investment progresses through each farming stage."
    },
    {
      question: 'What if the crop fails?',
      answer: 'All farm projects are insured against crop failure. In case of natural disasters or pest damage, your principal investment is protected up to 85% of the original amount.'
    },
    {
      question: 'Is this SEBI approved?',
      answer: 'Our platform operates within the regulatory framework for P2P agricultural investments. While not directly regulated by SEBI, we follow strict compliance measures and transparent accounting practices.'
    },
    {
      question: 'How is my investment used?',
      answer: 'Your investment directly funds seeds, equipment, and labor for the specific farm project you select. A detailed breakdown is provided in the "Where Your Money Goes" section.'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/dashboard" 
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              ← Back to Dashboard
            </Link>
            <div className="flex items-center">
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Funding ends in 14 days
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Organic Rice Farming Investment</h1>
            <p className="text-gray-600">Fund sustainable agriculture and earn competitive returns</p>
          </div>
          
          <Card className="mb-8 overflow-hidden border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <span>📊 Project Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Farmer Rajesh" 
                        className="w-12 h-12 rounded-full mr-3 border-2 border-green-500"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">Farmer Rajesh Kumar</h3>
                          <BadgeCheck className="w-4 h-4 ml-1 text-green-600 fill-green-600" />
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center mr-2">
                            <BadgeCheck className="w-3 h-3 mr-1" /> Verified
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">(48 reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic border-l-2 border-gray-200 pl-4 my-4">
                      "Your investment helps me grow organic food and support 5 workers from my village. Together, we're building sustainable livelihoods."
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="font-medium text-gray-700">Project funding</span>
                        <span className="text-green-700">₹{progress * 1000} of ₹100,000</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Location</div>
                        <div className="font-medium">Panipat, Haryana</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Farm Size</div>
                        <div className="font-medium">5 Acres</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Crop Type</div>
                        <div className="font-medium">Organic Rice</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-medium">8 Months</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Risk Assessment</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded flex items-center cursor-help">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Low Risk
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">Risk is calculated based on crop type, region history, and weather volatility. This project has historically low risk factors.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Weather Volatility</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Crop Failure History</span>
                          <span>8%</span>
                        </div>
                        <Progress value={8} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Market Price Fluctuation</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 mb-3">Project Timeline</h3>
                    <div className="relative flex justify-between">
                      {timelineStages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            stage.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <stage.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs mt-1">{stage.label}</span>
                        </div>
                      ))}
                      <div className="absolute top-5 w-full h-0.5 bg-gray-200 -z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8 overflow-hidden border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <span>📈 Your Investment Potential</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Return Simulation</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      If you invest:
                    </label>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">₹1,000</span>
                        <span className="text-3xl font-bold text-gray-800">₹{investmentAmount.toLocaleString()}</span>
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
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-blue-700">₹{calculateReturn(investmentAmount).toLocaleString()}</span>
                        <span className="ml-2 text-sm text-gray-600">over 8 months</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Estimated annual return: 12%
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3 h-3 inline ml-1 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">Return is calculated based on historical crop yields, current market prices, and operational efficiency.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-3">Projected Returns Over Time</h3>
                  <div className="h-40 bg-white rounded-lg border p-4 flex items-end">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((month) => (
                      <div key={month} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-green-200 rounded-t"
                          style={{
                            height: `${month * 10}px`,
                            backgroundColor: `rgba(16, 185, 129, ${month * 0.1})`
                          }}
                        ></div>
                        <div className="text-xs mt-1">{month}m</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Where Your Money Goes</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Seeds & Farming Inputs</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Labor & Operations</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Equipment & Tech</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Insurance & Risk Mitigation</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                    <Download className="w-5 h-5 text-gray-500 mb-2" />
                    <h4 className="font-medium text-gray-800 mb-1">Past Performance Reports</h4>
                    <p className="text-xs text-gray-600 mb-2">View detailed reports from previous investment cycles</p>
                    <Button variant="outline" size="sm" className="text-xs mt-1">
                      Download Last Audit Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about agricultural investments</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50">
                          {item.question}
                          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p className="text-sm text-gray-600">{item.answer}</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8 overflow-hidden shadow-sm hover:shadow-md transition-shadow border-green-200 bg-gradient-to-b from-white to-green-50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Ready to Invest in Sustainable Farming?</h3>
                  <p className="text-gray-600 mb-4">Your investment directly supports farmers and sustainable agricultural practices while earning competitive returns.</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <Shield className="w-3 h-3 text-gray-500" />
                      <span>Verified by AgriTech</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <img src="https://logodownload.org/wp-content/uploads/2017/05/google-pay-gpay-logo-1-1.png" alt="Google Pay" className="h-3" />
                      <span>Secured by GPay</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <BadgeCheck className="w-3 h-3 text-green-500" />
                      <span>PAN Verified</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border text-xs">
                      <BadgeCheck className="w-3 h-3 text-green-500" />
                      <span>Aadhar Verified</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="text-sm text-green-700 underline cursor-pointer">Read Before You Invest</span>
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
                      <DialogFooter className="flex items-center gap-2">
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={isTermsAccepted} 
                            onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm">I understand and accept the terms</span>
                        </label>
                        <Button variant="outline">Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="bg-white p-5 rounded-lg border shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-4">Complete Your Investment</h4>
                  
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Investment:</span>
                      <span className="font-medium">₹{investmentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Project:</span>
                      <span className="font-medium">Organic Rice - Haryana</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Expected Return:</span>
                      <span className="font-medium">₹{calculateReturn(investmentAmount).toLocaleString()} in 8 months</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                    disabled={!isTermsAccepted}
                  >
                    <Lock className="w-4 h-4" />
                    Invest Securely
                  </Button>
                  
                  <div className="mt-3 text-xs text-center text-gray-500 flex items-center justify-center">
                    <Lock className="w-3 h-3 mr-1" />
                    100% secure UPI payment via GPay
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3 h-3 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">No card or wallet info stored on our servers.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="bg-gray-100 rounded p-2 inline-flex space-x-3">
                      <img src="https://logodownload.org/wp-content/uploads/2017/05/google-pay-gpay-logo-1-1.png" alt="Google Pay" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Paytm_Logo.png" alt="Paytm" className="h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Investment;
