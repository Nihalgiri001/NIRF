
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useQuery } from '@tanstack/react-query';
import * as XLSX from 'xlsx';

interface ParameterHoverDataProps {
  paramName: string;
  children: React.ReactNode;
}

const ParameterHoverData = ({ paramName, children }: ParameterHoverDataProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['excel-data', paramName],
    queryFn: async () => {
      try {
        const response = await fetch('/attached_assets/NIRF Rankings.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        
        // Try to find a worksheet matching the parameter name
        if (!workbook.SheetNames.includes(paramName)) {
          return null;
        }
        
        const worksheet = workbook.Sheets[paramName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData;
      } catch (err) {
        console.error('Error reading Excel file:', err);
        return null;
      }
    }
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help underline underline-offset-4 decoration-dotted text-blue-600 font-semibold">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 md:w-96">
        <div>
          <h4 className="font-medium mb-2 text-primary">{paramName} - Data from Excel</h4>
          
          {isLoading && <p className="text-sm text-muted-foreground">Loading data...</p>}
          
          {error && <p className="text-sm text-red-500">Error loading Excel data</p>}
          
          {data && data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(data[0]).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value: any, cellIndex: number) => (
                      <TableCell key={cellIndex}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : !isLoading && !error ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No data available for {paramName}</p>
              <div>
  <p className="text-xs text-muted-foreground mt-1">Please ensure the Excel file has a worksheet named "{paramName}"</p>
  <p className="text-xs text-muted-foreground mt-1">Available worksheets will be logged in console</p>
</div>
            </div>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ParameterHoverData;
