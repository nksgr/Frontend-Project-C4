import React from "react"

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material"

export default function ConfirmItems(props) {
  const product = props.productInfo
  const quantity = props.quantity
  return (
    <div className="cart-container">
      {" "}
      <Container>
        <Card sx={{ width: "100%", p: 2, display: "flex" }}>
          <div
            id="productdetail"
            style={{ display: "flex", flexDirection: "column", width: "65%" }}
          >
            {/*Product name here*/}
            <Typography variant="h6" sx={{ padding: 1 }}>
              {product.name}
            </Typography>
            <div style={{ padding: 6, fontSize: 14 }}>
              {" "}
              {/*Product Quantity*/}
              <Typography component="span"> Quantity: </Typography>
              <Typography component="span" fontWeight="bold">
                {quantity}
              </Typography>
            </div>
            <div style={{ padding: 6, fontSize: 14 }}>
              {" "}
              {/*Product Category*/}
              <Typography component="span">Category: </Typography>
              <Typography component="span" fontWeight="bold">
                {product.category}
              </Typography>
            </div>
            {/* Product descirption */}
            <Typography
              style={{ padding: 6, marginBottom: 4 }}
              fontStyle="italic"
            >
              {product.description}
            </Typography>

            {/*Total price section */}
            <div
              style={{
                padding: 6,
                color: "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography component="span" variant="h6">
                Total Price :{" "}
              </Typography>
              <CurrencyRupeeIcon />{" "}
              <Typography component="span" variant="h6">
                {quantity * product.price}
              </Typography>
            </div>
          </div>

          {/* vertical line dividing the details sections */}
          <Divider orientation="vertical" flexItem sx={{ m: 1 }} />

          <div id="addressdetail" style={{ width: "35%" }}>
            {/* Address comes here */}
            <Typography variant="h6" sx={{ padding: 1 }}>
              Address Details
            </Typography>
            <div style={{ padding: 6 }}>
              <Typography variant="body1">Address Line Place Holder</Typography>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}
