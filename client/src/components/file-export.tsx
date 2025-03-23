import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { utils, writeFile } from "@/lib/excel";
import { RankingWithInstitution } from "@shared/schema";

interface FileExportProps {
  data?: RankingWithInstitution[];
  category: string;
  year: number;
}

const FileExport = ({ data, category, year }: FileExportProps) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast({
        title: "Export failed",
        description: "No data available to export",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Create workbook and worksheet
      const wb = utils.book_new();
      
      // Format data for Excel
      const exportData = data.map((item) => ({
        Rank: item.rank,
        Institution: item.institution.name,
        City: item.institution.city,
        State: item.institution.state,
        Type: item.institution.type,
        TLR: item.tlrScore.toFixed(2),
        RPC: item.rpcScore.toFixed(2),
        GO: item.goScore.toFixed(2),
        OI: item.oiScore.toFixed(2),
        PR: item.prScore.toFixed(2),
        "Total Score": item.totalScore.toFixed(2),
        Year: item.year,
        Category: item.category
      }));
      
      // Create worksheet
      const ws = utils.json_to_sheet(exportData);
      
      // Add worksheet to workbook
      utils.book_append_sheet(wb, ws, "Rankings");
      
      // Generate filename
      const fileName = `NIRF_Rankings_${category}_${year}.xlsx`;
      
      // Save file
      writeFile(wb, fileName);
      
      toast({
        title: "Export successful",
        description: `Rankings exported to ${fileName}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data",
        variant: "destructive",
      });
      console.error("Export error:", error);
    }
  };
  
  return (
    <Button 
      variant="outline"
      className="bg-secondary hover:bg-secondary-dark text-neutral-500 px-3 py-1.5 rounded border border-neutral-300 text-sm flex items-center h-auto"
      onClick={handleExport}
      disabled={!data || data.length === 0}
    >
      <Download className="h-4 w-4 mr-2" />
      Export Excel
    </Button>
  );
};

export default FileExport;
