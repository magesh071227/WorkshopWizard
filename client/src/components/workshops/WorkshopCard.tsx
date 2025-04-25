import { Link } from 'wouter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Workshop } from '@shared/schema';

interface WorkshopCardProps {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy');
  };

  // Convert category string to kebab case for badge variant
  const getCategoryVariant = (category: string) => {
    return category.toLowerCase().replace(' ', '-') as 
      'technology' | 
      'design' | 
      'business' | 
      'marketing' | 
      'personal-development';
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <img 
        src={workshop.imageUrl} 
        alt={workshop.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge variant={getCategoryVariant(workshop.category)}>
            {workshop.category}
          </Badge>
          <span className="text-gray-600 text-sm flex items-center">
            <Clock className="mr-1 h-3 w-3" /> {workshop.startTime} - {workshop.endTime}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{workshop.summary}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={workshop.instructorImageUrl} alt={workshop.instructor} />
              <AvatarFallback>{workshop.instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{workshop.instructor}</span>
          </div>
          <div className="text-sm text-gray-600">{formatDate(workshop.date)}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-600">{workshop.location}</span>
          </div>
          <Link href={`/workshops/${workshop.id}`} className="text-primary hover:underline font-medium">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
