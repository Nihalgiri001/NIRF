import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface FileImportProps {
  onImportComplete: () => void;
}

const FileImport = ({ onImportComplete }: FileImportProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'xlsx' && fileExt !== 'xls') {
      toast({
        title: "Invalid file format",
        description: "Please upload only Excel files (.xlsx or .xls)",
        variant: "destructive",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to import file');
      }

      const data = await response.json();

      toast({
        title: "Import successful",
        description: `Imported ${data.institutionsCount} institutions and ${data.rankingsCount} rankings`,
      });

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/rankings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/institutions'] });

      onImportComplete();
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <label 
      htmlFor="file-upload" 
      className={`cursor-pointer bg-secondary hover:bg-secondary-dark text-neutral-500 px-3 py-1.5 rounded border border-neutral-300 text-sm flex items-center ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      <Upload className="h-4 w-4 mr-2" />
      {isUploading ? "Uploading..." : "Import NIRF Data"}
      <input 
        id="file-upload" 
        type="file" 
        accept=".xlsx,.xls" 
        className="hidden" 
        onChange={handleFileChange}
        disabled={isUploading}
        ref={fileInputRef}
      />
    </label>
  );
};

export default FileImport;