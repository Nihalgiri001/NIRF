interface RankingTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const RankingTabs = ({ activeCategory, onCategoryChange }: RankingTabsProps) => {
  // Only showing Engineering category as per requirements
  const category = { id: "Engineering", label: "Engineering" };
  
  return (
    <div className="mb-6">
      <div className="border-b border-neutral-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
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
        </ul>
      </div>
    </div>
  );
};

export default RankingTabs;
