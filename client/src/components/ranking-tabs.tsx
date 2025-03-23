import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RankingTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const RankingTabs = ({ activeCategory, onCategoryChange }: RankingTabsProps) => {
  const [showMore, setShowMore] = useState(false);
  
  const categories = [
    { id: "Overall", label: "Overall" },
    { id: "University", label: "Universities" },
    { id: "Engineering", label: "Engineering" },
    { id: "Management", label: "Management" },
    { id: "Pharmacy", label: "Pharmacy" },
    { id: "Medical", label: "Medical" },
    { id: "Architecture", label: "Architecture" },
    { id: "Law", label: "Law" },
    { id: "Dental", label: "Dental" },
    { id: "Research", label: "Research" }
  ];
  
  const visibleCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);
  
  return (
    <div className="mb-6">
      <div className="border-b border-neutral-200">
        <ul className="flex flex-wrap -mb-px">
          {visibleCategories.map((category) => (
            <li key={category.id} className="mr-2">
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`inline-block py-2 px-4 text-sm font-medium text-center border-b-2 ${
                  activeCategory === category.id
                    ? 'border-primary text-primary'
                    : 'text-neutral-500 hover:text-primary hover:border-neutral-300 border-transparent'
                }`}
              >
                {category.label}
              </button>
            </li>
          ))}
          <li className="mr-2">
            <Popover open={showMore} onOpenChange={setShowMore}>
              <PopoverTrigger asChild>
                <button className="inline-block py-2 px-4 text-sm font-medium text-center text-neutral-500 hover:text-primary hover:border-neutral-300 border-b-2 border-transparent">
                  More <ChevronDown className="inline-block h-4 w-4 ml-1" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ul className="py-2">
                  {moreCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          onCategoryChange(category.id);
                          setShowMore(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          activeCategory === category.id
                            ? 'text-primary bg-neutral-50'
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {category.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RankingTabs;
