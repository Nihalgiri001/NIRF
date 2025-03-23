import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnnouncementsCarousel from "@/components/announcements-carousel";
import RankingTabs from "@/components/ranking-tabs";
import RankingTable from "@/components/ranking-table";
import MethodologySummary from "@/components/methodology-summary";
import FileImport from "@/components/file-import";
import FileExport from "@/components/file-export";
import TemplateDownload from "@/components/template-download";
import { RankingWithInstitution } from "@shared/schema";

const years = [2023, 2022, 2021, 2020, 2019];
const institutionTypes = [
  { value: "All", label: "All" },
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
  { value: "Deemed University", label: "Deemed University" },
  { value: "Autonomous", label: "Autonomous" },
  { value: "Central University", label: "Central University" },
  { value: "State University", label: "State University" },
];

const Rankings = () => {
  const [location] = useLocation();
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedCategory, setSelectedCategory] = useState<string>("Engineering");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    year: selectedYear,
    category: "Engineering", // Always use Engineering category
    type: selectedType !== "All" ? selectedType : undefined,
    search: searchTerm || undefined
  });
  
  // Get rankings with applied filters
  const { data: rankings } = useQuery<RankingWithInstitution[]>({
    queryKey: ['/api/rankings', filters],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    setFilters({
      year: selectedYear,
      category: "Engineering", // Always use Engineering category
      type: selectedType !== "All" ? selectedType : undefined,
      search: searchTerm || undefined
    });
  };
  
  const handleImportComplete = () => {
    // Refresh data after import
    applyFilters();
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="flex-grow bg-secondary-light">
      {/* Breadcrumbs */}
      <div className="bg-secondary py-2 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="text-sm text-neutral-500">
            <Link href="/" className="text-primary hover:underline">Home</Link> &gt; 
            <span className="text-neutral-500"> Rankings</span>
          </div>
        </div>
      </div>
      
      <AnnouncementsCarousel />
      
      <main id="main-content" className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-500">NIRF Engineering Rankings {selectedYear}</h1>
          <p className="text-neutral-400 mt-2">View and analyze the latest engineering institution rankings from Andhra Pradesh and Telangana</p>
        </div>
        
        {/* Filters and Actions */}
        <div className="bg-white p-4 rounded shadow-sm mb-6">
          <div className="md:flex items-center justify-between gap-4 mb-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-neutral-500 mb-2">Filter Rankings</h2>
              <div className="flex flex-wrap gap-3">
                {/* Year Filter */}
                <div className="w-full sm:w-auto">
                  <label htmlFor="year" className="block text-sm text-neutral-500 mb-1">Year</label>
                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(parseInt(value))}
                  >
                    <SelectTrigger id="year" className="w-full sm:w-32 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Institution Type Filter */}
                <div className="w-full sm:w-auto">
                  <label htmlFor="type" className="block text-sm text-neutral-500 mb-1">Institution Type</label>
                  <Select
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger id="type" className="w-full sm:w-44 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {institutionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search by institution name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
              <Button type="submit" className="bg-primary text-white">Apply Filters</Button>
            </form>
          </div>
          
          <div className="flex flex-wrap items-center justify-between border-t border-neutral-200 pt-4">
            <div>
              <h3 className="font-semibold text-neutral-500 mb-2">Data Import/Export</h3>
              <div className="flex gap-2 flex-wrap">
                <FileImport onImportComplete={handleImportComplete} />
                <TemplateDownload />
                <FileExport 
                  data={rankings} 
                  category={selectedCategory} 
                  year={selectedYear} 
                />
                <Button 
                  variant="outline" 
                  className="bg-secondary hover:bg-secondary-dark text-neutral-500 px-3 py-1.5 rounded border border-neutral-300 text-sm flex items-center h-auto"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-neutral-400">
                Showing <span className="font-semibold">{rankings?.length || 0}</span> institutions
              </p>
            </div>
          </div>
        </div>
        
        {/* Ranking Tabs */}
        <RankingTabs
          activeCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            // Update filters when tab changes
            setFilters(prev => ({
              ...prev,
              category
            }));
          }}
        />
        
        {/* Rankings Table */}
        <RankingTable
          year={filters.year}
          category={filters.category}
          institutionType={filters.type}
          searchTerm={filters.search}
        />
        
        {/* Methodology Summary */}
        <MethodologySummary />
        
        {/* Legend and Disclaimer */}
        <div className="bg-white rounded shadow-sm p-4 text-sm text-neutral-500">
          <h3 className="font-semibold mb-2">Notes & Disclaimer</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Rankings are based on data submitted by institutions and verified by NIRF.</li>
            <li>TLR: Teaching, Learning & Resources; RPC: Research and Professional Practice; GO: Graduation Outcomes; OI: Outreach and Inclusivity; PR: Perception.</li>
            <li>All scores are normalized to a scale of 100.</li>
            <li>For detailed methodology and parameter weightages, please visit the Methodology section.</li>
          </ul>
          <p className="mt-3">The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched on 29th September 2015. This framework outlines a methodology to rank institutions across the country.</p>
        </div>
      </main>
    </div>
  );
};

export default Rankings;
