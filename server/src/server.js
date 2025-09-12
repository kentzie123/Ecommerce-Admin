// Load environment variables
import "dotenv/config";

// Imports
import app from "./app.js";
import connectDB from "./config/db.js";

// Routes
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";


app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.get("/api/test", (req, res) => {
  res.json({ status: "OK" });
});

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
