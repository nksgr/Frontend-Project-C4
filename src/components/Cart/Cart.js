import { useLocation } from "react-router-dom"
import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import DisplayItems from "./Items"
import SelectAddress from "./SelectAddress"
import ConfirmItems from "./ConfirmOrder"
import { checkLoggedIn } from "../Authorization"
import { useNavigate } from "react-router-dom"

const steps = ["Items", "Select Address", "Confirm Order"]

export default function Cart() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (checkLoggedIn() === false) {
      navigate("/login", { replace: true })
    }
  }, [])
  const cartItems = useLocation()
  const { product, quantity } = cartItems.state
  const [activeStep, setActiveStep] = React.useState(0)
  const [addressSelected, setAddress] = React.useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ width: "100%", my: 3, px: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Order Placed!</Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box>
            {activeStep === 0 && (
              <div>
                <DisplayItems productInfo={product} quantity={quantity} />{" "}
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <SelectAddress />{" "}
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <ConfirmItems productInfo={product} quantity={quantity} />{" "}
              </div>
            )}
          </Box>
          <Box sx={{ px: 5, display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}
