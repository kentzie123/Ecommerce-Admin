// RizzUI
import { Button, Input, Textarea, Select, Switch } from "rizzui";

const ProductInventoryForm = ({formData, setFormData}) => {
  return (
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
  );
};

export default ProductInventoryForm;
