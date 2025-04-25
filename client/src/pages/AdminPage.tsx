import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WorkshopTable from "@/components/admin/WorkshopTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section id="admin" className="py-16 bg-gray-100 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-2xl font-bold">Workshop Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Workshop
              </Button>
            </div>
            
            <WorkshopTable />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
