import logo from "./logo.svg"
import "./App.css"
import React, { createContext, useState } from "react"
import ProductDetail from "./components/Products/ProductDetail/ProductDetail"

import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Header from "./components/Header/Header"
import Login from "./components/Login/Login"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Cart from "./components/Cart/Cart"
import ProductsHome from "./components/Products/Home/ProductsHome"
import UpdateProduct from "./components/Products/UpdateProduct/UpdateProduct"

import Logout from "./components/Logout/Logout"
import AddProduct from "./components/Products/AddProduct/AddProduct"
import Signup from "./components/Signup/Signup"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
})

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsHome />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
