import { React, useState, useEffect } from "react"
import "./ProductDetail.css"
import { useNavigate, useParams } from "react-router-dom"
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import {
  Container,
  Typography,
  FormControl,
  Chip,
  Card,
  CardMedia,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@mui/material"

import Cart from "../../Cart/Cart"

export default function ProductDetail() {
  const [productInfo, setProductInfo] = useState([])
  const [quantity, setQuantity] = useState(0)
  const productId = useParams().id
  const navigate = useNavigate()

  const sendToCart = (e) => {
    navigate(
      "/cart",
      { state: { product: productInfo, quantity: quantity } },
      { replace: true }
    )
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const rawResponse = await fetch(
          `http://localhost:8080/api/products/${productId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
        const response = await rawResponse.json()
        if (rawResponse.ok) {
          setProductInfo(response)

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
  return (
    <div>
      <Container className="productDetailcontianer"></Container>
      {/* Product details card*/}
      <Card className="productDetailcard">
        {/*Product Image here*/}
        <CardMedia
          sx={{ maxWidth: 400, objectFit: "contain" }}
          component="img"
          height="350"
          alt="product image"
          image={productInfo.imageUrl}
        ></CardMedia>
        <CardContent>
          <div className="card-content">
            <Typography variant="h5" component="span">
              {productInfo.name}
            </Typography>
            {/*Product Name*/}
            <Chip
              sx={{ mx: 2 }}
              color="primary"
              size="small"
              label={`Item Availability: ${productInfo.availableItems}`}
            ></Chip>
          </div>
          <div style={{ padding: 6 }}>
            {" "}
            {/*Product Category*/}
            <Typography component="span">Category: </Typography>
            <Typography component="span" fontWeight="bold">
              {productInfo.category}
            </Typography>
          </div>
          {/*Product description*/}
          <Typography
            style={{ padding: 6, marginBottom: 4 }}
            fontStyle="italic"
          >
            {productInfo.description}
          </Typography>
          <div
            style={{
              padding: 6,
              color: "red",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/*Product Price*/}
            <CurrencyRupeeIcon />{" "}
            <Typography component="span" variant="h6">
              {productInfo.price}
            </Typography>
          </div>
          <form onSubmit={(e) => sendToCart(e)}>
            <FormControl sx={{ my: 2, mx: 1 }}>
              {" "}
              {/* Box to enter quantity */}
              <TextField
                id="outlined-basic"
                required
                label="Enter Quantity *"
                type="number"
                variant="outlined"
                size="large"
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{ min: 0, max: productInfo.availableItems }}
                sx={{ width: 200 }}
              />
            </FormControl>
            <CardActions>
              {" "}
              {/* Order button */}
              <Button size="medium" variant="contained" type="submit">
                PLACE ORDER
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <Container />
    </div>
  )
}
