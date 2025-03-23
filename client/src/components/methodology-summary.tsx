import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const MethodologySummary = () => {
  return (
    <div className="bg-white rounded shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-neutral-500 mb-4">NIRF Ranking Methodology</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-secondary p-3 rounded border border-neutral-200">
          <div className="font-medium text-primary mb-1 flex items-center">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">TLR</span>
            Teaching, Learning & Resources
          </div>
          <p className="text-sm text-neutral-500">Includes student strength, faculty-student ratio, faculty qualifications, and financial resources.</p>
        </div>
        
        <div className="bg-secondary p-3 rounded border border-neutral-200">
          <div className="font-medium text-primary mb-1 flex items-center">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">RPC</span>
            Research and Professional Practice
          </div>
          <p className="text-sm text-neutral-500">Measures research publications, patents, and quality of publications.</p>
        </div>
        
        <div className="bg-secondary p-3 rounded border border-neutral-200">
          <div className="font-medium text-primary mb-1 flex items-center">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">GO</span>
            Graduation Outcomes
          </div>
          <p className="text-sm text-neutral-500">Evaluates university's ability to provide higher education and placement of students.</p>
        </div>
        
        <div className="bg-secondary p-3 rounded border border-neutral-200">
          <div className="font-medium text-primary mb-1 flex items-center">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">OI</span>
            Outreach and Inclusivity
          </div>
          <p className="text-sm text-neutral-500">Represents geographical and social diversity of students, and outreach activities.</p>
        </div>
        
        <div className="bg-secondary p-3 rounded border border-neutral-200">
          <div className="font-medium text-primary mb-1 flex items-center">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs">PR</span>
            Perception
          </div>
          <p className="text-sm text-neutral-500">Evaluates perceptions of employers, academics, and public about the institution.</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link href="/methodology" className="text-primary hover:underline text-sm font-medium inline-flex items-center">
          View detailed methodology <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default MethodologySummary;
