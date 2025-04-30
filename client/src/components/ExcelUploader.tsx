import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setData(jsonData);
        console.log(jsonData); // Handle the parsed data as needed
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {data.length > 0 && (
        <div>
          <h3>Uploaded Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
return (
  <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">NIRF Score Calculator</h1>
      <ExcelUploader /> {/* Add the ExcelUploader component here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing calculator component code */}
      </div>
  </div>
);
