import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material"
import { React, useEffect, useState } from "react"
import CreatableSelect from "react-select/creatable"

const style = {
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
}
const formControlStyle = { margin: 1.5, width: 300, display: "block" } // style for the inputs

const initialValue = {
  name: "",
  price: 0,
  description: "",
  manufacturer: "",
  availableItems: 0,
  imageUrl: "",
}

export default function AddProduct() {
  const [allCategories, setAllCategories] = useState()
  const [category, setCategory] = useState("")
  const [productDetails, setProductDetails] = useState(initialValue)

  const changeHandler = (event) => {
    const { name, value } = event.target
    setProductDetails({ ...productDetails, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log()
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
          const categories = response.map((cat) => {
            return { name: "category", value: cat, label: cat }
          })
          setAllCategories(categories)

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

  const handleChange = (event) => {
    setCategory(event.value)
    console.log(category)
  }

  return (
    <div className="form-container">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          {" "}
          {/* Add product heading */}
          <Typography variant="h5" sx={{ p: 2 }}>
            Add Product
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Form inputs */}
          <FormControl id="pname" sx={formControlStyle}>
            <TextField
              label="Name "
              variant="outlined"
              size="small"
              type="text"
              name="name"
              onChange={changeHandler}
              required
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl
            id="category"
            sx={{ minWidth: 300, m: 1.5 }}
            size="small"
          >
            {/* Category select dropdown */}

            <CreatableSelect
              isClearable
              required
              name="category"
              placeholder={"Category *"}
              options={allCategories}
              onChange={(event) => {
                handleChange(event)
              }}
            />
            {/* <Select
              labelId="category-select"
              id="category-select"
              value={category}
              required
              label="Category *"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select...</em>
              </MenuItem>

              {allCategories?.map((category, k) => {
                return (
                  <MenuItem key={k} value={category}>
                    {category}
                  </MenuItem>
                )
              })}
            </Select> */}
          </FormControl>
          <FormControl id="manufacturer" sx={formControlStyle}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              required
              size="small"
              type="text"
              name="manufacturer"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="availableitems" sx={formControlStyle}>
            <TextField
              label="Available Items"
              variant="outlined"
              required
              onChange={changeHandler}
              size="small"
              type="number"
              name="availableItems"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="price" sx={formControlStyle}>
            <TextField
              label="Price"
              variant="outlined"
              required
              size="small"
              type="number"
              name="price"
              fullWidth
              onChange={changeHandler}
            ></TextField>
          </FormControl>
          <FormControl id="imgurl" sx={formControlStyle}>
            <TextField
              label="Image URL"
              variant="outlined"
              size="small"
              required
              type="text"
              name="imageUrl"
              fullWidth
              onChange={changeHandler}
            ></TextField>
          </FormControl>
          <FormControl id="pdesc" sx={formControlStyle}>
            <TextField
              label="Product Description"
              variant="outlined"
              size="small"
              required
              type="text"
              name="description"
              onChange={changeHandler}
              fullWidth
            ></TextField>
          </FormControl>
          {/* Button to save the new Product */}
          <Button
            sx={formControlStyle}
            size="small"
            variant="contained"
            color="primary"
            type="submit"
          >
            ADD PRODUCT
          </Button>
        </form>
      </Container>
    </div>
  )
}
