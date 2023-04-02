import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Toggle from "./Toggle"
import ProductsListing from "./ProductsListing"
import Dropdown from "./DropDown"
import { checkLoggedIn } from "../../Authorization"

export default function ProductsHome(props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (checkLoggedIn() === false) {
      navigate("/login", { replace: true })
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState(props.term)

  const [allProducts, setAllProducts] = useState([]) // stores all products, api called from db
  const [categories, setCategories] = useState([]) // stores categories, api called from db

  let productsDisplayed = []

  const updateDisplay = (products) => {
    // updates the products that are currently displayed
    setCurrentProducts(products)
  }

  const [currentProducts, setCurrentProducts] = useState([]) // to store all the items that currently displayed
  const [currentCategory, setCurrentCategory] = useState([]) // stores the category selected in the toggle

  // handlers -> toggleButton Handler, dropdown handler, search handler.

  const toggleHandler = (category) => {
    if (category === "all") {
      productsDisplayed = allProducts
    } else {
      productsDisplayed = allProducts.filter((product) => {
        return product.category === category
      })
    }
    setCurrentCategory(category)

    updateDisplay(productsDisplayed)
  }

  const dropdownHandler = (option) => {
    let products = allProducts.filter((product) => {
      return currentCategory === "all"
        ? product
        : product.category === currentCategory
    })

    switch (option) {
      case 1:
        productsDisplayed = products
        break
      case 2:
        productsDisplayed = products.sort((b, a) =>
          b.price > a.price ? 1 : a.price > b.price ? -1 : 0
        )

        break
      case 3:
        productsDisplayed = products.sort((a, b) =>
          b.price > a.price ? 1 : a.price > b.price ? -1 : 0
        )

        break
      case 4:
        productsDisplayed = products.reverse()

        break

      default:
        break
    }

    updateDisplay(productsDisplayed)
  }

  useEffect(() => {
    /// this use effect calls database for categories
    // calls db to get list of categories

    try {
      const fetchData = async () => {
        const rawResponse = await fetch(
          "http://localhost:8080/api/products/categories",
          {
            mehtod: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
        const response = await rawResponse.json()
        if (rawResponse.ok) {
          setCategories(response)
          setCurrentCategory("all")

          return
        } else {
          const error = new Error()
          error.message = response.message || "Something went wrong"
          throw error
        }
      }
      fetchData()
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }, [])

  useEffect(() => {
    /// this use effect calls database for getting all products stored in DB
    // calls db to get list of products stored in db
    try {
      const fetchData = async () => {
        const rawResponse = await fetch("http://localhost:8080/api/products", {
          mehtod: "GET",
          headers: {
            accept: "application/json",
          },
        })
        const response = await rawResponse.json()
        if (rawResponse.ok) {
          setAllProducts(response)
          setCurrentProducts(response)
        } else {
          const error = new Error()
          error.message = response.message || "Something went wrong"
          throw error
        }
      }

      fetchData()
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }, [])

  return (
    // Components rendered on this page
    <div className="home">
      <br></br>
      <Toggle
        categories={categories}
        products={allProducts}
        toggleHandler={toggleHandler}
      />
      <br></br>
      <Dropdown className="dropdown" dropdownHandler={dropdownHandler} />
      <br></br>
      <br></br>
      <ProductsListing
        currentProducts={currentProducts}
        allProducts={allProducts}
      />
    </div>
  )
}
