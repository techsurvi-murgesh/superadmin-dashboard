import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { createPricingPlan } from "../pricingPlanService";
import "../pricingPlan.scss";

function AddNewPlan() {
  const [description, setDescription] = useState("");
  const [is_active, setIsActive] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [plan_type, setPlanType] = useState("Global");
  const [capped_amount, setCappedAmount] = useState("");
  const [annual_discount, setAnnualDiscount] = useState("");
  const [plan_name, setPlanName] = useState("");
  const [min_limit, setMinLimit] = useState();
  const [max_limit, setMaxLimit] = useState();
  const [addPrice, setAddPrice] = useState();
  const [base_price, setBasePrice] = useState();
  const [orders, setOrders] = useState();
  const [upsell_percentage, setUpsellPercentage] = useState();
  const [free_trial_days, setFreeTrialDays] = useState();
  const [planFeatures, setPlanFeatures] = useState({
    review: false,
    credit: false,
  });
  const [showPlanFeatureOptions, setShowPlanFeatureOptions] = useState(false);
  const [selectedPlanFeatures, setSelectedPlanFeatures] = useState([]);

  const togglePlanFeatureOptions = () => {
    setShowPlanFeatureOptions((prevState) => !prevState);
  };

  const addPlanFeature = (featureKey) => {
    setSelectedPlanFeatures((prevFeatures) => [...prevFeatures, featureKey]);
  };

  const removePlanFeature = (featureKey) => {
    setSelectedPlanFeatures((prevFeatures) =>
      prevFeatures.filter((key) => key !== featureKey)
    );
  };

  const handleCreatePlan = () => {
    const formData = [
      {
        description,
        is_active,
        isAnnual,
        plan_type,
        capped_amount,
        annual_discount,
        plan_name,
        min_limit,
        max_limit,
        addPrice,
        base_price,
        orders,
        upsell_percentage,
        free_trial_days,
        plan_features: Object.keys(planFeatures)
          .filter((key) => planFeatures[key])
          .map((key) => ({
            key,
            name: key.charAt(0).toUpperCase() + key.slice(1), // Convert to capitalized form
            description: "",
          })),
      },
    ];

    createPricingPlan(formData, (response) => {
      console.log("Plan created:", response);
      // Perform actions after creating the plan if needed
    });

    window.location.reload(false);
  };

  return (
    <Container>
      <form>
        <div className="form_grid_3">
          <TextField
            label="Plan Name"
            value={plan_name}
            onChange={(event) => setPlanName(event.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Plan Type input */}
          <Select
          label="Select PLan Type"
          value={plan_type}
          onChange={(event) => setPlanType(event.target.value)}
          fullWidth
          margin="normal"
          style={{ height: '55px', margin: "auto auto" }} // Add this style
        >
          <MenuItem value="GLOBAL">Global</MenuItem>
          <MenuItem value="CUSTOM">Custom</MenuItem>
          <MenuItem value="RECURRING-DISCOUNTED">Recurring Discounted</MenuItem>
        </Select>
        </div>

        {/* Checkbox inputs */}
        <FormControlLabel
          control={
            <Checkbox
              checked={is_active}
              onChange={(event) => setIsActive(event.target.checked)}
            />
          }
          label="Is Active"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAnnual}
              onChange={(event) => setIsAnnual(event.target.checked)}
            />
          }
          label="Is Annual"
        />

        <div className="form_grid_4">
          {/* Capped Amount input */}
          <TextField
            label="Capped Amount"
            value={capped_amount}
            onChange={(event) => setCappedAmount(event.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Min Limit input */}
          <TextField
            label="Min Limit"
            value={min_limit}
            onChange={(event) => setMinLimit(event.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Max Limit input */}
          <TextField
            label="Max Limit"
            value={max_limit}
            onChange={(event) => setMaxLimit(event.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Add Price input */}
          <TextField
            label="Add Price"
            value={addPrice}
            onChange={(event) => setAddPrice(event.target.value)}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="form_grid_4">
          {/* Base Price input */}
          <TextField
            label="Base Price"
            value={base_price}
            onChange={(event) => setBasePrice(event.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Orders input */}
          <TextField
            label="Orders"
            value={orders}
            onChange={(event) => setOrders(event.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Upsell Percentage input */}
          <TextField
            label="Upsell Percentage"
            value={upsell_percentage}
            onChange={(event) => setUpsellPercentage(event.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Free Trial Days input */}
          <TextField
            label="Free Trial Days"
            value={free_trial_days}
            onChange={(event) => setFreeTrialDays(event.target.value)}
            fullWidth
            margin="normal"
          />
        </div>

        <Button onClick={togglePlanFeatureOptions} variant="outlined">
        {showPlanFeatureOptions ? "Hide Plan Features" : "Add Plan Features"}
      </Button>

      {/* Plan feature options */}
      {showPlanFeatureOptions && (
 <div>
 {selectedPlanFeatures.map((featureKey) => (
   <div className="form_grid_4_1" key={featureKey}>
     {/* Plan Features Key */}
     <TextField
       label="Key"
       value={featureKey}
       // No need for onChange here, it's read-only
       fullWidth
       margin="normal"
       key={featureKey}
     />

     {/* Plan Features Name */}
     <TextField
       label="Name"
       value={featureKey.charAt(0).toUpperCase() + featureKey.slice(1)}
       // No need for onChange here, it's read-only
       fullWidth
       margin="normal"
       key={featureKey}
     />

     {/* Plan Features description */}
     <TextField
       label="Description"
       value={planFeatures.description}
       onChange={(event) =>
         setPlanFeatures((prevFeatures) => ({
           ...prevFeatures,
           description: event.target.value,
         }))
       }
       fullWidth
       margin="normal"
       key={featureKey}
     />

     {/* Remove feature button */}
     <IconButton onClick={() => removePlanFeature(featureKey)}>
       <RemoveCircle />
     </IconButton>
   </div>
 ))}
 <Button onClick={() => addPlanFeature("review")} variant="outlined">
   Add More Features
 </Button>
</div>
      )}


        {/* Submit button */}
        <Button onClick={handleCreatePlan} variant="contained" color="primary">
          Create Plan
        </Button>
      </form>
    </Container>
  );
}

export default AddNewPlan;
