//RizzUI
import { Button, Input } from "rizzui";

// Icons
import { Plus, Minus } from "lucide-react";

import { useState } from "react";

const ProductVariantSizeForm = ({
  formData,
  setFormData,
  variantIndex,
  variant,
}) => {
  const handleAddSize = () => {
    const value = { name: "", values: [] };
    const variants = [...formData.variants];
    variants[variantIndex].sizes.push(value);

    setFormData({ ...formData, variants });
  };

  const removeVariantSize = (variantSizeIndex) => {
    console.log(variantSizeIndex);
    const variants = [...formData.variants];
    variants[variantIndex].sizes.splice(variantSizeIndex, 1);

    setFormData({ ...formData, variants });
  };

  const updateVariantSizeField = (variantSizeIndex, field, value) => {
    const variants = [...formData.variants];
    variants[variantIndex].sizes[variantSizeIndex] = {
      ...variants[variantIndex].sizes[variantSizeIndex],
      [field]: value,
    };

    setFormData({ ...formData, variants });
  };

  const handleAddSizeValue = (variantSizeIndex) => {
    const variants = [...formData.variants];
    variants[variantIndex].sizes[variantSizeIndex].values.push("");

    setFormData({ ...formData, variants });
  };

  const removeSizeValue = (variantSizeIndex, variantSizeValueIndex) => {
    const variants = [...formData.variants];
    variants[variantIndex].sizes[variantSizeIndex].values.splice(
      variantSizeValueIndex,
      1
    );

    setFormData({ ...formData, variants });
  };

  const updateVariantSizeValue = (
    variantSizeIndex,
    variantSizeValueIndex,
    value
  ) => {
    const variants = [...formData.variants];
    variants[variantIndex].sizes[variantSizeIndex].values[
      variantSizeValueIndex
    ] = value;

    setFormData({ ...formData, variants });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="font-medium">Size</div>
        <Button onClick={handleAddSize}>
          <Plus className="size-4 mr-1" />
          Add Size
        </Button>
      </div>
      {variant.sizes.map((size, variantSizeIndex) => (
        <div
          key={variantSizeIndex}
          className="p-4 border rounded-lg space-y-4 bg-base-100"
        >
          <div className="flex justify-between">
            <h6 className="font-medium">Size {variantSizeIndex + 1}</h6>
            <Button
              onClick={() => removeVariantSize(variantSizeIndex)}
              variant="outline"
              size="sm"
            >
              <Minus className="size-5 text-red-500" />
            </Button>
          </div>
          <Input
            label="Size Name"
            labelClassName="opacity-85"
            placeholder="e.g., Shirt Size"
            value={size.name}
            onChange={(e) =>
              updateVariantSizeField(variantSizeIndex, "name", e.target.value)
            }
          />
          <div className="flex justify-between items-center">
            <h6 className="font-medium">Size Values</h6>
            <Button onClick={() => handleAddSizeValue(variantSizeIndex)}>
              <Plus className="size-4 mr-1" />
              Add Value
            </Button>
          </div>
          {size.values.map((value, variantSizeValueIndex) => (
            <div
              key={variantSizeValueIndex}
              className="flex items-center gap-2"
            >
              <Input
                value={value}
                onChange={(e) =>
                  updateVariantSizeValue(
                    variantSizeIndex,
                    variantSizeValueIndex,
                    e.target.value
                  )
                }
                className="w-full"
                placeholder="e.g., S"
              />
              <Button
                onClick={() =>
                  removeSizeValue(variantSizeIndex, variantSizeValueIndex)
                }
                type="button"
                variant="outline"
                size="sm"
              >
                <Minus className="size-5 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductVariantSizeForm;
