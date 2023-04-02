import Snackbar from "@mui/material/Snackbar/Snackbar"
import { React, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MuiAlert from "@mui/material/Alert"
import Alert from "@mui/material/Alert/Alert"

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// })
export default function DeleteProduct() {
  /// this use effect calls database for categories
  // calls db to get list of categories

  // get auth token
  const authToken = sessionStorage.getItem("access-token")
  const productId = useParams().id

  // const [open, setOpen] = React.useState(false)

  // const handleClick = () => {
  //   setOpen(true)
  // }

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return
  //   }

  //   setOpen(false)
  // }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const rawResponse = await fetch(
          `http://localhost:8080/api/products/${productId}`,
          {
            mehtod: "DELETE",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        const response = await rawResponse.json()
        if (rawResponse.ok) {
          console.log(response.ok)

          return
          // )
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
  return <div></div>
}
