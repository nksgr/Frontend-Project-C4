import { React, useState, useEffect } from "react"
import {
  Button,
  Container,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@mui/material"

const style = {
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
}
const formControlStyle = { margin: 1.5, width: 300, display: "block" } // style for the inputs

export default function SelectAddress() {
  const [addressList, setAddress] = useState([])
  const [newAddress, setNewAddress] = useState([])
  return (
    <div className="cart-container form-container">
      <Container
        sx={{
          width: 800,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          m: 2,
        }}
      >
        <div>
          {" "}
          {/* Select Address Dropdown here */}
          <Typography>Select Address:</Typography>
          <FormControl sx={{ minWidth: 500, width: 700, maxWidth: 800 }}>
            <Select size="small" renderValue="Select.."></Select>
          </FormControl>
        </div>
        <div style={style}>
          <Typography component="div" variant="body2" sx={{ m: 2 }}>
            {" "}
            -OR-{" "}
          </Typography>
        </div>
        {/*Section to Add a new Address*/}
        <div style={style}>
          <Typography component="div" variant="h6" sx={{ m: 2 }}>
            Add Address
          </Typography>
        </div>
        <div style={style}>
          <form>
            {" "}
            {/* Form inputs */}
            <FormControl id="name" sx={formControlStyle}>
              <TextField
                label="Name *"
                variant="outlined"
                size="small"
                type="text"
                name="name"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="contactnumber" sx={formControlStyle}>
              <TextField
                label="Contact Number *"
                variant="outlined"
                size="small"
                type="tel"
                name="contact"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="street" sx={formControlStyle}>
              <TextField
                label="Street *"
                variant="outlined"
                size="small"
                type="text"
                name="street"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="city" sx={formControlStyle}>
              <TextField
                label="City *"
                variant="outlined"
                size="small"
                type="text"
                name="city"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="state" sx={formControlStyle}>
              <TextField
                label="State *"
                variant="outlined"
                size="small"
                type="text"
                name="state"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="landmark" sx={formControlStyle}>
              <TextField
                label="Landmark"
                variant="outlined"
                size="small"
                type="text"
                name="landmark"
                fullWidth
              ></TextField>
            </FormControl>
            <FormControl id="zipcode" sx={formControlStyle}>
              <TextField
                label="Zip Code *"
                variant="outlined"
                size="small"
                type="number"
                name="zipcode"
                fullWidth
              ></TextField>
            </FormControl>
            {/* Button to save the new Address */}
            <Button
              sx={formControlStyle}
              size="small"
              variant="contained"
              color="primary"
            >
              SAVE ADDRESS
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}
