// For Routing
import { Link } from "react-router-dom";

// RizzUI
import { Button, Input, Textarea, Select, Switch } from "rizzui";

// Components UI
import Label from "../components/ui/Label";

//Components Layout
import ProductVariantForm from "../components/layout/ProductVariantForm";

// Hooks
import { useState, useEffect } from "react";

// Stores
import { useCategoryStore } from "../store/useCategoryStore";

const CreateProduct2 = () => {
  const {
    getParentCategories,
    parentCategories,
    getSubCategories,
    subCategories,
    setSubCategories,
    getSubSubCategories,
    subSubCategories,
    setSubSubCategories,
  } = useCategoryStore();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    barcode: "",
    description: "",
    shortDescription: "",
    price: 0,
    salePrice: 0,
    currency: "USD",
    inStock: true,
    trackInventory: true,
    category: null,
    subCategory: null,
    subSubCategory: null,
    brand: null,
    variants: [],
    thumbnail: {
      url: "",
      publicId: "",
    },
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    featured: false,
    status: true,
  });

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "JPY", label: "JPY (¥)" },
    { value: "CAD", label: "CAD (C$)" },
  ];

  useEffect(() => {
    getParentCategories();
  }, []);

  useEffect(() => {
    console.log(formData.variants);
  }, [formData.variants]);

  useEffect(() => {
    if (!formData.category) {
      formData.subCategory = null;
      setSubCategories([]);
      return;
    }

    getSubCategories(formData.category.value);
  }, [formData.category]);

  useEffect(() => {
    if (!formData.subCategory) {
      formData.subSubCategory = null;
      setSubSubCategories([]);
      return;
    }

    getSubSubCategories(formData.subCategory.value);
  }, [formData.subCategory]);

  return (
    <div className="p-6">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-2xl mb-2">Create A Product</div>
            <div className="breadcrumbs text-sm font-medium text-gray-600">
              <ul className="flex space-x-2">
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li className="opacity-85">Create</li>
              </ul>
            </div>
          </div>
          <Link to="/products">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        <form className="space-y-5 mt-3">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
            <div className="col-span-2">
              <h6 className="font-bold text-lg">Basic Information</h6>
              <p className="text-sm opacity-85 mt-1">
                Provide the main details for this product, including its name,
                slug, and identifiers.
              </p>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-6">
              <Input
                labelClassName="opacity-85"
                label={<Label labelName={"Product Name"} />}
                placeholder="Product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, name: "" })}
              />
              <Input
                labelClassName="opacity-85"
                label={<Label labelName={"Slug"} />}
                placeholder="product-slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, slug: "" })}
              />
              <Input
                labelClassName="opacity-85"
                label="SKU"
                placeholder="SKU-001"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, sku: "" })}
              />
              <Input
                type="number"
                labelClassName="opacity-85"
                label="Barcode"
                placeholder="123456789012"
                value={formData.barcode}
                onChange={(e) =>
                  setFormData({ ...formData, barcode: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, barcode: "" })}
              />
              <Textarea
                className="col-span-full"
                textareaClassName="h-20"
                labelClassName="opacity-85"
                label="Short Description"
                placeholder="Brief description of the product (max 200 characters)"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                helperClassName="text-right"
                helperText={`${formData.shortDescription.length}/200`}
                maxLength={200}
              />
              <Textarea
                className="col-span-full"
                labelClassName="opacity-85"
                label="Description"
                placeholder="Full description of the product"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
            <div className="col-span-2">
              <h6 className="font-bold text-lg">Pricing</h6>
              <p className="text-sm opacity-85 mt-1">
                Set the pricing information for this product.
              </p>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-6">
              <Input
                type="number"
                label={<Label labelName={"Price"} />}
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, price: "" })}
              />
              <Input
                type="number"
                label="Sale Price"
                labelClassName="opacity-85"
                placeholder="0.00"
                value={formData.salePrice}
                onChange={(e) =>
                  setFormData({ ...formData, salePrice: e.target.value })
                }
                clearable
                onClear={() => setFormData({ ...formData, salePrice: "" })}
              />
              <Select
                className="col-span-full"
                label="Currency"
                placeholder="Select currency"
                options={currencies}
                value={formData.currency}
                onChange={(selected) =>
                  setFormData({ ...formData, currency: selected.value })
                }
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
            <div className="col-span-2">
              <h6 className="font-bold text-lg">Inventory</h6>
              <p className="text-sm opacity-85 mt-1">
                Manage stock settings for this product.
              </p>
            </div>
            <div className="col-span-4 space-y-3 text-base-content font-medium">
              <div className="flex justify-between items-center">
                <div>In Stock</div>
                <Switch
                  checked={formData.inStock}
                  onChange={() =>
                    setFormData({ ...formData, inStock: !formData.inStock })
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <div>Track Inventory</div>
                <Switch
                  checked={formData.trackInventory}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      trackInventory: !formData.trackInventory,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
            <div className="col-span-2">
              <h6 className="font-bold text-lg">Categories</h6>
              <p className="text-sm opacity-85 mt-1">
                Organize your product by assigning it to categories.
              </p>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-6">
              <Select
                label={<Label labelName="Category" />}
                placeholder="Select an option"
                options={parentCategories}
                value={formData.category}
                onChange={(selected) =>
                  setFormData({ ...formData, category: selected })
                }
                clearable
                onClear={() => setFormData({ ...formData, category: null })}
                helperText="Select the main category this product belongs to."
              />
              <Select
                label="Sub Category"
                labelClassName="opacity-85"
                placeholder="Select an option"
                options={subCategories}
                value={formData.subCategory}
                onChange={(selected) =>
                  setFormData({ ...formData, subCategory: selected })
                }
                clearable
                onClear={() => setFormData({ ...formData, subCategory: null })}
                disabled={subCategories.length === 0}
                helperText={
                  !formData.category
                    ? "Choose a parent category first to see available sub-parents."
                    : "Select a sub-parent category under the chosen parent."
                }
              />
              <Select
                className="col-span-full"
                label="Sub Sub Category"
                labelClassName="opacity-85"
                placeholder="Select an option"
                options={subSubCategories}
                value={formData.subSubCategory}
                onChange={(selected) =>
                  setFormData({ ...formData, subSubCategory: selected })
                }
                clearable
                onClear={() =>
                  setFormData({ ...formData, subSubCategory: null })
                }
                disabled={subSubCategories.length === 0}
                helperText={
                  !formData.subCategory
                    ? "Choose a sub category first to see available sub-sub categories."
                    : "Select a sub-sub category under the chosen sub category."
                }
              />
            </div>
          </div>

          {/* Variant */}
          <ProductVariantForm formData={formData} setFormData={setFormData} />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct2;
