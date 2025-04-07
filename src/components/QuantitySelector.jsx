
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuantitySelector = ({ 
  value, 
  onChange, 
  min = 1, 
  max,
  className = '' 
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!max || value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      if (newValue < min) {
        onChange(min);
      } else if (max && newValue > max) {
        onChange(max);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md overflow-hidden ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-r border-gray-300"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <input
        type="number"
        className="h-10 w-16 text-center focus:outline-none"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-l border-gray-300"
        onClick={handleIncrement}
        disabled={max && value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
