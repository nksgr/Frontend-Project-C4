import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCart from "@mui/icons-material/ShoppingCart"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15rem",
      "&:focus": {
        width: "15rem",
      },
    },
  },
}))

export default function Header(props) {
  const [isLoggedIn, setLogin] = useState(false)
  const [role, setRole] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    if (Object.keys(sessionStorage).includes("access-token")) {
      sessionStorage.removeItem("access-token")
      sessionStorage.removeItem("user-id")

      if (Object.keys(sessionStorage).includes("auth-token")) {
        sessionStorage.removeItem("auth-token")
      }
    }

    setLogin(false)
    setRole(false)
    navigate("/login")
  }

  useEffect(() => {
    const role =
      sessionStorage.getItem("auth-token") === window.btoa("ADMIN-ROLE-ONLY")
        ? "ADMIN"
        : "USER"
    setRole(role)

    const loginStatus =
      sessionStorage.getItem("access-token") !== null ? true : false
    setLogin(loginStatus)
  }, [role, isLoggedIn])

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <ShoppingCart />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                upgrad E-Shop
              </Typography>
            </Box>
            {isLoggedIn && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                width: "100%",
              }}
            >
              {!isLoggedIn && (
                <Link href="/login" color="inherit" sx={{ mx: 2 }}>
                  Login
                </Link>
              )}
              {!isLoggedIn && (
                <Link href="/signup" color="inherit" sx={{ mx: 2 }}>
                  Sign Up
                </Link>
              )}
              {/* <Link href="" color="inherit" sx={{ mx: 2 }}>
                Home
              </Link> */}
              {isLoggedIn && (
                <Link href="/products" color="inherit" sx={{ mx: 2 }}>
                  Home
                </Link>
              )}
              {role === "ADMIN" && (
                <Link href="/products/add" color="inherit" sx={{ mx: 2 }}>
                  Add Product
                </Link>
              )}

              {/* LOGOUT button */}
              {isLoggedIn && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
