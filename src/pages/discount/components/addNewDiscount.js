import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BaseURL from "../../../Axios";
import "../discounts.scss";
import { createDiscount } from "../discountService";

function AddNewDiscount() {
  const [discount_name, setDiscountName] = useState("");
  const [discount_type, setDiscountType] = useState("");
  const [discount_amount, setDiscountAmount] = useState("");
  const [duration_limit_in_intervals, setInterval] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      discount_name,
      discount_type,
      discount_amount,
      duration_limit_in_intervals,
    };


    createDiscount(formData, (response) => {
      console.log(response)
    })
  };

  const btnStyle2 = {
    borderColor: "#252929",
    height: "38px",
    textAlign: "right",
    color: "white",
    fontWeight: "bold",
    padding: "5px 5px",
    margin: "6px 0 0 0",
    backgroundColor: "#252929",
    "&:hover": {
      borderColor: "#252929",
      color: "#252929",
      backgroundColor: "white",
    },
  };

  return (
    <div>
      <span className="action_heading">Create New Discount</span>
      <form onSubmit={handleFormSubmit} className="discounts_container_form">
            <TextField
              label="Discount Name"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{style: {fontSize: 12}}}
              value={discount_name}
              onChange={(e) => setDiscountName(e.target.value)}
              margin="normal"
              required
            />

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
          >
            <InputLabel>Discount Type</InputLabel>
            <Select
              value={discount_type}
              onChange={(e) => setDiscountType(e.target.value)}
              size="small"
              InputLabelProps={{style: {fontSize: 12}}}
              label="Discount Type"
            >
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Discount Amount"
            variant="outlined"
            fullWidth
            size="small"
            value={discount_amount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            margin="normal"
            InputLabelProps={{style: {fontSize: 12}}}
            required
          />

          <TextField
            label="Interval"
            variant="outlined"
            fullWidth
            size="small"
            value={duration_limit_in_intervals}
            onChange={(e) => setInterval(e.target.value)}
            margin="normal"
            InputLabelProps={{style: {fontSize: 12}}}
            required
          />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              margin="normal"
              sx={btnStyle2}
            >
              Submit
            </Button>
      </form>
    </div>
  );
}

export default AddNewDiscount;