
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  AlertCircle, 
  PlayCircle, 
  ChevronRight, 
  Info,
  CreditCard,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InvestmentCard = ({ investment }) => {
  const [investAmount, setInvestAmount] = useState(5000);
  const [showInvestModal, setShowInvestModal] = useState(false);

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

  const fundingPercentage = Math.round((investment.currentFunding / investment.fundingGoal) * 100);
  const expectedReturn = calculateReturn(investAmount, investment.returnRate, investment.duration);

  return (
    <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{investment.name}</h3>
            <p className="text-gray-600 text-sm">{investment.location}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getRiskColor(investment.risk)}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {investment.risk.charAt(0).toUpperCase() + investment.risk.slice(1)} Risk
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">{getRiskDescription(investment.risk)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white mr-3">
            <img 
              src={investment.farmer.image} 
              alt={investment.farmer.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-800">{investment.farmer.name}</p>
              {investment.farmer.verified && (
                <span className="ml-1 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-0.5" /> Verified
                </span>
              )}
            </div>
            <DialogTrigger asChild>
              <button className="text-xs text-purple-700 flex items-center hover:underline mt-0.5">
                <PlayCircle className="h-3 w-3 mr-1" /> Watch farmer's message
              </button>
            </DialogTrigger>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{investment.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>₹{investment.currentFunding.toLocaleString()} raised</span>
            <span>Goal: ₹{investment.fundingGoal.toLocaleString()}</span>
          </div>
          <Progress value={fundingPercentage} className="h-2" />
          <p className="text-xs text-gray-500 mt-1 text-right">{fundingPercentage}% funded</p>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500 mb-1" />
            <span className="font-medium text-lg">{investment.returnRate}%</span>
            <span className="text-xs text-gray-500">Annual Return</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-amber-500 mb-1" />
            <span className="font-medium text-lg">{investment.duration}</span>
            <span className="text-xs text-gray-500">Months Duration</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
            <CreditCard className="h-5 w-5 text-purple-500 mb-1" />
            <span className="font-medium text-lg">₹2,000</span>
            <span className="text-xs text-gray-500">Min Investment</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Simulate your return</h4>
          <div className="flex items-center gap-x-4 mb-3">
            <div className="flex-1">
              <Slider 
                value={[investAmount]} 
                onValueChange={([value]) => setInvestAmount(value)}
                min={2000}
                max={25000}
                step={1000}
                className="flex-1"
              />
            </div>
            <div className="w-20 text-right">
              <span className="font-medium">₹{investAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Your investment:</span>
              <span className="font-medium">₹{investAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Potential return in {investment.duration} months:</span>
              <span className="font-semibold">₹{expectedReturn.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Lock className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Secure payment</span>
          </div>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowInvestModal(true)}
          >
            Invest Now
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        {/* Timeline */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Project Timeline</h4>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Investment</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="text-xs text-gray-600">Seed Stage</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M12 18a6 6 0 0 0 0-12"></path>
                </svg>
              </div>
              <span className="text-xs text-gray-600">Growth</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path>
                </svg>
              </div>
              <span className="text-xs text-gray-600">Harvest</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-gray-200" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-600">Return</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Farmer Video Dialog */}
      <Dialog>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>A Message from {investment.farmer.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                "Your investment helps me grow {investment.name.toLowerCase()} and support local families. 
                I've been farming for 15 years and use sustainable methods that are good for the environment."
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Investment Modal */}
      <Dialog open={showInvestModal} onOpenChange={setShowInvestModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Investment</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-3">Transaction Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Amount:</span>
                  <span className="font-medium">₹{investAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Project:</span>
                  <span className="font-medium">{investment.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-medium">₹{expectedReturn.toLocaleString()} in {investment.duration} months</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">UPI</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-4 border rounded-lg bg-gray-50">
              <div className="text-center">
                <div className="h-24 w-24 mx-auto mb-2 bg-white p-2 rounded-lg border border-gray-200">
                  <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M3 15h18" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500">UPI QR Code will appear here</p>
              </div>
            </div>
            
            <div className="flex items-center text-sm bg-purple-50 p-3 rounded-lg">
              <Lock className="h-4 w-4 text-purple-600 mr-2 flex-shrink-0" />
              <p className="text-purple-700">100% secure payment processed through verified UPI channels</p>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default InvestmentCard;
