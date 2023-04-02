import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"

const style = {
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
}
const formControlStyle = { margin: 1.5, width: 300, display: "block" } // style for the inputs

export default function UpdateProduct() {
  return (
    <div className="form-contianer">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography variant="h5" sx={{ p: 2 }}>
            Modify Product
          </Typography>
        </div>
        <form>
          {" "}
          {/* Form inputs */}
          <FormControl id="pname" sx={formControlStyle}>
            <TextField
              label="Name *"
              variant="outlined"
              size="small"
              type="text"
              name="pname"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="category" sx={formControlStyle}>
            <TextField
              label="Category *"
              variant="outlined"
              size="small"
              type="text"
              name="category"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="manufacturer" sx={formControlStyle}>
            <TextField
              label="Manufacturer *"
              variant="outlined"
              size="small"
              type="text"
              name="manufacturer"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="availableitems" sx={formControlStyle}>
            <TextField
              label="Available Items *"
              variant="outlined"
              size="small"
              type="number"
              name="availableitems"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="price" sx={formControlStyle}>
            <TextField
              label="Price *"
              variant="outlined"
              size="small"
              type="number"
              name="price"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="imgurl" sx={formControlStyle}>
            <TextField
              label="Image URL"
              variant="outlined"
              size="small"
              type="text"
              name="imgurl"
              fullWidth
            ></TextField>
          </FormControl>
          <FormControl id="pdesc" sx={formControlStyle}>
            <TextField
              label="Product Description"
              variant="outlined"
              size="small"
              type="text"
              name="pdesc"
              fullWidth
            ></TextField>
          </FormControl>
          {/* Button to save the new changes to the product */}
          <Button
            sx={formControlStyle}
            size="small"
            variant="contained"
            color="primary"
          >
            MODIFY PRODUCT
          </Button>
        </form>
      </Container>
    </div>
  )
}
