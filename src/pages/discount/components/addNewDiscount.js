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
  const [discount_code, setDiscountCode] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (discount_type === "percentage" && (discount_amount < 0.1 || discount_amount > 0.9)) {
      alert("Percentage discount amount must be between 0.1 and 0.9");
      return;
    }

    const formData = {
      discount_code,
      discount_name,
      discount_type,
      discount_amount,
      duration_limit_in_intervals,
      description,
      expires_on: '0000-00-00 00:00:00'
    };

    console.log(formData)

    createDiscount(formData, (response) => {
      console.log(response);
      window.location.reload(false);
    });
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
          InputLabelProps={{ style: { fontSize: 12 } }}
          value={discount_name}
          onChange={(e) => setDiscountName(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { fontSize: 12 } }}
          required
        />

        <TextField
          label="Discount Code"
          variant="outlined"
          fullWidth
          size="small"
          value={discount_code}
          onChange={(e) => setDiscountCode(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { fontSize: 12 } }}
          required
        />

        <FormControl variant="outlined" fullWidth margin="normal" size="small">
          <InputLabel>Discount Type</InputLabel>
          <Select
            value={discount_type}
            onChange={(e) => setDiscountType(e.target.value)}
            size="small"
            InputLabelProps={{ style: { fontSize: 12 } }}
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
          InputLabelProps={{ style: { fontSize: 12 } }}
          required
        />

          <Select
            value={duration_limit_in_intervals}
            onChange={(e) => setInterval(e.target.value)}
            size="small"
            InputLabelProps={{ style: { fontSize: 12 } }}
            label="Interval"
            fullWidth
          >
            <MenuItem value="3 Months">3 Months</MenuItem>
            <MenuItem value="6 Months">6 Months</MenuItem>
            <MenuItem value="12 Months">12 Months</MenuItem>
          </Select>

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
