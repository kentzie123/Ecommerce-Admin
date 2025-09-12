import "./App.css";

// React Router
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import CreateProduct2 from "./pages/CreateProduct2";

// Toast
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div data-theme="light">
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route
            path="/categories/edit/:categoryId"
            element={<EditCategory />}
          />

          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/create2" element={<CreateProduct2 />} />
          <Route path="/products/edit/:productId" element={<EditProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
