import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import EditIcon from "@mui/icons-material/Edit"
import { useAuthContext } from "../../../App"
import { Link } from "react-router-dom"
import DeleteProduct from "../DeleteProduct/ProductDelete"
import { React, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const AdminOptions = (props) => {
  const role =
    sessionStorage.getItem("auth-token") === window.btoa("ADMIN")
      ? "ADMIN"
      : "USER"
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (selection) => {
    setOpen(false)
    // if (selection) {
    //   return <div>Hello</div>
    //   // return <DeleteProduct prodId={props.productId} />
    // }
  }

  if (role === "ADMIN") {
    return (
      <Stack direction="row">
        <IconButton
          aria-label="delete"
          // component={Link}
          // to={`/products/delete/${props.productId}`}
          variant="contained"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="edit"
          color="primary"
          component={Link}
          to={`/products/update/${props.productId}`}
          variant="contained"
        >
          <EditIcon />
        </IconButton>
      </Stack>
    )
  } else {
    return <div></div>
  }
}

export default function ProductCard(props) {
  let productData = props.product

  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="200"
        image={productData.imageUrl}
        alt={productData.name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Box component="span" m={1} className="title">
          <Typography variant="h6" component="div">
            {productData.name}
          </Typography>

          <Typography variant="h6" component="div">
            ₹{productData.price}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" className="desc">
          {productData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          component="span"
          m={1}
          className="title
      "
        >
          <Button
            component={Link}
            to={`/products/${productData.id}`}
            variant="contained"
          >
            {" "}
            BUY
          </Button>
          <AdminOptions
            productId={productData.id}
            productName={productData.name}
          />
        </Box>
      </CardActions>
    </Card>
  )
}
