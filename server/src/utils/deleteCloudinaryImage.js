import cloudinary from "../config/cloudinary.js";

export const deleteCloudinaryImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error("Deletion failed:", error.message);
    return { success: false, error: error.message };
  }
};