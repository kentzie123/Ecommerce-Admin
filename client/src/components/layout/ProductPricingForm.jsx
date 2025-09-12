// RizzUI
import { Input, Select } from "rizzui";

// Components UI
import Label from "../ui/Label";

const ProductPricingForm = ({ formData, setFormData }) => {
  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "JPY", label: "JPY (¥)" },
    { value: "CAD", label: "CAD (C$)" },
  ];
  
  return (
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
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
  );
};

export default ProductPricingForm;
