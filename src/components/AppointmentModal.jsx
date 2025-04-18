
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Phone, MapPin, Leaf, ClipboardList, Check, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AppointmentModal = ({ expert, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    location: '',
    cropName: '',
    issue: '',
    reason: '',
    sendReminder: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (showSuccess) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Appointment Request Submitted</h2>
            <p className="text-gray-600 mb-6">
              You will be notified once the expert accepts or declines your request.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => {
                  // Add notification logic here
                  toast({
                    title: "Notification Added",
                    description: "Request notification has been added to your dashboard.",
                    duration: 3000,
                  });
                }}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notify Request
              </Button>
              <Button 
                onClick={onClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Go Back to Experts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request an Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter your full name"
                className="pl-10"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter your mobile number"
                className="pl-10"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter your location"
                className="pl-10"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Leaf className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter crop name"
                className="pl-10"
                value={formData.cropName}
                onChange={(e) => handleInputChange('cropName', e.target.value)}
                required
              />
            </div>

            <Select 
              value={formData.issue}
              onValueChange={(value) => handleInputChange('issue', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disease">Crop Disease</SelectItem>
                <SelectItem value="pest">Pest Infestation</SelectItem>
                <SelectItem value="soil">Soil Problems</SelectItem>
                <SelectItem value="irrigation">Irrigation Issues</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Reason for consultation"
                className="pl-10 min-h-[100px]"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="reminder"
                checked={formData.sendReminder}
                onCheckedChange={(checked) => handleInputChange('sendReminder', checked)}
              />
              <label
                htmlFor="reminder"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Send me a reminder via SMS
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
