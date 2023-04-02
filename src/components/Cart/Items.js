import React from "react"

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material"

export default function DisplayItem(props) {
  const product = props.productInfo
  const quantity = props.quantity

  return (
    <div className="cart-container">
      <Container
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        {/* Card showing product details to confirm */}
        <Card
          sx={{
            width: 900,
            height: 400,
            display: "flex",
            flexDirection: "row",
            py: 3,
          }}
        >
          {/* Product image */}
          <CardMedia
            component="img"
            height="350"
            sx={{ width: 400, objectFit: "contain" }}
            alt="product image"
            image={product.imageUrl}
          ></CardMedia>
          <CardContent>
            {/* Product name*/}
            <div style={{ padding: 6, display: "flex", alignItems: "center" }}>
              <Typography variant="h5" component="span">
                {product.name}
              </Typography>
            </div>
            {/* Product Quantity */}
            <div style={{ padding: 6, fontSize: 14 }}>
              <Typography component="span">Quantity: </Typography>
              <Typography component="span" fontWeight="bold">
                {quantity}
              </Typography>
            </div>
            {/*  Product Category */}
            <div style={{ padding: 6, fontSize: 14 }}>
              <Typography component="span">Category: </Typography>
              <Typography component="span" fontWeight="bold">
                {product.category}
              </Typography>
            </div>
            {/*  Product Description */}
            <Typography
              style={{ padding: 6, marginBottom: 4 }}
              fontStyle="italic"
            >
              {product.description}
            </Typography>
            <div
              style={{
                padding: 6,
                color: "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/*  Total Price here */}
              <Typography component="span" variant="h6">
                Total Price :
              </Typography>
              <CurrencyRupeeIcon />
              <Typography component="span" variant="h6">
                {quantity * product.price}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
