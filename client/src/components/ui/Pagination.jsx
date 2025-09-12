// rizz ui
import { Select, Text, ActionIcon } from "rizzui";

// icons
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

const Pagination = ({
  pageSizeOptions,
  selectedPageSize,
  setSelectedPageSize,
  totalPage,
  currentPage,
  setCurrentPage,
}) => {
  const goToPreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToNextPage = () => {
    if (currentPage === totalPage) return;
    setCurrentPage((prev) => prev + 1);
  };
  const goToLastPage = () => {
    setCurrentPage(totalPage);
  };

  return (
    <div className="flex flex-wrap justify-between  p-4 gap-y-3 ">
      <div className="flex items-center gap-3">
        <Text className="text-sm w-[180px]">Rows per page</Text>
        <Select
          selectClassName="w-15"
          optionClassName="!justify-center"
          variant="flat"
          size="sm"
          suffix={<ChevronDown className="size-4" />}
          options={pageSizeOptions}
          value={selectedPageSize}
          onChange={setSelectedPageSize}
        />
      </div>
      <div className="flex items-center gap-2">
        <Text className="text-sm">{`Page ${currentPage} of ${totalPage}`}</Text>
        <div className="space-x-2">
          <ActionIcon
            disabled={currentPage === 1}
            onClick={goToFirstPage}
            size="sm"
            variant="outline"
          >
            <ChevronsLeft className="size-5" />
          </ActionIcon>
          <ActionIcon
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            size="sm"
            variant="outline"
          >
            <ChevronLeft className="size-5" />
          </ActionIcon>
          <ActionIcon
            disabled={currentPage === totalPage}
            onClick={goToNextPage}
            size="sm"
            variant="outline"
          >
            <ChevronRight className="size-5" />
          </ActionIcon>
          <ActionIcon
            disabled={currentPage === totalPage}
            onClick={goToLastPage}
            size="sm"
            variant="outline"
          >
            <ChevronsRight className="size-5" />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
