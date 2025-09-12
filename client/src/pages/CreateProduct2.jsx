// For Routing
import { Link } from "react-router-dom";

// RizzUI
import { Button } from "rizzui";

// Hooks
import { useState, useEffect } from "react";

// Stores
import { useCategoryStore } from "../store/useCategoryStore";

//Components Layout
import ProductBasicInfoForm from "../components/layout/ProductBasicInfoForm";
import ProductPricingForm from "../components/layout/ProductPricingForm";
import ProductInventoryForm from "../components/layout/ProductInventoryForm";
import ProductCategoriesForm from "../components/layout/ProductCategoriesForm";
import ProductVariantForm from "../components/layout/ProductVariantForm";

const CreateProduct2 = () => {
  const {
    getParentCategories,
    getSubCategories,
    setSubCategories,
    getSubSubCategories,
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

  useEffect(() => {
    getParentCategories();
  }, []);

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
          <ProductBasicInfoForm formData={formData} setFormData={setFormData} />

          {/* Pricing */}
          <ProductPricingForm formData={formData} setFormData={setFormData} />

          {/* Inventory */}
          <ProductInventoryForm formData={formData} setFormData={setFormData} />

          {/* Categories */}
          <ProductCategoriesForm
            formData={formData}
            setFormData={setFormData}
          />

          {/* Variant */}
          <ProductVariantForm formData={formData} setFormData={setFormData} />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct2;
