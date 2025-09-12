import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CloudUpload, Trash2, Plus, Minus } from 'lucide-react';

const CreateProduct = () => {
  // Mock data for selections
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'sports', label: 'Sports & Outdoors' },
  ];

  const subCategories = {
    electronics: [
      { value: 'smartphones', label: 'Smartphones' },
      { value: 'laptops', label: 'Laptops' },
      { value: 'tvs', label: 'TVs' },
      { value: 'cameras', label: 'Cameras' },
    ],
    clothing: [
      { value: 'mens', label: "Men's Clothing" },
      { value: 'womens', label: "Women's Clothing" },
      { value: 'kids', label: "Kids' Clothing" },
      { value: 'accessories', label: 'Accessories' },
    ],
    home: [
      { value: 'furniture', label: 'Furniture' },
      { value: 'decor', label: 'Home Decor' },
      { value: 'kitchen', label: 'Kitchen Appliances' },
      { value: 'bedding', label: 'Bedding' },
    ],
    beauty: [
      { value: 'skincare', label: 'Skincare' },
      { value: 'makeup', label: 'Makeup' },
      { value: 'haircare', label: 'Haircare' },
      { value: 'fragrance', label: 'Fragrance' },
    ],
    sports: [
      { value: 'fitness', label: 'Fitness' },
      { value: 'outdoor', label: 'Outdoor Recreation' },
      { value: 'sports', label: 'Sports Equipment' },
      { value: 'cycling', label: 'Cycling' },
    ],
  };

  const subSubCategories = {
    smartphones: [
      { value: 'android', label: 'Android Phones' },
      { value: 'ios', label: 'iOS Phones' },
      { value: 'accessories', label: 'Phone Accessories' },
    ],
    laptops: [
      { value: 'gaming', label: 'Gaming Laptops' },
      { value: 'ultrabooks', label: 'Ultrabooks' },
      { value: 'business', label: 'Business Laptops' },
    ],
    mens: [
      { value: 'shirts', label: 'Shirts' },
      { value: 'pants', label: 'Pants' },
      { value: 'outerwear', label: 'Outerwear' },
    ],
    womens: [
      { value: 'dresses', label: 'Dresses' },
      { value: 'tops', label: 'Tops' },
      { value: 'bottoms', label: 'Bottoms' },
    ],
  };

  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'sony', label: 'Sony' },
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'dell', label: 'Dell' },
    { value: 'hp', label: 'HP' },
    { value: 'lenovo', label: 'Lenovo' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
    { value: 'CAD', label: 'CAD (C$)' },
  ];

  const thumbnailInputRef = useRef();
  const variantImageInputRefs = useRef([]);
  
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    barcode: '',
    description: '',
    shortDescription: '',
    price: 0,
    salePrice: null,
    currency: 'USD',
    inStock: true,
    trackInventory: true,
    category: null,
    subCategory: null,
    subSubCategory: null,
    brand: null,
    variants: [],
    thumbnail: {
      url: '',
      publicId: '',
    },
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    featured: false,
    status: true,
  });

  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [availableSubSubCategories, setAvailableSubSubCategories] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    // Validate variants if they exist
    if (formData.variants.length > 0) {
      formData.variants.forEach((variant, index) => {
        if (!variant.name.trim()) newErrors[`variants.${index}.name`] = 'Variant name is required';
        if (!variant.value.trim()) newErrors[`variants.${index}.value`] = 'Variant value is required';
        if (variant.price && variant.price < 0) newErrors[`variants.${index}.price`] = 'Variant price must be positive';
        if (variant.stock && variant.stock < 0) newErrors[`variants.${index}.stock`] = 'Variant stock must be positive';
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Submit logic here
    console.log('Form data:', formData);
    alert('Product created successfully!');
  };

  const handleImageUpload = (file, callback) => {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!supportedTypes.includes(file.type)) {
      alert('File type not supported!');
      return;
    }
    
    if (file.size / (1024 * 1024) > 10) {
      alert('File size exceeds 10MB!');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailSelect = (e) => {
    if (e.target.files[0]) {
      handleImageUpload(e.target.files[0], (imageData) => {
        setFormData({
          ...formData,
          thumbnail: { ...formData.thumbnail, url: imageData }
        });
      });
    }
  };

  const handleVariantImageSelect = (e, variantIndex) => {
    if (e.target.files[0]) {
      handleImageUpload(e.target.files[0], (imageData) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[variantIndex].images = [
          ...updatedVariants[variantIndex].images,
          { url: imageData, alt: '' }
        ];
        setFormData({ ...formData, variants: updatedVariants });
      });
    }
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].images.splice(imageIndex, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          name: '',
          value: '',
          price: null,
          stock: 0,
          sku: '',
          images: [],
          sizes: [],
        }
      ]
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariantSize = (variantIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes.push({
      name: '',
      values: ['']
    });
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeVariantSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const updateVariantSize = (variantIndex, sizeIndex, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariantSizeValue = (variantIndex, sizeIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex].values.push('');
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeVariantSizeValue = (variantIndex, sizeIndex, valueIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex].values.splice(valueIndex, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const updateVariantSizeValue = (variantIndex, sizeIndex, valueIndex, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex].values[valueIndex] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleCategoryChange = (value) => {
    setFormData({ 
      ...formData, 
      category: value,
      subCategory: null,
      subSubCategory: null
    });
    
    if (value) {
      setAvailableSubCategories(subCategories[value.value] || []);
    } else {
      setAvailableSubCategories([]);
    }
    setAvailableSubSubCategories([]);
  };

  const handleSubCategoryChange = (value) => {
    setFormData({ 
      ...formData, 
      subCategory: value,
      subSubCategory: null
    });
    
    if (value) {
      setAvailableSubSubCategories(subSubCategories[value.value] || []);
    } else {
      setAvailableSubSubCategories([]);
    }
  };

  // Custom Input component
  const Input = ({ 
    type = 'text', 
    label, 
    placeholder, 
    value, 
    onChange, 
    error, 
    className = '', 
    min, 
    step,
    required,
    clearable,
    onClear,
    suffix,
    suffixClassName,
    ...props 
  }) => {
    return (
      <div className={`space-y-1 text-base-content ${className}`}>
        {label && (
          <label className="block text-sm font-medium opacity-85">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            min={min}
            step={step}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            {...props}
          />
          {clearable && value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
          {suffix && (
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${suffixClassName}`}>
              {suffix}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  };

  // Custom Textarea component
  const Textarea = ({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    error, 
    className = '', 
    rows = 3,
    maxLength,
    ...props 
  }) => {
    return (
      <div className={`space-y-1 text-base-content ${className}`}>
        {label && (
          <label className="block text-sm font-medium opacity-85">{label}</label>
        )}
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {maxLength && (
          <div className="text-xs text-gray-500 text-right">
            {value.length}/{maxLength}
          </div>
        )}
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  };

  // Custom Select component
  const Select = ({ 
    label, 
    options, 
    value, 
    setter, 
    error, 
    className = '', 
    disabled,
    helperText,
    required 
  }) => {
    return (
      <div className={`space-y-1 text-base-content ${className}`}>
        {label && (
          <label className="block text-sm font-medium opacity-85">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          value={value ? value.value : ''}
          onChange={(e) => {
            const selected = options.find(opt => opt.value === e.target.value);
            setter(selected || null);
          }}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">Select an option</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <p className="text-xs text-gray-500 mt-1">{helperText}</p>
        )}
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  };

  // Custom Switch component
  const Switch = ({ checked, onChange, label, labelClassName = '', helperText }) => {
    return (
      <div className="flex items-center justify-between">
        <div>
          <span className={`${labelClassName}`}>{label}</span>
          {helperText && (
            <p className="text-xs text-gray-500 mt-1">{helperText}</p>
          )}
        </div>
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          onClick={onChange}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    );
  };

  // Custom Button component
  const Button = ({ 
    children, 
    type = 'button', 
    variant = 'primary', 
    size = 'md', 
    onClick, 
    className = '',
    isLoading,
    ...props 
  }) => {
    const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors';
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  };

  return (
    <div className="bg-base-100 p-6 rounded-lg space-y-5 h-full overflow-y-auto shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-2xl mb-2 text-gray-900">Create A Product</div>
          <div className="breadcrumbs text-sm font-medium text-gray-600">
            <ul className="flex space-x-2">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li className="opacity-85">Create</li>
            </ul>
          </div>
        </div>
        <div>
          <Link to="/products">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Basic Information</h6>
            <p className="text-sm opacity-85 mt-1">
              Provide the main details for this product, including its name, slug, and identifiers.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <Input
              type="text"
              label="Product Name"
              placeholder="Product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              clearable
              required
            />
            <Input
              type="text"
              label="Slug"
              placeholder="product-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              error={errors.slug}
              clearable
              required
            />
            <Input
              type="text"
              label="SKU"
              placeholder="SKU-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              clearable
            />
            <Input
              type="text"
              label="Barcode"
              placeholder="123456789012"
              value={formData.barcode}
              onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
              clearable
            />
            <div className="col-span-full">
              <Textarea
                label="Short Description"
                placeholder="Brief description of the product (max 200 characters)"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                maxLength={200}
                rows={2}
              />
            </div>
            <div className="col-span-full">
              <Textarea
                label="Description"
                placeholder="Full description of the product"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Pricing</h6>
            <p className="text-sm opacity-85 mt-1">
              Set the pricing information for this product.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <Input
              type="number"
              label="Price"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              error={errors.price}
              min={0}
              step="0.01"
              required
            />
            <Input
              type="number"
              label="Sale Price"
              placeholder="0.00"
              value={formData.salePrice || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                salePrice: e.target.value ? parseFloat(e.target.value) : null 
              })}
              min={0}
              step="0.01"
            />
            <div className="col-span-full">
              <Select
                label="Currency"
                options={currencies}
                value={{ value: formData.currency, label: formData.currency }}
                setter={(value) => setFormData({ ...formData, currency: value.value })}
              />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Inventory</h6>
            <p className="text-sm opacity-85 mt-1">
              Manage stock settings for this product.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <div className="col-span-full">
              <Switch
                checked={formData.inStock}
                onChange={() => setFormData({ ...formData, inStock: !formData.inStock })}
                label="In Stock"
                labelClassName="font-medium"
              />
            </div>
            <div className="col-span-full">
              <Switch
                checked={formData.trackInventory}
                onChange={() => setFormData({ ...formData, trackInventory: !formData.trackInventory })}
                label="Track Inventory"
                labelClassName="font-medium"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Categories</h6>
            <p className="text-sm opacity-85 mt-1">
              Organize your product by assigning it to categories.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <Select
              label="Category"
              options={categories}
              value={formData.category}
              setter={handleCategoryChange}
              error={errors.category}
              required
            />
            <Select
              label="Sub Category"
              options={availableSubCategories}
              value={formData.subCategory}
              setter={handleSubCategoryChange}
              disabled={!formData.category}
            />
            <Select
              label="Sub Sub Category"
              options={availableSubSubCategories}
              value={formData.subSubCategory}
              setter={(value) => setFormData({ ...formData, subSubCategory: value })}
              disabled={!formData.subCategory}
            />
            <Select
              label="Brand"
              options={brands}
              value={formData.brand}
              setter={(value) => setFormData({ ...formData, brand: value })}
            />
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Variants</h6>
            <p className="text-sm opacity-85 mt-1">
              Add variations of this product (e.g., size, color).
            </p>
          </div>
          <div className="col-span-4 space-y-6">
            <Button 
              type="button" 
              onClick={addVariant}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Variant
            </Button>
            
            {formData.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h6 className="font-medium">Variant {variantIndex + 1}</h6>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeVariant(variantIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="Variant Name"
                    placeholder="e.g., Color"
                    value={variant.name}
                    onChange={(e) => updateVariant(variantIndex, 'name', e.target.value)}
                    error={errors[`variants.${variantIndex}.name`]}
                  />
                  <Input
                    type="text"
                    label="Variant Value"
                    placeholder="e.g., Red"
                    value={variant.value}
                    onChange={(e) => updateVariant(variantIndex, 'value', e.target.value)}
                    error={errors[`variants.${variantIndex}.value`]}
                  />
                  <Input
                    type="number"
                    label="Variant Price"
                    placeholder="0.00"
                    value={variant.price || ''}
                    onChange={(e) => updateVariant(variantIndex, 'price', e.target.value ? parseFloat(e.target.value) : null)}
                    error={errors[`variants.${variantIndex}.price`]}
                    min={0}
                    step="0.01"
                  />
                  <Input
                    type="number"
                    label="Variant Stock"
                    placeholder="0"
                    value={variant.stock}
                    onChange={(e) => updateVariant(variantIndex, 'stock', parseInt(e.target.value) || 0)}
                    error={errors[`variants.${variantIndex}.stock`]}
                    min={0}
                  />
                  <Input
                    type="text"
                    label="Variant SKU"
                    placeholder="SKU-001-RED"
                    value={variant.sku}
                    onChange={(e) => updateVariant(variantIndex, 'sku', e.target.value)}
                    className="col-span-full"
                  />
                </div>
                
                {/* Variant Images */}
                <div className="space-y-4">
                  <h6 className="font-medium">Variant Images</h6>
                  <input
                    ref={el => variantImageInputRefs.current[variantIndex] = el}
                    onChange={(e) => handleVariantImageSelect(e, variantIndex)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => variantImageInputRefs.current[variantIndex].click()}
                    className="flex justify-center items-center gap-3 border border-dashed border-gray-300 h-20 rounded-md text-gray-600 cursor-pointer hover:bg-gray-50"
                  >
                    <CloudUpload size={20} />
                    <div className="font-medium">Add Variant Image</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {variant.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative border rounded-md p-2 bg-white">
                        <img 
                          src={image.url} 
                          alt={image.alt || `Variant image ${imageIndex + 1}`}
                          className="h-20 object-contain mx-auto"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariantImage(variantIndex, imageIndex)}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white"
                        >
                          <Trash2 size={14} />
                        </button>
                        <Input
                          type="text"
                          placeholder="Alt text"
                          value={image.alt}
                          onChange={(e) => {
                            const updatedVariants = [...formData.variants];
                            updatedVariants[variantIndex].images[imageIndex].alt = e.target.value;
                            setFormData({ ...formData, variants: updatedVariants });
                          }}
                          className="mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Variant Sizes */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h6 className="font-medium">Sizes</h6>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => addVariantSize(variantIndex)}
                    >
                      <Plus size={16} />
                      Add Size
                    </Button>
                  </div>
                  
                  {variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="p-3 border rounded-md space-y-3 bg-white">
                      <div className="flex justify-between items-center">
                        <h6 className="font-medium">Size {sizeIndex + 1}</h6>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeVariantSize(variantIndex, sizeIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Minus size={16} />
                        </Button>
                      </div>
                      
                      <Input
                        type="text"
                        label="Size Name"
                        placeholder="e.g., Small"
                        value={size.name}
                        onChange={(e) => updateVariantSize(variantIndex, sizeIndex, 'name', e.target.value)}
                      />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Size Values</label>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => addVariantSizeValue(variantIndex, sizeIndex)}
                          >
                            <Plus size={16} />
                            Add Value
                          </Button>
                        </div>
                        
                        {size.values.map((value, valueIndex) => (
                          <div key={valueIndex} className="flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="e.g., S"
                              value={value}
                              onChange={(e) => updateVariantSizeValue(variantIndex, sizeIndex, valueIndex, e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeVariantSizeValue(variantIndex, sizeIndex, valueIndex)}
                              disabled={size.values.length <= 1}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Minus size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Thumbnail Image</h6>
            <p className="text-sm opacity-85 mt-1">
              Upload the main product image that will be shown in product cards.
            </p>
          </div>
          <div className="col-span-4">
            <input
              ref={thumbnailInputRef}
              onChange={handleThumbnailSelect}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => thumbnailInputRef.current.click()}
              className="flex justify-center items-center gap-3 border border-dashed border-gray-300 h-24 rounded-md text-gray-600 cursor-pointer hover:bg-gray-50"
            >
              <CloudUpload size={24} />
              <div className="font-medium">Select Thumbnail Image</div>
            </div>
            
            {formData.thumbnail.url && (
              <div className="mt-4 relative border rounded-md p-4 max-w-xs bg-white">
                <img 
                  src={formData.thumbnail.url} 
                  alt="Product thumbnail" 
                  className="h-40 object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, thumbnail: { url: '', publicId: '' } })}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SEO Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 border-b border-dashed border-gray-300 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">SEO Settings</h6>
            <p className="text-sm opacity-85 mt-1">
              Improve visibility on search engines by filling these fields.
            </p>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-6">
            <Input
              type="text"
              label="Meta Title"
              placeholder="Meta title (max 60 characters)"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              maxLength={60}
              suffix={`${formData.metaTitle.length}/60`}
              suffixClassName="opacity-70"
              className="col-span-full"
            />
            <Textarea
              label="Meta Description"
              placeholder="Meta description (max 160 characters)"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              maxLength={160}
              rows={3}
              className="col-span-full"
            />
            <Input
              type="text"
              label="Meta Keywords"
              placeholder="keyword1, keyword2, keyword3"
              value={formData.metaKeywords}
              onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
              helperText="Separate keywords with commas (max 10 keywords)"
              className="col-span-full"
            />
            <Input
              type="text"
              label="Canonical URL"
              placeholder="https://example.com/product-url"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              className="col-span-full"
            />
          </div>
        </div>

        {/* Status & Flags */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 pb-10">
          <div className="col-span-2 text-gray-900">
            <h6 className="font-bold text-lg">Status & Flags</h6>
            <p className="text-sm opacity-85 mt-1">
              Set the visibility and special flags for this product.
            </p>
          </div>
          <div className="col-span-4 space-y-4">
            <Switch
              checked={formData.status}
              onChange={() => setFormData({ ...formData, status: !formData.status })}
              label="Active Status"
              labelClassName="font-medium"
              helperText="When disabled, this product will not be visible to customers."
            />
            <Switch
              checked={formData.featured}
              onChange={() => setFormData({ ...formData, featured: !formData.featured })}
              label="Featured Product"
              labelClassName="font-medium"
              helperText="Featured products may be highlighted in special sections of your store."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link to="/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct; 