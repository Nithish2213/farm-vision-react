
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchFilters = ({ searchTerm, setSearchTerm, cropType, setCropType, soilType, setSoilType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by expert name or specialty..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select value={cropType} onValueChange={setCropType}>
        <SelectTrigger>
          <SelectValue placeholder="Select Crop Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rice">Rice</SelectItem>
          <SelectItem value="wheat">Wheat</SelectItem>
          <SelectItem value="cotton">Cotton</SelectItem>
          <SelectItem value="vegetables">Vegetables</SelectItem>
        </SelectContent>
      </Select>

      <Select value={soilType} onValueChange={setSoilType}>
        <SelectTrigger>
          <SelectValue placeholder="Select Soil Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clay">Clay</SelectItem>
          <SelectItem value="sandy">Sandy</SelectItem>
          <SelectItem value="loamy">Loamy</SelectItem>
          <SelectItem value="silt">Silt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;
