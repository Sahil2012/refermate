import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FilterDropdown from "./FilterDropdown";
import RefreshButton from "./RefreshButton";
import SearchBar from "./SearchBar";
import { FilterProps, SearchProps } from "..";

interface TableHeaderProps<T> {
  refresh?: () => void;
  filter?: FilterProps<T>;
  search?: SearchProps;
  header: string;
  description: string;
}

const TableHeader = <T extends string>({
  refresh,
  filter,
  search,
  header,
  description,
}: TableHeaderProps<T>) => {
  return (
    <CardHeader className="border-b border-border/40 px-6 py-6 !pb-4 justify-stretch">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div>
          <CardTitle className="text-xl text-left">{header}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          {refresh && <RefreshButton onClick={refresh} />}
          {filter && <FilterDropdown<T> {...filter} />}
          {search && <SearchBar {...search} />}
        </div>
      </div>
    </CardHeader>
  );
};

export default TableHeader;
