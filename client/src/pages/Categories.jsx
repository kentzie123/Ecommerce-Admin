// React Routing
import { Link } from "react-router-dom";

// Icons
import { Plus, Search, Columns3Cog } from "lucide-react";

// UI
import Table from "../components/ui/Table";
import Searchbar from "../components/ui/Searchbar";
import Pagination from "../components/ui/Pagination";

// rizz ui
import { Button, ActionIcon, Popover, Checkbox, Title } from "rizzui";

// Stores
import { useCategoryStore } from "../store/useCategoryStore";

// Hooks
import { useState, useMemo, useEffect } from "react";

const Categories = () => {
  const { getCategories, categories } = useCategoryStore();
  const [selectedPageSize, setSelectedPageSize] = useState({
    label: "10",
    value: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    getCategories();
  },[])

  const totalPages = useMemo(() => {
    return Math.ceil(categories.length / selectedPageSize?.value);
  }, [categories, selectedPageSize]);

  const start = useMemo(() => {
    // return selectedPageSize.value * currentPage - selectedPageSize.value + 1;
    return (currentPage - 1) * selectedPageSize.value;
  }, [currentPage, selectedPageSize]);

  const end = useMemo(() => {
    // return selectedPageSize.value * currentPage;
    return currentPage * selectedPageSize.value;
  }, [currentPage, selectedPageSize]);

  const slicedCategories = useMemo(() => {
    return categories.slice(start, end);
  }, [start, end, categories]);

  const image =true


  const headers = [
    { label: "", className: "w-[75px]" },
    { label: "Image", className: "w-[100px]" },
    { label: "Category Name", className: "w-[200px]" },
    { label: "Description", className: "w-[250px]" },
    { label: "Slug", className: "w-[200px]" },
    { label: "Products", className: "!text-center" },
    { label: "", className: "w-[150px]" },
  ];

  const pageSizeOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
  ];

  return (
    <div className="bg-base-100 p-6 rounded-lg space-y-5 h-full">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-2xl mb-2">Category List</div>
            <div className="breadcrumbs text-sm font-medium text-base-content/80">
              <ul>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li className="opacity-85">List</li>
              </ul>
            </div>
          </div>
          <div>
            <Link to="/categories/create">
              <Button color="secondary" className="gap-2">
                <Plus className="size-5" />
                <div>Add Category</div>
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="relative w-64 h-fit">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-75 size-4" />
              <Searchbar
                className={"pl-9"}
                type={"search"}
                placeholder={"Search by category name..."}
              />
            </div>
            <div>
              <Popover arrowClassName="!left-[265px]">
                <Popover.Trigger>
                  <ActionIcon variant="outline">
                    <Columns3Cog className="size-5 opacity-80" />
                  </ActionIcon>
                </Popover.Trigger>
                <Popover.Content className="!p-6">
                  <Title className="text-sm mb-6" as="h6">
                    Toggle Columns
                  </Title>
                  <div className="grid grid-cols-2 gap-5">
                    <Checkbox defaultChecked label="Image" />
                    <Checkbox defaultChecked label="Description" />
                    <Checkbox defaultChecked label="Products" />
                    <Checkbox defaultChecked label="Category Name" />
                    <Checkbox defaultChecked label="Slug" />
                  </div>
                </Popover.Content>
              </Popover>
            </div>
          </div>
          {/* <CategoryList /> */}
          {slicedCategories && <Table data={slicedCategories} headers={headers} />}
          {/* Pagination */}
          <Pagination
            pageSizeOptions={pageSizeOptions}
            selectedPageSize={selectedPageSize}
            setSelectedPageSize={setSelectedPageSize}
            totalPage={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;