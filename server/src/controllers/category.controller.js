// Models
import Category from "../models/category.js";

// cloudinary
import { uploadImage } from "../utils/uploadImage.js";
import { deleteCloudinaryImage } from "../utils/deleteCloudinaryImage.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    if (!categoryId) {
      return res.status(400).json({ message: "Please provide category ID" });
    }
    const selectedCategory = await Category.findOne({ _id: categoryId });
    res.status(200).json(selectedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getParentCategories = async (req, res) => {
  try {
    const parents = await Category.find({
      parent_category: null,
      sub_parent: null,
      status: true,
    });
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSubCategories = async (req, res) => {
  const parentId = req.params.parentId;
  try {
    const subs = await Category.find({
      parent_category: parentId,
      sub_parent: null,
      status: true,
    });
    res.status(200).json(subs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const getSubSubCategories = async (req, res) => {
  const parentId = req.params.parentId;

  try {
    const subSubCategories = await Category.find({
      sub_parent: parentId,
      status: true,
    });
    res.status(200).json(subSubCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const createCategory = async (req, res) => {
  const {
    name,
    slug,
    parent_category,
    sub_parent,
    description,
    metaTitle,
    metaDescription,
    canonicalUrl,
    thumbnail,
    status,
  } = req.body;

  let thumbnailURL = "";
  let thumbnailPublicID = "";

  try {
    const slugExist = await Category.findOne({ slug: slug });

    if (slugExist) {
      return res.status(400).json({ message: "Slug already exist" });
    }

    if (!name || !slug) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (thumbnail.url) {
      const uploadResult = await uploadImage(
        thumbnail.url,
        "categories-thumbnail"
      );

      if (!uploadResult.success) {
        return res.status(400).json({ message: uploadResult.error });
      }

      thumbnailURL = uploadResult.url;
      thumbnailPublicID = uploadResult.publicId;
    }

    const newCategory = new Category({
      name,
      slug,
      parent_category: parent_category?.value,
      sub_parent: sub_parent?.value,
      description,
      metaTitle,
      metaDescription,
      canonicalUrl,
      thumbnail: {
        url: thumbnailURL,
        publicId: thumbnailPublicID,
      },
      status,
    });
    await newCategory.save();

    res.status(201).json("Created category successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  const updatedFields = req.body;

  try {
    const category = await Category.findOne({ _id: categoryId });
    const slugExist = await Category.findOne({ slug: updatedFields.slug });

    if (slugExist && slugExist.slug !== category.slug) {
      return res.status(400).json({ message: "Slug already exist" });
    }
    if (!updatedFields.name || !updatedFields.slug) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    let isNewImage = !updatedFields.thumbnail.publicId;

    if (isNewImage) {
      const toDeleteImage = category.thumbnail.publicId;
      let deleteResult = null;
      if (toDeleteImage) {
        deleteResult = await deleteCloudinaryImage(toDeleteImage);
      }

      if (!deleteResult.success) {
        return res.status(400).json({ message: deleteResult.error });
      }

      const uploadResult = await uploadImage(
        updatedFields.thumbnail.url,
        "categories-thumbnail"
      );

      if (!uploadResult.success) {
        return res.status(400).json({ message: uploadResult.error });
      }

      updatedFields.thumbnail.url = uploadResult.url;
      updatedFields.thumbnail.publicId = uploadResult.publicId;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedFields,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
