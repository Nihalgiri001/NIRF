import * as XLSX from "xlsx";

export const parseExcelFile = async (fileName) => {
  try {
    const filePath = `/attached_assets/${fileName}`;
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filePath}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet not found or is empty in file: ${fileName}`);
    }
    const data = XLSX.utils.sheet_to_json(sheet);
    if (data.length === 0) {
      throw new Error(`No data found in the first sheet of file: ${fileName}`);
    }
    return data;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    return null;
  }
};
