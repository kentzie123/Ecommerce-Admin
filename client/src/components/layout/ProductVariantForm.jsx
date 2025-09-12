// RizzUI
import { Button, Input } from "rizzui";

// Component UI
import VariantImage from "../ui/VariantImage";

// Components Layout
import ProductVariantSizeForm from "./ProductVariantSizeForm";

// Icons
import { CloudUpload, Minus, Plus } from "lucide-react";

// Toast
import toast from "react-hot-toast";

// Hooks
import { useRef } from "react";

const ProductVariantForm = ({ formData, setFormData }) => {
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          name: "",
          value: "",
          price: 0,
          stock: 0,
          sku: "",
          images: [],
          sizes: [],
        },
      ],
    });
  };

  const selectVariantImgRef = useRef([]);

  const removeVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const updateVariantField = (index, field, value) => {
    const updatedVariants = [...formData.variants]; // copy array
    updatedVariants[index] = {
      // update a specific variant using index
      ...updatedVariants[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      variants: updatedVariants, // insert the new updated variantss
    });
  };

  const handleAddVariantImage = (variantIndex, imageFile) => {
    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!supportedTypes.includes(imageFile.type)) {
      console.log("image not supported");
      toast.error("File type not supported!");
      return;
    }
    if (imageFile.size / (1024 * 1024) > 5) {
      toast.error("File size exceeds 5MB!");
      return;
    }

    const reader = new FileReader(); // Create a file reader

    // This will run once the file is fully read
    reader.onloadend = () => {
      const image = {
        url: reader.result,
        alt: "",
        publicId: "",
      };

      const variants = [...formData.variants];

      variants[variantIndex].images = [...variants[variantIndex].images, image];

      setFormData({ ...formData, variants: variants });
    };
    // Start reading the image file (this triggers onloadend later)
    if (imageFile) {
      reader.readAsDataURL(imageFile); // Convert image file to base64
    }
  };

  const handleRemoveVariantImage = (variantIndex, variantImageIndex) => {
    const variants = [...formData.variants];

    variants[variantIndex].images.splice(variantImageIndex, 1);

    setFormData({
      ...formData,
      variants,
    });
  };

  const updateVariantImageField = (
    variantIndex,
    variantImageIndex,
    field,
    value
  ) => {
    const variants = [...formData.variants];

    variants[variantIndex].images[variantImageIndex][field] = value;

    setFormData({
      ...formData,
      variants,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-9 border-b border-dashed">
      <div className="col-span-2">
        <h6 className="font-bold text-lg">Variants</h6>
        <p className="text-sm opacity-85 mt-1">
          Add variations of this product (e.g., size, color).
        </p>
      </div>
      <div className="col-span-4 space-y-6">
        {formData.variants.map((variant, variantIndex) => (
          <div
            key={variantIndex}
            className="p-4 border rounded-lg space-y-4 bg-base-200/80"
          >
            <div className="flex justify-between">
              <h6 className="font-medium">Variant {variantIndex + 1}</h6>
              <Button
                onClick={() => removeVariant(variantIndex)}
                type="button"
                variant="outline"
                size="sm"
              >
                <Minus className="size-5 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Variant Name"
                labelClassName="opacity-85"
                placeholder="e.g., Color"
                clearable
                value={variant.name}
                onChange={(e) =>
                  updateVariantField(variantIndex, "name", e.target.value)
                }
                onClear={() => updateVariantField(variantIndex, "name", "")}
              />
              <Input
                label="Variant Value"
                labelClassName="opacity-85"
                placeholder="e.g., Red"
                value={variant.value}
                clearable
                onChange={(e) =>
                  updateVariantField(variantIndex, "value", e.target.value)
                }
                onClear={() => updateVariantField(variantIndex, "value", "")}
              />
              <Input
                type="number"
                label="Variant Price"
                labelClassName="opacity-85"
                placeholder="0.00"
                clearable
                value={variant.price}
                onChange={(e) =>
                  updateVariantField(variantIndex, "price", e.target.value)
                }
                onClear={() => updateVariantField(variantIndex, "price", "")}
              />
              <Input
                type="number"
                label="Variant Stock"
                labelClassName="opacity-85"
                clearable
                value={variant.stock}
                onChange={(e) =>
                  updateVariantField(variantIndex, "stock", e.target.value)
                }
                onClear={() => updateVariantField(variantIndex, "stock", "")}
              />
              <Input
                className="col-span-full"
                label="Variant SKU"
                labelClassName="opacity-85"
                placeholder="SKU-001-RED"
                clearable
                value={variant.sku}
                onChange={(e) =>
                  updateVariantField(variantIndex, "sku", e.target.value)
                }
                onClear={() => updateVariantField(variantIndex, "sku", "")}
              />
              <div className="col-span-full space-y-4">
                <div className="font-medium">Variant Images</div>
                <input
                  ref={(el) => (selectVariantImgRef.current[variantIndex] = el)}
                  onChange={(e) =>
                    handleAddVariantImage(variantIndex, e.target.files[0])
                  }
                  className="hidden"
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                />
                <div
                  className="flex items-center justify-center gap-2 border border-dashed border-base-content/25 rounded-md py-8 text-base-content/70 cursor-pointer select-none"
                  onClick={() =>
                    selectVariantImgRef.current[variantIndex].click()
                  }
                >
                  <CloudUpload />
                  <span className="font-medium">Add Variant Image</span>
                </div>

                {/* Variant Images */}
                <div className="grid grid-cols-3 gap-4">
                  {variant.images.map((img, variantImageIndex) => (
                    <div key={variantImageIndex}>
                      <VariantImage
                        variantIndex={variantIndex}
                        variantImageIndex={variantImageIndex}
                        img={img}
                        removeImage={handleRemoveVariantImage}
                        updateVariantImageField={updateVariantImageField}
                      />
                    </div>
                  ))}
                </div>

                {/* Sizes */}
                <ProductVariantSizeForm
                  formData={formData}
                  setFormData={setFormData}
                  variantIndex={variantIndex}
                  variant={variant}
                />
              </div>
            </div>
          </div>
        ))}
        <Button type="button" onClick={addVariant}>
          <Plus className="size-4 mr-1" />
          Add Variant
        </Button>
      </div>
    </div>
  );
};

export default ProductVariantForm;
