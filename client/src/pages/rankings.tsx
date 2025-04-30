import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Rankings = () => {
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('Top 100');
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Load the Excel file and extract sheet names and data
    const fetchExcelData = async () => {
      const response = await fetch('/attached_assets/college_categories.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      setSheetNames(workbook.SheetNames);

      // Load the default sheet ("Top 100")
      const defaultSheet = workbook.Sheets['Top 100'];
      if (defaultSheet) {
        const data = XLSX.utils.sheet_to_json(defaultSheet);
        setSheetData(data);
      }
    };

    fetchExcelData();
  }, []);

  const handleSheetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sheetName = event.target.value;
    setSelectedSheet(sheetName);

    // Fetch data for the selected sheet
    const fetchSheetData = async () => {
      const response = await fetch('/attached_assets/college_categories.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const sheet = workbook.Sheets[sheetName];
      if (sheet) {
        const data = XLSX.utils.sheet_to_json(sheet);
        setSheetData(data);
      }
    };

    fetchSheetData();
  };

  const filteredData = sheetData.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Rankings</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <label htmlFor="sheet-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Category:</label>
          <select
            id="sheet-select"
            value={selectedSheet}
            onChange={handleSheetChange}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            {sheetNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-bar" style={{ fontWeight: 'bold', marginRight: '10px' }}>Search:</label>
          <input
            id="search-bar"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
      </div>

      {/* Table to display sheet data */}
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            {filteredData.length > 0 && Object.keys(filteredData[0]).map((key) => (
              <th key={key} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;