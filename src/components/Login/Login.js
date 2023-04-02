import { React, useState, useEffect } from "react"
import {
  Avatar,
  Container,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
  Link,
} from "@mui/material"
import { Box } from "@mui/system"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate } from "react-router-dom"
import { checkLoggedIn } from "../Authorization"

import "./Login.css"
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }

  return false
}

export default function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    if (checkLoggedIn()) {
      navigate("/products", { replace: true })
    }
  }, [])

  const setAccess = async (token) => {
    const header = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const rawResponse = await fetch("http://localhost:8080/api/users", header)
      const status = await rawResponse.status

      if (status === 200) {
        sessionStorage.setItem("auth-token", window.btoa("ADMIN-ROLE-ONLY"))
      } else if (status === 403) {
      } else {
        const error = new Error()
        error.message = "Something went wrong"
        throw error
      }

      window.location.reload()
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }

  const loginUser = async (email, password) => {
    const params = { username: email, password: password }

    try {
      const rawResponse = await fetch("http://localhost:8080/api/auth/signin", {
        body: JSON.stringify(params),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })

      const response = await rawResponse.json()

      if (rawResponse.ok) {
        sessionStorage.setItem("access-token", response.token)

        setAccess(response.token)
      } else {
        const error = new Error()
        error.message = response.message || "Something went wrong"
        throw error
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
    return
  }
  const formControlStyle = { margin: 1, width: 300 } // style for the inputs

  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])

  const validateCredentials = (e) => {
    e.preventDefault()

    if (password === "" || email === "") {
      alert("All Fields are Mandatory!")
      return
    }

    if (!ValidateEmail(email)) {
      alert("You have entered an invalid email address!")
      return
    }

    if (password.length < 6) {
      alert("Password must be above 6 characters")
      return
    }

    loginUser(email, password)
  }

  return (
    <div>
      <div className="login">
        <form onSubmit={(e) => validateCredentials(e)}>
          <Container className="container">
            <Stack className="stack">
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
              <Typography
                sx={{ fontWeight: "bold", fontFamily: "revert", mb: 1 }}
              >
                Sign In
              </Typography>

              {/* Form Inputs */}
              <FormControl id="email" sx={formControlStyle}>
                <TextField
                  required
                  name="email"
                  label="Email Address "
                  variant="outlined"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                ></TextField>
              </FormControl>
              <FormControl id="pass" sx={formControlStyle}>
                <TextField
                  required
                  name="password"
                  label="Password "
                  variant="outlined"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                ></TextField>
              </FormControl>

              {/* Sign In button */}
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 300, mt: 1 }}
              >
                SIGN IN
              </Button>

              {/* Link below the button to SIGN UP */}
              <Box sx={{ display: "flex", width: 300 }}>
                <Link href="signup" sx={{ mt: 1, fontSize: 14 }}>
                  Don't have an account? Sign Up
                </Link>
              </Box>
            </Stack>
          </Container>
        </form>
      </div>
    </div>
  )
}
