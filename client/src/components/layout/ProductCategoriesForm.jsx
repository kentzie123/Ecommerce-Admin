// RizzUI
import { Select } from "rizzui";

// Components UI
import Label from "../ui/Label";

// Stores
import { useCategoryStore } from "../../store/useCategoryStore";

const ProductCategoriesForm = ({ formData, setFormData }) => {
  const {
    parentCategories,
    subCategories,
    subSubCategories,
  } = useCategoryStore();

  return (
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
          onClear={() => setFormData({ ...formData, subSubCategory: null })}
          disabled={subSubCategories.length === 0}
          helperText={
            !formData.subCategory
              ? "Choose a sub category first to see available sub-sub categories."
              : "Select a sub-sub category under the chosen sub category."
          }
        />
      </div>
    </div>
  );
};

export default ProductCategoriesForm;
