import { useQuery } from '@tanstack/react-query';
import WorkshopCard from './WorkshopCard';
import WorkshopSearch from './WorkshopSearch';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState } from 'react';
import { Workshop } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

export default function WorkshopGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['/api/workshops'],
  });
  
  const filteredWorkshops = workshops?.filter((workshop: Workshop) => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           workshop.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || workshop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="workshops" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Workshops</h2>
            <p className="text-gray-600">Handpicked workshops to help you grow your skills</p>
          </div>
          
          <WorkshopSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                <Skeleton className="w-full h-48" />
                <div className="p-5 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <div className="flex">
                      <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredWorkshops?.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">No workshops found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops?.map((workshop: Workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            )}
          </>
        )}
        
        <div className="mt-10 text-center">
          <Button variant="outline" asChild className="inline-flex items-center">
            <Link href="#all-workshops">
              View all workshops
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
