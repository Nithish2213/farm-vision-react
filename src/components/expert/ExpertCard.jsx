
import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExpertCard = ({ expert, onRequestAppointment }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
                onClick={() => onRequestAppointment(expert)}
                disabled={expert.status !== "Available Now"}
              >
                Request Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertCard;
