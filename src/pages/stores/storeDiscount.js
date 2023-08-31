import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, styled } from "@mui/material";
import { createStoreDiscount, fetchStores } from "./storeServices";


function StoreDiscount({ storeId }) {
  const [editing, setEditing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [stores, setStores] = useState([]); // To store the list of stores

  useEffect(() => {
    fetchStores((response) => {
      setStores(response); // Set the list of stores
    });
  }, []);

  const handleApplyDiscount = () => {
    console.log("Discount Code:", discountCode, storeId);
    const data = {
      store_id: storeId,
      discountCode: discountCode,
    };

    createStoreDiscount(data, (response) => {
      console.log("API Response:", response);
      setEditing(false); // Close the editing section after applying
    });
  };

  const handleDeleteDiscount = () => {
    setDiscountCode(""); // Clear the discount code
  };

  const CustomButton = styled(Button)`
  height: 26px; 
`;

  return (
    <div>
    {!editing ? (
      <>
        <CustomButton variant="outlined" onClick={() => setEditing(true)}>
          Change
        </CustomButton>
        <CustomButton variant="outlined" onClick={handleDeleteDiscount}>
          Delete
        </CustomButton>
      </>
    ) : (
      <>
        <input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <CustomButton variant="outlined" onClick={handleApplyDiscount}>
          Apply
        </CustomButton>
        <CustomButton variant="outlined" onClick={() => setEditing(false)}>
          Cancel
        </CustomButton>
      </>
    )}
  </div>
  );
}

export default StoreDiscount;
