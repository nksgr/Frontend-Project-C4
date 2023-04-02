import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

export default function SelectAutoWidth(props) {
  const [dropdown, setDropDown] = React.useState("")

  const handleChange = (event) => {
    setDropDown(event.target.value)
  }

  const dropdownSelection = (value) => {
    props.dropdownHandler(value)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={dropdown}
          onChange={handleChange}
          autoWidth
          label="Sort By"
        >
          <MenuItem value="">
            <em>Select...</em>
          </MenuItem>
          <MenuItem
            value={0}
            onClick={(e, v) => {
              dropdownSelection(1)
            }}
          >
            Default
          </MenuItem>
          <MenuItem
            value={1}
            onClick={(e, v) => {
              dropdownSelection(2)
            }}
          >
            Price: Low to High
          </MenuItem>
          <MenuItem
            value={2}
            onClick={(e, v) => {
              dropdownSelection(3)
            }}
          >
            Price: High to low
          </MenuItem>
          <MenuItem
            value={3}
            onClick={(e, v) => {
              dropdownSelection(4)
            }}
          >
            Newest
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
