import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function RankingsFilter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedParameter, setSelectedParameter] = useState("");

  useEffect(() => {
    // Removed fetch calls for categories and parameters
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <Label>Filter by Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            onFilterChange({ category: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {/*  Placeholder -  Categories would be fetched and rendered here if needed */}
            <SelectItem value="all">All Categories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Filter by Parameter</Label>
        <Select
          value={selectedParameter}
          onValueChange={(value) => {
            setSelectedParameter(value);
            onFilterChange({ parameter: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Parameter" />
          </SelectTrigger>
          <SelectContent>
            {/* Placeholder - Parameters would be fetched and rendered here if needed */}
            <SelectItem value="all">All Parameters</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default RankingsFilter;
