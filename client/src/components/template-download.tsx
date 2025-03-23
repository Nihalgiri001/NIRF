import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { utils, writeFile } from "@/lib/excel";

const TemplateDownload = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    try {
      // Create workbook and worksheet
      const wb = utils.book_new();
      
      // Create a template with all required columns
      const templateData = [{
        // Required fields
        Institution: "Example University",
        City: "Hyderabad",
        State: "Telangana",
        Type: "Public",
        Year: "2023",
        Category: "Engineering",
        Rank: "1",
        
        // TLR breakdown fields
        SS: "18.50",
        FSR: "30.00",
        FQE: "17.29",
        FRU: "30.00",
        
        // RPC breakdown fields
        PU: "34.95",
        QP: "34.37",
        IPR: "14.00",
        FPPP: "9.78",
        
        // GO breakdown fields
        GPH: "29.74",
        GUE: "15.00",
        MS: "19.34",
        GPHD: "16.98",
        
        // OI breakdown fields
        RD: "21.57",
        WD: "14.88",
        ESCS: "9.49",
        PCS: "20.00",
        
        // Main score fields
        TLR: "84.23",
        RPC: "75.67",
        GO: "76.45",
        OI: "70.23",
        PR: "79.87",
        "Total Score": "78.34"
      }];
      
      // Create worksheet with the template data
      const ws = utils.json_to_sheet(templateData);
      
      // Add column headers with descriptions
      const headerComment = {
        Institution: "Full name of the institution",
        City: "City where the institution is located",
        State: "State where the institution is located",
        Type: "e.g., Public, Private, Deemed University, etc.",
        Year: "Assessment year",
        Category: "e.g., Engineering, Management, etc.",
        Rank: "Rank of the institution",
        
        // TLR breakdown fields
        SS: "Student Strength",
        FSR: "Faculty-Student Ratio",
        FQE: "Faculty Qualification & Experience",
        FRU: "Faculty Recruitment & Utilization",
        
        // RPC breakdown fields
        PU: "Publications",
        QP: "Quality of Publications",
        IPR: "IPR and Patents",
        FPPP: "Footprint of Projects & Professional Practice",
        
        // GO breakdown fields
        GPH: "Graduation Performance in Higher Studies",
        GUE: "University Examinations",
        MS: "Median Salary",
        GPHD: "Graduating Students in PhD",
        
        // OI breakdown fields
        RD: "Regional Diversity",
        WD: "Women Diversity",
        ESCS: "Economically & Socially Challenged Students",
        PCS: "Facilities for Physically Challenged Students",
        
        // Main score fields
        TLR: "Teaching, Learning & Resources Total Score",
        RPC: "Research and Professional Practice Total Score",
        GO: "Graduation Outcomes Total Score",
        OI: "Outreach and Inclusivity Total Score",
        PR: "Perception Total Score",
        "Total Score": "Overall Total Score"
      };
      
      // Add worksheet to workbook
      utils.book_append_sheet(wb, ws, "Template");
      
      // Create a second worksheet with instructions
      const instructionsData = [
        {Instructions: "Instructions for filling the Excel template:"},
        {Instructions: "1. Keep all column headers exactly as they are."},
        {Instructions: "2. Fill in data for all required fields (Institution, City, State, Type, Year, Category, Rank, TLR, RPC, GO, OI, PR, Total Score)."},
        {Instructions: "3. Fill in detailed parameter scores if available (SS, FSR, FQE, etc.). These are optional but recommended."},
        {Instructions: "4. Use numerical values for all score fields."},
        {Instructions: "5. Save your file as .xlsx format before uploading."}
      ];
      
      const wsInstructions = utils.json_to_sheet(instructionsData);
      utils.book_append_sheet(wb, wsInstructions, "Instructions");
      
      // Generate filename
      const fileName = `NIRF_Rankings_Template.xlsx`;
      
      // Save file
      writeFile(wb, fileName);
      
      toast({
        title: "Template downloaded",
        description: `Template file saved as ${fileName}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download template",
        variant: "destructive",
      });
      console.error("Template download error:", error);
    }
  };
  
  return (
    <Button 
      variant="outline"
      className="bg-secondary hover:bg-secondary-dark text-neutral-500 px-3 py-1.5 rounded border border-neutral-300 text-sm flex items-center h-auto"
      onClick={handleDownload}
    >
      <FileDown className="h-4 w-4 mr-2" />
      Download Template
    </Button>
  );
};

export default TemplateDownload;