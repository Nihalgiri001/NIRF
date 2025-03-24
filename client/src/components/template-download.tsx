import { Button } from "./ui/button";
import { utils, writeFile } from "@/lib/excel";
import { Download } from "lucide-react";

const TemplateDownload = () => {
  const handleDownload = () => {
    // Create a new workbook
    const wb = utils.book_new();
    
    // Create template data with all required fields
    const templateData = [
      // Headers row
      [
        "Institution Name",
        "State",
        "Institution Type",
        "Established Year",
        "Category",
        "Year",
        
        // Faculty data
        "Faculty Count",
        "Faculty with PhD",
        "Average Faculty Experience (years)",
        "Sanctioned Faculty Positions",
        
        // Student data
        "Total Students",
        "Female Students",
        "SC/ST Students",
        "Economically Backward Students",
        "Physically Handicapped Students",
        "PhD Students",
        
        // Geographic diversity
        "Students From Other States",
        "Students From Abroad",
        
        // Research & Publications
        "Research Publications",
        "Citations Count",
        "Patents Filed",
        "Patents Granted",
        "Sponsored Research Funding (Lakhs)",
        "Consultancy Earnings (Lakhs)",
        
        // Placement & Higher Studies
        "Graduates in Higher Studies",
        "Graduates Placed",
        "Median Salary (Lakhs)",
        
        // Graduation metrics
        "Total Graduates",
        "Graduates in Stipulated Time",
        
        // Perception score
        "Peer Perception Score",
        
        // Optional: Direct parameter scores if already calculated
        "SS Score",
        "FSR Score",
        "FQE Score",
        "FRU Score",
        "TLR Score",
        "PU Score",
        "QP Score",
        "IPR Score",
        "FPPP Score",
        "RPC Score",
        "GPH Score",
        "GUE Score",
        "MS Score",
        "GPHD Score",
        "GO Score",
        "RD Score",
        "WD Score",
        "ESCS Score",
        "PCS Score",
        "OI Score",
        "PR Score",
        "Total Score"
      ],
      // Example row with sample data
      [
        "Indian Institute of Technology Hyderabad",
        "Telangana",
        "Public",
        2008,
        "Engineering",
        2023,
        
        // Faculty data
        150,
        135,
        12,
        170,
        
        // Student data
        3500,
        1050,
        525,
        700,
        35,
        450,
        
        // Geographic diversity
        1400,
        70,
        
        // Research & Publications
        450,
        3600,
        60,
        24,
        1200,
        350,
        
        // Placement & Higher Studies
        120,
        430,
        12,
        
        // Graduation metrics
        600,
        570,
        
        // Perception score
        85,
        
        // Optional parameter scores (can be left blank for calculation)
        18.5,
        30,
        19.2,
        26.5,
        94.2,
        32.1,
        36.4,
        12.8,
        9.5,
        90.8,
        38,
        13.5,
        22.5,
        15,
        89,
        24,
        18,
        18,
        15,
        75,
        85,
        87.8
      ],
      // Empty row for user to fill in
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    ];
    
    // Create a worksheet
    const ws = utils.aoa_to_sheet(templateData);
    
    // Set column widths
    const colWidths = [
      { wch: 40 }, // Institution Name
      { wch: 15 }, // State
      { wch: 15 }, // Institution Type
      { wch: 15 }, // Established Year
      { wch: 15 }, // Category
      { wch: 10 }, // Year
      { wch: 15 }, // Faculty Count
      { wch: 15 }, // Faculty with PhD
      { wch: 25 }, // Average Faculty Experience
      { wch: 25 }, // Sanctioned Faculty Positions
      { wch: 15 }, // Total Students
      { wch: 15 }, // Female Students
      { wch: 15 }, // SC/ST Students
      { wch: 25 }, // Economically Backward Students
      { wch: 25 }, // Physically Handicapped Students
      { wch: 15 }, // PhD Students
      { wch: 25 }, // Students From Other States
      { wch: 20 }, // Students From Abroad
      { wch: 20 }, // Research Publications
      { wch: 15 }, // Citations Count
      { wch: 15 }, // Patents Filed
      { wch: 15 }, // Patents Granted
      { wch: 30 }, // Sponsored Research Funding
      { wch: 25 }, // Consultancy Earnings
      { wch: 25 }, // Graduates in Higher Studies
      { wch: 15 }, // Graduates Placed
      { wch: 20 }, // Median Salary
      { wch: 15 }, // Total Graduates
      { wch: 25 }, // Graduates in Stipulated Time
      { wch: 20 }, // Peer Perception Score
      { wch: 10 }, // SS Score
      { wch: 10 }, // FSR Score
      { wch: 10 }, // FQE Score
      { wch: 10 }, // FRU Score
      { wch: 10 }, // TLR Score
      { wch: 10 }, // PU Score
      { wch: 10 }, // QP Score
      { wch: 10 }, // IPR Score
      { wch: 10 }, // FPPP Score
      { wch: 10 }, // RPC Score
      { wch: 10 }, // GPH Score
      { wch: 10 }, // GUE Score
      { wch: 10 }, // MS Score
      { wch: 10 }, // GPHD Score
      { wch: 10 }, // GO Score
      { wch: 10 }, // RD Score
      { wch: 10 }, // WD Score
      { wch: 10 }, // ESCS Score
      { wch: 10 }, // PCS Score
      { wch: 10 }, // OI Score
      { wch: 10 }, // PR Score
      { wch: 10 }, // Total Score
    ];
    
    // Apply column widths
    ws['!cols'] = colWidths;
    
    // Add notes/explanations in a separate worksheet
    const notesData = [
      ["NIRF Ranking Parameters - Explanation"],
      [""],
      ["Parameter", "Code", "Description", "Max Score"],
      ["Teaching, Learning & Resources", "TLR", "Measures the institute's core educational resources", "100"],
      ["Student Strength", "SS", "Total students including weighted PhD enrollments", "20"],
      ["Faculty-Student Ratio", "FSR", "Ratio of faculty to students, optimal ratio is <= 15:1", "30"],
      ["Faculty Qualification & Experience", "FQE", "Quality of faculty based on qualifications and experience", "20"],
      ["Faculty Recruitment & Utilization", "FRU", "Percentage of faculty positions filled", "30"],
      [""],
      ["Research and Professional Practice", "RPC", "Measures research output and professional contributions", "100"],
      ["Publications", "PU", "Research publications per faculty", "35"],
      ["Quality of Publications", "QP", "Citations per paper and other quality metrics", "40"],
      ["IPR and Patents", "IPR", "Patents filed and granted per faculty", "15"],
      ["Footprint of Projects", "FPPP", "Sponsored research and consultancy earnings", "10"],
      [""],
      ["Graduation Outcomes", "GO", "Measures the outcomes and success of graduates", "100"],
      ["Graduation Performance", "GPH", "Students graduating in stipulated time", "40"],
      ["University Examinations", "GUE", "Performance in university exams", "15"],
      ["Median Salary", "MS", "Median salary of graduates", "25"],
      ["Graduating Students in PhD", "GPHD", "PhD graduates as percentage of total graduates", "20"],
      [""],
      ["Outreach and Inclusivity", "OI", "Measures diversity and inclusivity efforts", "100"],
      ["Regional Diversity", "RD", "Students from other states and countries", "30"],
      ["Women Diversity", "WD", "Women students as percentage of total", "30"],
      ["Economically & Socially Challenged Students", "ESCS", "SC/ST and economically backward students", "20"],
      ["Facilities for Physically Challenged Students", "PCS", "Physically handicapped students and facilities", "20"],
      [""],
      ["Perception", "PR", "Perception of institute among peers, employers, etc.", "100"],
      [""],
      ["Notes:"],
      ["1. All data should be for the specified academic year"],
      ["2. You can either provide raw data and let the system calculate scores, or input pre-calculated scores directly"],
      ["3. For field-specific guidance, refer to the NIRF methodology document"],
      ["4. Ensure all numeric data is accurate - the quality of rankings depends on data integrity"]
    ];
    
    const notesWs = utils.aoa_to_sheet(notesData);
    
    // Set column widths for notes
    const notesColWidths = [
      { wch: 45 },
      { wch: 10 },
      { wch: 70 },
      { wch: 10 }
    ];
    
    // Apply column widths
    notesWs['!cols'] = notesColWidths;
    
    // Add the worksheets to the workbook
    utils.book_append_sheet(wb, ws, "Template");
    utils.book_append_sheet(wb, notesWs, "Parameter Explanations");
    
    // Download the workbook
    writeFile(wb, "nirf_ranking_template.xlsx");
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Download Template</h3>
      <p className="text-sm text-gray-600 mb-4">
        Download an Excel template with all required fields for importing NIRF rankings data.
        The template includes sample data and parameter explanations.
      </p>
      <Button onClick={handleDownload} className="w-full flex items-center justify-center">
        <Download className="mr-2 h-4 w-4" />
        Download Template
      </Button>
    </div>
  );
};

export default TemplateDownload;