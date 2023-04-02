import React, { useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
  Avatar,
  Container,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
  Link,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

// main SignUp component
export default function SignUp() {
  const navigate = useNavigate()
  const errors = { color: "red", fontSize: 14 }
  const formControlStyle = { margin: 1.5, width: 300, display: "block" } // style for the inputs

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpass: "",
    contactNumber: "",
  }
  const snackbarPosition = { vertical: "top", horizontal: "right" }

  // const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(initialValue)
  const [formErrors, setFormErrors] = useState(initialValue)
  const [isSubmit, setIsSubbmit] = useState(false)
  const [open, setOpen] = useState(false)

  const { vertical, horizontal } = snackbarPosition

  const [errorMessage, setErrorMessage] = useState({
    severity: "info",
    message: "",
  })

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  const changeHandler = (event) => {
    const { name, value } = event.target
    setUserDetails({ ...userDetails, [name]: value })
  }

  const validateUser = (user) => {
    const errors = {}
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if (!user.firstName) {
      errors.firstName = "First Name is required"
    }
    if (!user.lastName) {
      errors.lastName = "Last Name is required"
    }
    if (!user.email) {
      errors.email = "Email is required"
    } else if (!regex.test(user.email)) {
      errors.email = "Email is not in valid format"
    }

    if (!user.password) {
      errors.password = "Password is required"
    } else if (user.password.length < 6) {
      errors.password = "Password must be of minimum of 6 charecter"
    } else if (user.password.length > 40) {
      errors.password = "Password cannot be exceed more than 40 charecter"
    }

    if (!user.confirmpass) {
      errors.confirmpass = "Confirm Password is required"
    } else if (user.password !== user.confirmpass) {
      errors.confirmpass = "Confirm Password is not same as password"
    }

    if (!user.contactNumber) {
      errors.contactNumber = "Contact Number is required"
    }

    return errors
  }

  useEffect(() => {
    async function addUser() {
      // You can await here
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const params = {
          email: userDetails.email,
          role: ["USER"],
          password: userDetails.password,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          contactNumber: userDetails.contactNumber,
        }
        // console.log(params)
        try {
          const fetchData = async () => {
            const rawResponse = await fetch(
              "http://localhost:8080/api/auth/signup",
              {
                body: JSON.stringify(params),
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
              }
            )
            const status = await rawResponse.status
            const response = await rawResponse.json()

            if (status === 200) {
              setErrorMessage({
                severity: "success",
                message: response.message,
              })
              setOpen(true)
              setUserDetails(initialValue)
              navigate("/login")
            }
          }
          fetchData()
        } catch (error) {
          setErrorMessage({
            severity: "error",
            message: error.response.data.message,
          })
          setOpen(true)
        }
      }
    }
    addUser()
  }, [formErrors])

  const formRegister = (event) => {
    event.preventDefault()
    // console.log(userDetails);
    setFormErrors(validateUser(userDetails))
    setIsSubbmit(true)
  }

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: "whitesmoke",
          }}
        >
          {/* Lock Icon at the top of Sign Up Page*/}
          <Avatar
            sx={{
              display: "div",
              backgroundColor: "secondary.dark",
              textAlign: "center",
              m: 1,
            }}
          >
            <LockOutlinedIcon
              sx={{ color: "white", margin: "auto" }}
            ></LockOutlinedIcon>
          </Avatar>
          <Typography sx={{ fontWeight: "bold", fontFamily: "revert", mb: 1 }}>
            Sign Up
          </Typography>

          {/* Form Inputs */}
          {/* {((Object.keys(formErrors).length === 0 && isSubmit)) && <Alert severity="success"></Alert>} */}
          <form>
            <FormControl id="firstname" sx={formControlStyle}>
              <TextField
                label="First Name*"
                variant="outlined"
                size="small"
                type="text"
                name="firstName"
                onChange={changeHandler}
                fullWidth
                value={userDetails.firstName}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.firstName}</span>{" "}
              </Box>
            </FormControl>
            <FormControl id="lastname" sx={formControlStyle}>
              <TextField
                label="Last Name*"
                variant="outlined"
                size="small"
                type="text"
                name="lastName"
                onChange={changeHandler}
                fullWidth
                value={userDetails.lastName}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.lastName}</span>{" "}
              </Box>
            </FormControl>
            <FormControl id="email" sx={formControlStyle}>
              <TextField
                label="Email Address*"
                variant="outlined"
                size="small"
                type="email"
                name="email"
                onChange={changeHandler}
                fullWidth
                value={userDetails.email}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.email}</span>{" "}
              </Box>
            </FormControl>
            <FormControl id="password" sx={formControlStyle}>
              <TextField
                label="Password*"
                variant="outlined"
                size="small"
                type="password"
                name="password"
                onChange={changeHandler}
                fullWidth
                value={userDetails.password}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.password}</span>{" "}
              </Box>
            </FormControl>
            <FormControl id="confirmpass" sx={formControlStyle}>
              <TextField
                label="Confirm Password*"
                variant="outlined"
                size="small"
                type="password"
                name="confirmpass"
                onChange={changeHandler}
                fullWidth
                value={userDetails.confirmpass}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.confirmpass}</span>{" "}
              </Box>
            </FormControl>
            <FormControl id="contactNumbernumber" sx={formControlStyle}>
              <TextField
                label="Contact Number*"
                variant="outlined"
                size="small"
                type="tel"
                name="contactNumber"
                onChange={changeHandler}
                fullWidth
                value={userDetails.contactNumber}
              ></TextField>
              <Box sx={errors}>
                {" "}
                <span>{formErrors.contactNumber}</span>{" "}
              </Box>
            </FormControl>

            {/* Sign Up button */}
            <Button
              variant="contained"
              sx={formControlStyle}
              type="submit"
              onClick={formRegister}
              value="Registered"
            >
              SIGN UP
            </Button>
          </form>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            key={vertical + horizontal}
            action={action}
          >
            <Alert
              onClose={handleClose}
              severity={errorMessage.severity}
              sx={{ width: "100%" }}
            >
              {errorMessage.message}
            </Alert>
          </Snackbar>
          {/* Link below the button to SIGN IN */}
          <Box
            sx={{ display: "flex", width: 300, flexDirection: "row-reverse" }}
          >
            <Link href="login" sx={{ fontSize: 14 }}>
              Already have an account? Sign In
            </Link>
          </Box>
        </Stack>
      </Container>
    </div>
  )
}
