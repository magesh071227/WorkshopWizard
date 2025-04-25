import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegistrationForm from "@/components/forms/RegistrationForm";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { Workshop } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: workshop, isLoading, error } = useQuery({
    queryKey: [`/api/workshops/${id}`],
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="py-16 bg-gray-50 flex-grow">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="py-16 bg-gray-50 flex-grow">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Workshop Not Found</h2>
              <p className="text-gray-600">
                The workshop you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="py-16 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Workshop Image and Title */}
            <div className="relative h-64 md:h-80">
              <img 
                src={workshop.imageUrl} 
                alt={workshop.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <Badge variant={workshop.category.toLowerCase() as any} className="mb-3">
                  {workshop.category}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{workshop.title}</h1>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              {/* Workshop Details */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="text-gray-500 mr-2 h-5 w-5" />
                  <span>{formatDate(workshop.date.toString())}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-gray-500 mr-2 h-5 w-5" />
                  <span>{workshop.startTime} - {workshop.endTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-gray-500 mr-2 h-5 w-5" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-gray-500 mr-2 h-5 w-5" />
                  <span>{workshop.registrationCount || 0} spots taken, {workshop.capacity - (workshop.registrationCount || 0)} available</span>
                </div>
              </div>
              
              {/* Workshop Description */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About This Workshop</h2>
                <p className="text-gray-700 mb-4">{workshop.description}</p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">What You'll Learn</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {workshop.learningPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {workshop.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              {/* Instructor Info */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Instructor</h2>
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={workshop.instructorImageUrl} alt={workshop.instructor} />
                    <AvatarFallback>{workshop.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{workshop.instructor}</h3>
                    <p className="text-gray-600 text-sm">{workshop.instructorTitle}</p>
                    <p className="text-gray-700 mt-2">{workshop.instructorBio}</p>
                  </div>
                </div>
              </div>
              
              {/* Registration Form */}
              <RegistrationForm 
                workshop={workshop as Workshop} 
                onSuccess={() => setIsModalOpen(true)} 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        workshop={workshop as Workshop} 
      />
      
      <Footer />
    </div>
  );
}
