import React, { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { createStoreDiscount, fetchStores } from "./storeServices";


function StoreDiscount({ storeId }) {
  const [editing, setEditing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores((response) => {
      setStores(response); 
    });
  }, []);

  const handleApplyDiscount = () => {
    const data = {
      store_id: storeId,
      discountCode: discountCode,
    };

    console.log(data)

    createStoreDiscount(data, (response) => {
      console.log("API Response:", response);
      setEditing(false);
    });

    window.location.reload(false);
  };

  const handleDeleteDiscount = () => {
    setDiscountCode(""); 
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
