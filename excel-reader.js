import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
try {
  const workbook = XLSX.readFile('./attached_assets/Copy of nirf_tables(1).xlsx');
  const sheetNames = workbook.SheetNames;
  
  console.log('Sheets in the workbook:', sheetNames);
  
  // Print first 5 rows of each sheet to understand structure
  sheetNames.forEach(sheetName => {
    console.log(`\nSheet: ${sheetName}`);
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Print headers
    if (jsonData.length > 0) {
      console.log('Headers:', jsonData[0]);
    }
    
    // Print first few rows
    for (let i = 1; i < Math.min(5, jsonData.length); i++) {
      console.log(`Row ${i}:`, jsonData[i]);
    }
  });
} catch (error) {
  console.error('Error reading Excel file:', error);
}