import { React, useState, useEffect } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export default function Toggle(props) {
  const [alignment, setAlignment] = useState("all")

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }
  const categorySelected = (value) => {
    props.toggleHandler(value)
  }

  return (
    <div className="toggle">
      <br></br>
      <ToggleButtonGroup
        value={alignment}
        color="primary"
        exclusive
        onLoad={() => categorySelected("all")}
        onChange={handleChange}
        defaultValue={"all"}
        aria-label="categories"
      >
        <ToggleButton value="all" onClick={(e, v) => categorySelected("all")}>
          All
        </ToggleButton>
        {props.categories?.map((category, k) => (
          <ToggleButton
            value={category}
            key={k}
            onClick={(e, v) => {
              categorySelected(category)
            }}
          >
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )

  // return <div>Hello WOrld</div>
}
