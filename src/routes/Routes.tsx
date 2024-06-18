import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage"
import ItemPage from "../pages/Item-page/ItemPage"
import PageCart from "../pages/Cart/PageCart";
import AdmPage from "../pages/Adm/AdmPage";

export function CatalogRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cart" element={<PageCart/>} />
        <Route path="/Item-page/:id" element={<ItemPage/>} />        
        <Route path="/adm-page" element={<AdmPage/>} />
      </Routes>
    </BrowserRouter>
  )
}