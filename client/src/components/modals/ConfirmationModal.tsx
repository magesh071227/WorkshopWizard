import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Clock, MapPin } from "lucide-react";
import { Workshop } from "@shared/schema";
import { format } from "date-fns";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop;
}

export default function ConfirmationModal({ isOpen, onClose, workshop }: ConfirmationModalProps) {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };

  const handleAddToCalendar = () => {
    // In a real app, this would generate a calendar file or link
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
            <Check className="h-6 w-6" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl">Registration Successful!</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Thank you for registering for the workshop.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="bg-gray-50 rounded p-4 mb-6">
          <h4 className="font-medium mb-2">{workshop.title}</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <span>{formatDate(workshop.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span>{workshop.startTime} - {workshop.endTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span>{workshop.location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          We've sent a confirmation email with all the details to your email address. You will receive the workshop link closer to the date.
        </p>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleAddToCalendar}>
            Add to Calendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
