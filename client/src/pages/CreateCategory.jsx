// Routing
import { Link } from "react-router-dom";

// Icons
import { CloudUpload, Trash2 } from "lucide-react";

// Hooks
import { useRef, useState, useEffect } from "react";

// rizz ui
import { Textarea, Input, Button, Switch } from "rizzui";

// UI
import Select from "../components/ui/Select";

// Toast
import toast from "react-hot-toast";

// Stores
import { useCategoryStore } from "../store/useCategoryStore";

const CreateCategory = () => {
  const {
    isCreatingCategory,
    createCategory,
    getParentCategories,
    parentCategories,
    getSubCategories,
    subCategories,
    setSubCategories,
  } = useCategoryStore();
  const selectPic = useRef();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent_category: null,
    sub_parent: null,
    description: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    thumbnail: {
      url: "",
      publicId: "",
    },
    status: true,
  });

  useEffect(() => {
    getParentCategories();
  }, []);

  useEffect(() => {
    if (!formData.parent_category) {
      // clear sub categories if no parent category selected
      formData.sub_parent = "";
      setSubCategories([]);
      return;
    }
    console.log(formData.parent_category);

    getSubCategories(formData.parent_category.value);
  }, [formData.parent_category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (formData.status === null) newErrors.status = "Status is required";
    // add more validations if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // submit logic here
    const createCategorySuccess = await createCategory(formData);
    if (!createCategorySuccess) return;
    setFormData({
      name: "",
      slug: "",
      parent_category: "",
      sub_parent: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      thumbnail: null,
      status: true,
    });
  };

  const handleSelectImage = (imageFile) => {
    const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!supportedTypes.includes(imageFile.type)) {
      toast.error("File type not supported!");
      return;
    }

    if (imageFile.size / (1024 * 1024) > 10) {
      toast.error("File size exceeds 10MB!");
      return;
    }

    const reader = new FileReader(); // Create a file reader
    // This will run once the file is fully read
    reader.onloadend = () => {
      setFormData({
        ...formData,
        thumbnail: { url: reader.result }, // `reader.result` contains the base64 image
      });
    };

    // Start reading the image file (this triggers onloadend later)
    if (imageFile) {
      reader.readAsDataURL(imageFile); // Convert image file to base64
    }
  };

  const closeImagePreview = () => {
    setFormData({
      ...formData,
      thumbnail: { url: "", publicId: ""}, 
    });

    // Reset file input so same file can be selected again
    if (selectPic.current) {
      selectPic.current.value = "";
    }
  };

  const parentCategorySetter = (value) => {
    setFormData({ ...formData, parent_category: value });
  };
  const subCategorySetter = (value) => {
    setFormData({ ...formData, sub_parent: value });
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg space-y-5 h-full">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-2xl mb-2">Create A Category</div>
          <div className="breadcrumbs text-sm font-medium text-base-content/80">
            <ul>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li className="opacity-85">Create</li>
            </ul>
          </div>
        </div>
        <div>
          <Link to="/categories">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-base-content/30 pb-10">
          <div className="col-span-2 text-base-content">
            <h6 className="font-bold text-lg">Basic Information:</h6>
            <p className="text-sm opacity-85 mt-1">
              Provide the main details for this category, including its name and
              slug.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-1 text-base-content">
              <Input
                type="text"
                labelClassName="opacity-85"
                label="Category Name"
                placeholder="category name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onClear={() => setFormData({ ...formData, name: "" })}
                error={errors.name}
                clearable
              />
            </div>
            <div className="space-y-1 text-base-content">
              <Input
                type="text"
                labelClassName="opacity-85"
                label="Slug"
                placeholder="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                onClear={() => setFormData({ ...formData, slug: "" })}
                error={errors.slug}
                clearable
              />
            </div>
            <div className="space-y-1 text-base-content">
              <Select
                label="Parent Category"
                options={parentCategories}
                value={formData.parent_category}
                setter={parentCategorySetter}
                helperText="Select the main category this item belongs to."
              />
            </div>
            <div className="space-y-1 text-base-content">
              <Select
                label="Sub Parent"
                options={subCategories}
                value={formData.sub_parent}
                setter={subCategorySetter}
                disabled={subCategories.length === 0}
                helperText={
                  !formData.parent_category
                    ? "Choose a parent category first to see available sub-parents."
                    : !formData.sub_parent
                    ? "Select a sub-parent category under the chosen parent."
                    : "By selecting both a parent and sub-parent, you are creating a 3rd-level category."
                }
              />
            </div>
            <div className="col-span-full space-y-1 text-base-content">
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                labelClassName="opacity-85"
                label="Description"
                error=""
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-base-content/30 pb-10">
          <div className="col-span-2 text-base-content">
            <h6 className="font-bold text-lg">SEO Settings:</h6>
            <p className="text-sm opacity-85 mt-1">
              Improve visibility on search engines by filling these fields.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <Input
              type="text"
              label="Meta Title"
              value={formData.metaTitle}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle: e.target.value })
              }
              maxLength={60}
              suffix={formData.metaTitle.length + "/60"}
              suffixClassName="opacity-70"
            />
            <Textarea
              label="Meta Description"
              value={formData.metaDescription}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
              maxLength={160}
            />
            <Input
              type="text"
              label="Canonical URL"
              value={formData.canonicalUrl}
              onChange={(e) =>
                setFormData({ ...formData, canonicalUrl: e.target.value })
              }
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pt-5 pb-10">
          <div className="col-span-2 text-base-content">
            <h6 className="font-bold text-lg">Upload new thumbnail image</h6>
            <p className="text-sm opacity-85 mt-1">
              Upload your product image gallery here
            </p>
          </div>
          <div className="col-span-4 cursor-pointer">
            <input
              ref={selectPic}
              onChange={(e) => {
                handleSelectImage(e.target.files[0]);
              }}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => selectPic.current.click()}
              className="flex justify-center items-center gap-3 border border-base-content/20 h-24 rounded-md text-base-content/85"
            >
              <CloudUpload className="size-8" />
              <div className="font-medium">Select Image</div>
            </div>
            {formData.thumbnail?.url && (
              <div className="relative avatar bg-base-200 w-full mt-3 rounded-md justify-center">
                <div
                  onClick={closeImagePreview}
                  className="absolute right-0 top-0 w-6 h-6 rounded-full bg-base-content/30 hover:bg-red transition-colors duration-300"
                >
                  <Trash2 className="w-3 h-3 absolute inset-0 m-auto text-white" />
                </div>
                <div className="w-36">
                  <img className="select-none" src={formData.thumbnail?.url} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-10">
          <div className="col-span-2 text-base-content">
            <h6 className="font-bold text-lg">Status</h6>
            <p className="text-sm opacity-85 mt-1">
              Set whether this category is active or inactive.
            </p>
          </div>
          <div className="col-span-4">
            <Switch
              checked={formData.status}
              onChange={() =>
                setFormData({ ...formData, status: !formData.status })
              }
              label="Status"
              labelClassName="font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            isLoading={isCreatingCategory}
            type="submit"
            color="secondary"
          >
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
