
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Bell, Check, Clock, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Simulated notifications data
const initialNotifications = [
  {
    id: 1,
    farmerName: "John Doe",
    query: "Issues with rice paddy leaves showing brown spots",
    status: "pending",
    expertName: "Dr. Ravi Kumar",
    timestamp: new Date(2025, 3, 18, 14, 30),
  },
  {
    id: 2,
    farmerName: "Maria Garcia",
    query: "Need guidance on organic pest control methods",
    status: "confirmed",
    expertName: "Dr. Sarah Chen",
    timestamp: new Date(2025, 3, 18, 10, 15),
  }
];

const NotificationCard = ({ notification }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <Check className="h-4 w-4" />;
      case 'declined':
        return <X className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{notification.farmerName}</h3>
              <Badge 
                variant="outline" 
                className={`${getStatusColor(notification.status)} border-0`}
              >
                <span className="flex items-center gap-1">
                  {getStatusIcon(notification.status)}
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.query}</p>
            <p className="text-xs text-gray-500">
              Expert: {notification.expertName}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {format(notification.timestamp, 'MMM d, yyyy h:mm a')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev.map(notification => {
        if (notification.status === 'pending') {
          const random = Math.random();
          if (random > 0.8) {
            return { ...notification, status: 'confirmed' };
          } else if (random < 0.2) {
            return { ...notification, status: 'declined' };
          }
        }
        return notification;
      }));
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>
          <p className="text-gray-600">Track your consultation requests and expert responses</p>
        </div>

        <div className="max-w-4xl">
          {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
