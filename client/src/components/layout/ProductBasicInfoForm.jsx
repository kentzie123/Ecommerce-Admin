// RizzUI
import { Input, Textarea} from "rizzui";

// Components UI
import Label from "../ui/Label";

const ProductBasicInfoForm = ({formData, setFormData}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
      <div className="col-span-2">
        <h6 className="font-bold text-lg">Basic Information</h6>
        <p className="text-sm opacity-85 mt-1">
          Provide the main details for this product, including its name, slug,
          and identifiers.
        </p>
      </div>
      <div className="col-span-4 grid grid-cols-2 gap-6">
        <Input
          labelClassName="opacity-85"
          label={<Label labelName={"Product Name"} />}
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          clearable
          onClear={() => setFormData({ ...formData, name: "" })}
        />
        <Input
          labelClassName="opacity-85"
          label={<Label labelName={"Slug"} />}
          placeholder="product-slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          clearable
          onClear={() => setFormData({ ...formData, slug: "" })}
        />
        <Input
          labelClassName="opacity-85"
          label="SKU"
          placeholder="SKU-001"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
  );
};

export default ProductBasicInfoForm;
