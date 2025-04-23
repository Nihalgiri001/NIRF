import React, { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';

interface ParameterHoverDataProps {
  paramName: string;
  children: React.ReactNode;
}

// Define type for the data we'll get from the API
interface ParameterTableData {
  id: number;
  institutionId: number;
  score: number;
}

const ParameterHoverData = ({ paramName, children }: ParameterHoverDataProps) => {
  // Get parameter data
  const { data, isLoading, error } = useQuery<ParameterTableData[]>({
    queryKey: ['/api/parameter-data', paramName],
    queryFn: () => apiRequest<ParameterTableData[]>(`/api/parameter-data?param=${paramName}`),
  });
  
  // Get institutions data
  const { data: institutions } = useQuery<{ id: number; name: string; state: string }[]>({
    queryKey: ['/api/institutions'],
    queryFn: () => apiRequest('/api/institutions')
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help underline underline-offset-4 decoration-dotted">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 md:w-96">
        <div>
          <h4 className="font-medium mb-2">{paramName} - Top Institutions</h4>
          
          {isLoading && <p className="text-sm text-muted-foreground">Loading data...</p>}
          
          {error && <p className="text-sm text-red-500">Error loading data</p>}
          
          {data && data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead className="text-right">{paramName} Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: ParameterTableData) => {
                  // Find institution name
                  const institution = institutions?.find(i => i.id === item.institutionId);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{institution ? institution.name : `Institution #${item.institutionId}`}</TableCell>
                      <TableCell className="text-right">{item.score.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : !isLoading && !error ? (
            <p className="text-sm text-muted-foreground">No data available</p>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ParameterHoverData;