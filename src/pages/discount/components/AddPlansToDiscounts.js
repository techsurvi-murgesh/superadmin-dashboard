import React, {useState } from "react";
import "../discounts.scss";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";

function AddPlansToDiscount(props) {
    let [plansData, setPlansData] = useState(props.plansData)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 400,
        overflow: "auto",
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 3,
      };

      const handlePlancheck = (planGroupIndex, planIndex) => {
        let tempData = plansData.slice(0)
        console.log(tempData[planGroupIndex].pricing_plans[planIndex])
        tempData[planGroupIndex].pricing_plans[planIndex].isChecked = !tempData[planGroupIndex].pricing_plans[planIndex].isChecked
        setPlansData(tempData)
      };

      const planGroupCheckStatus = (planGroupIndex) => {
        let tempData = plansData.slice(0)
        let checkStatus = plansData[planGroupIndex].pricing_plans.some((element) => {
          return element.isChecked === false
        })

        let indeterminateStatus = plansData[planGroupIndex].pricing_plans.some(element => 
          element.isChecked === true
        )

        console.log("indeterminateStatus = ", indeterminateStatus)

        if (checkStatus) tempData[planGroupIndex].isChecked = false
        else tempData[planGroupIndex].isChecked = true

        if (indeterminateStatus) tempData[planGroupIndex].isIndeterminate = true
        else tempData[planGroupIndex].isIndeterminate = false


        setPlansData(tempData)
      }

      const handlePlanGroupCheck = (planGroupIndex) => {
        plansData[planGroupIndex].pricing_plans.forEach((element, index) => {
          handlePlancheck(planGroupIndex, index)
        });
        planGroupCheckStatus(planGroupIndex)
      }

      const handleModalSubmit = () => {
        props.modalReturnData(plansData)
      }
    return (
        <Box sx={style}>
            <p className="modal_heading">Choose Plans</p>
            {!plansData ? (
            <div>Loading...</div>
          ) : (
            <div>
            {plansData.map((row, planGroupIndex) => (
              <div>
                <FormControlLabel
                  label={row.plan_name}
                  control={
                    <Checkbox
                      checked={row.isChecked}
                      indeterminate={row.isIndeterminate === true && row.isChecked === false}
                      onClick={() => {handlePlanGroupCheck(planGroupIndex); }}
                    />
                  }
                />

                {row.pricing_plans.map((plan, planIndex) => (
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                      label={plan.plan_name}
                      control={<Checkbox checked={plan.isChecked} onChange={() => {handlePlancheck(planGroupIndex, planIndex); planGroupCheckStatus(planGroupIndex)}} />}
                    />
                  </Box>
                ))}
              </div>
            ))}

            <Button variant="contained" onClick={handleModalSubmit}>Save</Button>
            <Button variant="outlined">Cancel</Button>
          </div>
          )}
        </Box>
        )
}

export default AddPlansToDiscount