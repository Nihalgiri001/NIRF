import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnnouncementsCarousel from "@/components/announcements-carousel";
import MethodologySummary from "@/components/methodology-summary";

const Home = () => {
  return (
    <div className="flex-grow bg-secondary-light">
      {/* Breadcrumbs */}
      <div className="bg-secondary py-2 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="text-sm text-neutral-500">
            <Link href="/" className="text-primary hover:underline">Home</Link>
          </div>
        </div>
      </div>
      
      <AnnouncementsCarousel />
      
      <main id="main-content" className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded shadow-sm mb-6 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">NIRF Rankings: Andhra Pradesh & Telangana</h1>
            <p className="text-neutral-500 mb-4">
              Explore NIRF rankings specifically for institutions in Andhra Pradesh and Telangana states.
              This application focuses on the performance of educational institutions in these two states
              across various NIRF ranking parameters like Teaching, Learning and Resources, Research and 
              Professional Practice, Graduation Outcomes, Outreach and Inclusivity, and Perception.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Link href="/rankings">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  View Rankings
                </Button>
              </Link>
              <Link href="/methodology">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-light/10">
                  Learn Methodology
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
            <img 
              src="https://www.nirfindia.org/Home/images/nirf-logo.png" 
              alt="NIRF Logo" 
              className="h-32 md:h-44"
            />
          </div>
        </div>
        
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded shadow-sm border-t-4 border-primary">
            <h2 className="text-lg font-bold text-primary mb-2">AP & Telangana Focus</h2>
            <p className="text-neutral-500 mb-4">Exclusive focus on institutions from Andhra Pradesh and Telangana, allowing for targeted regional analysis and comparisons.</p>
            <Link href="/rankings" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
              Browse Rankings <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white p-5 rounded shadow-sm border-t-4 border-amber-500">
            <h2 className="text-lg font-bold text-primary mb-2">Multi-Category Analysis</h2>
            <p className="text-neutral-500 mb-4">Compare institutions across different categories including Overall, Engineering, and Management with detailed parameter scores.</p>
            <Link href="/methodology" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
              Understanding Scores <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white p-5 rounded shadow-sm border-t-4 border-emerald-500">
            <h2 className="text-lg font-bold text-primary mb-2">Data Tools</h2>
            <p className="text-neutral-500 mb-4">Import regional institution data from Excel files or export the rankings for further analysis and regional education planning.</p>
            <Link href="/rankings" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
              Try Data Tools <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <MethodologySummary />
        
        {/* Note */}
        <div className="bg-white rounded shadow-sm p-4 text-sm text-neutral-500">
          <h3 className="font-semibold mb-2">About This Regional NIRF Portal</h3>
          <p>
            This portal focuses exclusively on NIRF-ranked institutions from Andhra Pradesh and Telangana states.
            The National Institutional Ranking Framework (NIRF) is an initiative by the Ministry of Education, Government of India,
            launched in 2015 to rank institutions nationwide. Our specialized regional view highlights the educational 
            landscape of these two important southern states, allowing for more targeted analysis and comparison.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
