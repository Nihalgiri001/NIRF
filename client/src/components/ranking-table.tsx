import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { RankingWithInstitution } from "@shared/schema";
import { Eye, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ParameterBreakdown from "./parameter-breakdown";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface RankingTableProps {
  year?: number;
  category?: string;
  institutionType?: string;
  searchTerm?: string;
}

const RankingTable = ({ year, category, institutionType, searchTerm }: RankingTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRanking, setSelectedRanking] = useState<RankingWithInstitution | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const itemsPerPage = 10;
  
  const { data: rankings, isLoading, error } = useQuery<RankingWithInstitution[]>({
    queryKey: ['/api/rankings', { year, category, type: institutionType, search: searchTerm }],
  });
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [year, category, institutionType, searchTerm]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const sortedRankings = rankings ? [...rankings].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "institution":
        comparison = a.institution.name.localeCompare(b.institution.name);
        break;
      case "location":
        comparison = `${a.institution.city}, ${a.institution.state}`.localeCompare(`${b.institution.city}, ${b.institution.state}`);
        break;
      case "tlrScore":
        comparison = a.tlrScore - b.tlrScore;
        break;
      case "rpcScore":
        comparison = a.rpcScore - b.rpcScore;
        break;
      case "goScore":
        comparison = a.goScore - b.goScore;
        break;
      case "oiScore":
        comparison = a.oiScore - b.oiScore;
        break;
      case "prScore":
        comparison = a.prScore - b.prScore;
        break;
      case "totalScore":
        comparison = a.totalScore - b.totalScore;
        break;
      default:
        comparison = a.rank - b.rank;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  }) : [];
  
  // Pagination logic
  const totalItems = sortedRankings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRankings = sortedRankings?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`${currentPage === i ? 'bg-primary text-white' : 'bg-white text-neutral-500 hover:bg-secondary'} rounded-none`}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    
    return (
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-l-md bg-white text-neutral-500 hover:bg-secondary"
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-neutral-500 hover:bg-secondary rounded-none"
              onClick={() => goToPage(1)}
            >
              1
            </Button>
            {startPage > 2 && (
              <span className="px-2 text-neutral-500">...</span>
            )}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-neutral-500">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-neutral-500 hover:bg-secondary rounded-none"
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="rounded-r-md bg-white text-neutral-500 hover:bg-secondary"
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary">
                {["Rank", "Institution", "City/State", "TLR", "RPC", "GO", "OI", "PR", "Total Score", "Action"].map((header) => (
                  <TableHead key={header} className="px-4 py-3 text-xs font-medium text-neutral-500 uppercase">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 10 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex} className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded shadow-sm p-6 mb-6 text-center">
        <p className="text-red-500">Error loading rankings data. Please try again later.</p>
      </div>
    );
  }
  
  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline-block h-3 w-3 ml-1 text-neutral-500" />
    ) : (
      <ArrowDown className="inline-block h-3 w-3 ml-1 text-neutral-500" />
    );
  };
  
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead 
                className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                Rank <SortIcon field="rank" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("institution")}
              >
                Institution <SortIcon field="institution" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("location")}
              >
                City/State <SortIcon field="location" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("tlrScore")}
              >
                TLR <span className="block text-[10px] font-normal">(100)</span> <SortIcon field="tlrScore" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("rpcScore")}
              >
                RPC <span className="block text-[10px] font-normal">(100)</span> <SortIcon field="rpcScore" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("goScore")}
              >
                GO <span className="block text-[10px] font-normal">(100)</span> <SortIcon field="goScore" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("oiScore")}
              >
                OI <span className="block text-[10px] font-normal">(100)</span> <SortIcon field="oiScore" />
              </TableHead>
              <TableHead 
                className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("prScore")}
              >
                PR <span className="block text-[10px] font-normal">(100)</span> <SortIcon field="prScore" />
              </TableHead>
              <TableHead 
                className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider cursor-pointer ${
                  sortField === "totalScore" ? "bg-neutral-100 text-primary" : "text-neutral-500 bg-neutral-100"
                }`}
                onClick={() => handleSort("totalScore")}
              >
                Total Score <SortIcon field="totalScore" />
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRankings.length > 0 ? (
              paginatedRankings.map((ranking) => (
                <TableRow key={ranking.id} className="hover:bg-secondary">
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-500">
                    {ranking.rank}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-neutral-500">
                    <div className="font-medium">{ranking.institution.name}</div>
                    <div className="text-xs text-neutral-400">{ranking.institution.city}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                    {`${ranking.institution.city}, ${ranking.institution.state}`}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    {ranking.tlrScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    {ranking.rpcScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    {ranking.goScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    {ranking.oiScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    {ranking.prScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-center bg-neutral-50">
                    <span className="text-primary">{ranking.totalScore.toFixed(2)}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500 text-center">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-neutral-500">
                  No rankings found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {paginatedRankings.length > 0 && (
        <div className="bg-secondary px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-500">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              {renderPagination()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingTable;
