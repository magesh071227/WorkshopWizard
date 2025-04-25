import { useQuery, useMutation } from "@tanstack/react-query";
import { Workshop } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Users, Trash2, Search, Plus } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function WorkshopTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { toast } = useToast();
  
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['/api/workshops'],
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/workshops/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Workshop deleted",
        description: "The workshop has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/workshops'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the workshop. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      deleteMutation.mutate(id);
    }
  };
  
  const filteredWorkshops = workshops?.filter((workshop: Workshop) => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || workshop.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM d, yyyy');
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search workshops..." 
            className="w-full pl-10 pr-4 py-2" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Personal Development">Personal Development</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium">Workshop</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Location</TableHead>
              <TableHead className="font-medium">Registrations</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Loading workshops...
                </TableCell>
              </TableRow>
            ) : filteredWorkshops?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No workshops found
                </TableCell>
              </TableRow>
            ) : (
              filteredWorkshops?.map((workshop: Workshop) => (
                <TableRow key={workshop.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 rounded mr-3">
                        <AvatarImage src={workshop.imageUrl} alt={workshop.title} className="object-cover" />
                        <AvatarFallback>{workshop.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{workshop.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{formatDate(workshop.date)}</TableCell>
                  <TableCell>
                    <Badge variant={workshop.category.toLowerCase() as "technology" | "design" | "business" | "marketing" | "personal-development"}>
                      {workshop.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{workshop.location}</TableCell>
                  <TableCell className="text-gray-600">0/{workshop.capacity}</TableCell>
                  <TableCell>
                    <Badge variant={workshop.status as "upcoming" | "past" | "draft"}>
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="View Registrations">
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete"
                        onClick={() => handleDelete(workshop.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {!isLoading && filteredWorkshops?.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Showing {filteredWorkshops.length} of {workshops.length} workshops
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="primary" size="sm" className="bg-primary text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
