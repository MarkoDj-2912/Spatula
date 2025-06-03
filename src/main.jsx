import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import SearchResults from "./pages/SearchResults";
import Layout from "./layout/Layout";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="category/:type" element={<CategoryPage />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="search/:query" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
