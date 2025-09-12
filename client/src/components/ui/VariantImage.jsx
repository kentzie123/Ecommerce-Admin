// Icons
import { Trash2 } from "lucide-react";

// RizzUI
import { Input } from "rizzui/input";

const VariantImage = ({
  variantIndex,
  variantImageIndex,
  img,
  removeImage,
  updateVariantImageField,
}) => {
  return (
    <div className="relative border rounded-md p-2 bg-base-100 space-y-2 select-none">
      <div
        onClick={() => removeImage(variantIndex, variantImageIndex)}
        className="absolute bg-red-500 hover:bg-red-600 cursor-pointer p-1.5 rounded-full right-2"
      >
        <Trash2 className="size-3 text-white" />
      </div>
      <img className="h-20 object-contain mx-auto" src={img.url} />
      <Input
        value={img.alt}
        onChange={(e) =>
          updateVariantImageField(
            variantIndex,
            variantImageIndex,
            "alt",
            e.target.value
          )
        }
        placeholder="Alt text"
      />
    </div>
  );
};

export default VariantImage;
