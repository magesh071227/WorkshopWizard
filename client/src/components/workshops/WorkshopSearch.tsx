import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { CATEGORIES } from '@shared/schema';

interface WorkshopSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function WorkshopSearch({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}: WorkshopSearchProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search workshops..."
          className="w-full md:w-64 pl-10 pr-4 py-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button 
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category} onSelect={(e) => {
                  e.preventDefault();
                  handleCategorySelect(category);
                }}>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategory === category}
                      onCheckedChange={() => handleCategorySelect(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer flex-grow"
                    >
                      {category}
                    </label>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {(searchTerm || selectedCategory) && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearFilters}
            title="Clear all filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
