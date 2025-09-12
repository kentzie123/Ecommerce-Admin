// React Routing
import { Link } from "react-router-dom";

// Icons
import { Plus, Search, Columns3Cog, Edit, Eye, Trash2 } from "lucide-react";

// UI
import Table from "../components/ui/Table";
import Searchbar from "../components/ui/Searchbar";
import Pagination from "../components/ui/Pagination";

// rizz ui
import { Button, ActionIcon, Popover, Checkbox, Title, Badge } from "rizzui";

// Stores
import { useProductStore } from "../store/useProductStore";

// Hooks
import { useState, useMemo, useEffect } from "react";

const Products = () => {
  const { getProducts, products, deleteProduct } = useProductStore();
  const [selectedPageSize, setSelectedPageSize] = useState({
    label: "10",
    value: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Format price with currency symbol
  const formatPrice = (price, currency = "USD") => {
    if (!price && price !== 0) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Calculate stock status
  const getStockStatus = (product) => {
    if (!product.trackInventory) return { text: "Not tracked", color: "gray" };
    
    if (product.variants && product.variants.length > 0) {
      const totalStock = product.variants.reduce((sum, variant) => sum + (variant.stock || 0), 0);
      return totalStock > 0 
        ? { text: `In Stock (${totalStock})`, color: "success" } 
        : { text: "Out of Stock", color: "danger" };
    }
    
    return product.inStock 
      ? { text: "In Stock", color: "success" } 
      : { text: "Out of Stock", color: "danger" };
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await getProducts();
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category?.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.brand?.name && product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / selectedPageSize?.value);
  }, [filteredProducts, selectedPageSize]);

  const start = useMemo(() => {
    return (currentPage - 1) * selectedPageSize.value;
  }, [currentPage, selectedPageSize]);

  const end = useMemo(() => {
    return currentPage * selectedPageSize.value;
  }, [currentPage, selectedPageSize]);

  const slicedProducts = useMemo(() => {
    return filteredProducts.slice(start, end);
  }, [start, end, filteredProducts]);

  // Prepare table data with properly formatted values
  const tableData = useMemo(() => {
    return slicedProducts.map(product => ({
      ...product,
      // Ensure we're using string values for display
      category: product.category?.name || "Uncategorized",
      brand: product.brand?.name || "No brand",
      // Format price for display
      price: formatPrice(product.price, product.currency),
      // Calculate stock status
      stock: getStockStatus(product).text,
      // Convert status to display text
      status: product.status ? "Active" : "Inactive"
    }));
  }, [slicedProducts]);

  const headers = [
    { key: "select", label: "", className: "w-[75px]", visible: true },
    { key: "image", label: "Image", className: "w-[100px]", visible: true },
    {
      key: "name",
      label: "Product Name",
      className: "w-[200px]",
      visible: true,
    },
    {
      key: "sku",
      label: "SKU",
      className: "w-[120px]",
      visible: true,
    },
    {
      key: "category",
      label: "Category",
      className: "w-[150px]",
      visible: true,
    },
    {
      key: "price",
      label: "Price",
      className: "w-[100px]",
      visible: true,
    },
    {
      key: "stock",
      label: "Stock",
      className: "w-[100px]",
      visible: true,
    },
    {
      key: "status",
      label: "Status",
      className: "w-[100px]",
      visible: true,
    },
    { key: "actions", label: "", className: "w-[150px]", visible: true },
  ];

  const pageSizeOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
  ];

  const [tableHeaders, setTableHeaders] = useState(headers);

  const toggleColumn = (key) => {
    setTableHeaders((prev) =>
      prev.map((h) => (h.key === key ? { ...h, visible: !h.visible } : h))
    );
  };

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  // Custom cell renderers for the table
  const customCellRenderers = {
    image: (product) => (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        {product.thumbnail?.url ? (
          <img 
            src={product.thumbnail.url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-xs">No image</div>
        )}
      </div>
    ),
    stock: (product) => {
      const stockStatus = getStockStatus(product);
      return (
        <Badge color={stockStatus.color} className="whitespace-nowrap">
          {stockStatus.text}
        </Badge>
      );
    },
    status: (product) => (
      <Badge color={product.status ? "success" : "danger"}>
        {product.status ? "Active" : "Inactive"}
      </Badge>
    ),
    actions: (product) => (
      <div className="flex items-center gap-2">
        <ActionIcon
          variant="outline"
          as={Link}
          to={`/products/view/${product._id || product.id}`}
          size="sm"
          title="View Product"
        >
          <Eye className="size-4" />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          as={Link}
          to={`/products/edit/${product._id || product.id}`}
          size="sm"
          title="Edit Product"
        >
          <Edit className="size-4" />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          size="sm"
          title="Delete Product"
          onClick={() => handleDeleteProduct(product._id || product.id)}
          className="text-red-600 hover:text-red-800 hover:border-red-300"
        >
          <Trash2 className="size-4" />
        </ActionIcon>
      </div>
    )
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg space-y-5 h-full">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-2xl mb-2">Products</div>
            <div className="breadcrumbs text-sm font-medium text-base-content/80">
              <ul className="flex space-x-2">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="opacity-85">Products</li>
              </ul>
            </div>
          </div>
          <div>
            <Link to="/products/create">
              <Button color="secondary" className="gap-2">
                <Plus className="size-5" />
                <div>Add Product</div>
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
                placeholder={"Search products..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    {tableHeaders
                      .filter((h) => h.key !== "select" && h.key !== "actions")
                      .map((header) => (
                        <Checkbox
                          key={header.key}
                          checked={header.visible}
                          onChange={() => toggleColumn(header.key)}
                          label={header.label}
                        />
                      ))}
                  </div>
                </Popover.Content>
              </Popover>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-500">Loading products...</p>
            </div>
          ) : tableData.length > 0 ? (
            <>
              <Table
                data={tableData}
                headers={tableHeaders.filter((h) => h.visible)}
                customRenderers={customCellRenderers}
              />
              
              {/* Pagination */}
              <Pagination
                pageSizeOptions={pageSizeOptions}
                selectedPageSize={selectedPageSize}
                setSelectedPageSize={setSelectedPageSize}
                totalPage={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredProducts.length}
                startIndex={start + 1}
                endIndex={Math.min(end, filteredProducts.length)}
              />
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              {searchTerm ? "No products match your search" : "No products found"}
              {!searchTerm && (
                <div className="mt-4">
                  <Link to="/products/create">
                    <Button color="primary">
                      <Plus className="size-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;