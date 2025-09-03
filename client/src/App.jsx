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
          <Route path="/categories/edit/:categoryId" element={<EditCategory />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
