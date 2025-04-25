import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WorkshopGrid from "@/components/workshops/WorkshopGrid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover and Join Exciting Workshops</h1>
            <p className="text-xl mb-8 opacity-90">Expand your skills with our free expert-led workshops. Register today!</p>
            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link href="#workshops">Browse Workshops</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Workshops Grid */}
      <WorkshopGrid />
      
      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About WorkshopHub</h2>
            <p className="text-lg text-gray-700 mb-6">
              WorkshopHub is a platform dedicated to connecting people with free, high-quality workshops
              across various domains. Our mission is to make learning accessible to everyone.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're looking to expand your professional skills or explore a new hobby,
              our workshops offer expert guidance from industry professionals.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-8">
              Have questions about our workshops or want to suggest a topic? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <a href="mailto:info@workshophub.com">Send an Email</a>
              </Button>
              <Button asChild>
                <a href="tel:+14155552671">Call Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
