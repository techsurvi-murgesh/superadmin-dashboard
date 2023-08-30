import React, { useEffect, useState } from "react";
import "../../App.scss";
import "./discounts.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Chip, Modal, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddNewDiscount from "./components/addNewDiscount";
import AddPlansToDiscount from "./components/AddPlansToDiscounts";
import { addPlansToDiscount, deleteDiscountFromPlan, fetchDiscounts } from "./discountService";
import { fetchPlans } from "../pricing_plans/pricingPlanService";
import AddNewStore from "./components/addNewStore";

function Discounts() {
  const [data, setData] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [plansData, setPlansData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [openChoosePlan, setOpenChoosePlan] = React.useState(false);

  const itemsPerPage = 10; 
  const pageCount = Math.ceil(data.length / itemsPerPage); 

  const fetchInfo = async () => {
   fetchDiscounts((response) => {
    setData(response.data.rows)
   })
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [currentPage]);

  const toggleForm = () => {
    setShowDiscountForm((prevShowDiscountForm) => !prevShowDiscountForm);
  };

  // Function to format ISO date to a user-friendly format (e.g., "YYYY-MM-DD")
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onDiscountClick = (index) => {
    let tempData = data.slice(0)
    tempData[index].isExpanded = !data[index].isExpanded
    setData(tempData)
  };

  const handlePlanClick = () => {
    console.log("handlePlanClick")
  }

  const handlePlanDelete = async (planIndex, planId, discount_code, current_plans) => {
    let new_plans = current_plans.filter(plan => plan !== planId)
    console.log(new_plans)
    await deleteDiscountFromPlan({planIdList: new_plans, discountCode: discount_code}, (() => {
      fetchInfo()
    }))
  }

  const handleClose = () => {
    setOpenChoosePlan(false);
  };

  const handleAddPlanToDiscounts = async (discount_code) => {
    console.log(data)
    setSelectedDiscount(discount_code)
    await fetchPlans((response) => {
      // console.log(response)
      if(response.data.count !== 0) {
        let selectedDiscountIndex = data.findIndex(x => x.discount_code === discount_code)
        let preSelectedPlansList = []

        if(data[selectedDiscountIndex].discounted_plans.length) {
          data[selectedDiscountIndex].discounted_plans.forEach(plan => {
            preSelectedPlansList.push(plan.id)
          });
        }

        console.log("preSelectedPlansList: ", preSelectedPlansList)
        

        response.data.rows.forEach(plan_group => {
          plan_group.isChecked = false
          if (plan_group.pricing_plans) {
            plan_group.pricing_plans.forEach(plan => {
              if (preSelectedPlansList.includes(plan.id)) plan.isChecked = true  
              else plan.isChecked = false  
              plan_group.isIndeterminate = false
            });
          }
        });
      }
      console.log(response.data.rows)
      setPlansData(response.data.rows)
      setOpenChoosePlan(true);
    })
  };

  const handleModalreturnData = (data) => {
    let planIdList = []
    data.forEach(plan_group => {
      plan_group.pricing_plans.forEach(plan => {
        if (plan.isChecked) planIdList.push(plan.id)  
      });
    });
    let reqData = {
      planIdList: planIdList,
      discountCode: selectedDiscount
    } 

    addPlansToDiscount(reqData, (async (response) => {
      console.log(response)
      await fetchDiscounts()
    }))
  }

  const btnStyle = {
    borderColor: "#252929",
    color: "white",
    backgroundColor: "#252929",
    fontWeight: "bold",
    "&:hover": {
      borderColor: "#252929",
      color: "#252929",
    },
  };

  const btnStyle2 = {
    borderColor: "#252929",
    color: "#252929",
    fontWeight: "bold",
    minWidth: "30px",
    padding: "5px 5px",
    margin: "0 5px",
    "&:hover": {
      borderColor: "#252929",
      color: "white",
      backgroundColor: "#252929",
    },
  };

  return (
    <div className="page_container">

      <Modal
        open={openChoosePlan}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPlansToDiscount plansData = {plansData} modalReturnData = {handleModalreturnData} />
      </Modal>

      <div className="header">
        <p className="page_heading">Discounts</p>

        <div className="page_action_btns">
          <Button onClick={toggleForm} variant="outlined" sx={btnStyle}>
            {showDiscountForm ? "Create Discount" : "Create Discount"}
          </Button>
        </div>
      </div>
      {showDiscountForm && <AddNewDiscount />}

      {!data ? (
        <div>Loading...</div>
      ) : (
        <div className="discounts_container">
          <div className="discounts_header">
            <span>Name</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Interval</span>
            <span>Created At</span>
            <span>Actions</span>
          </div>
          
          {currentItems.map((item, index) => (
            <div className="">
              <div key={index} className="discount">
                <span>{item.discount_name}</span>
                <span>{item.discount_type}</span>
                <span>{item.discount_amount}</span>
                <span>{item.duration_limit_in_intervals}</span>
                <span>{formatDate(item.created_at)}</span>
                <span>
                  <KeyboardArrowRightIcon onClick={() => {onDiscountClick(index)}} style={ item.isExpanded ? {transform: "rotate(90deg)"} : {transform: "rotate(0deg)"}} /> <DeleteIcon />
                </span>
              </div>

              <div className={` ${item.isExpanded ? "showDiscountInfo" : "hideDiscountInfo"} `} >
                {!item.discounted_plans ? 
                (<div className="empty_div">
                  <p>Not applied on any plans !</p>
                  <Button size="small" sx={btnStyle2} onClick={() => {handleAddPlanToDiscounts(item.discount_code)}} variant="outlined" startIcon={<AddIcon />}>
                    <span style={{marginTop: 4, fontSize: 12}}>Add Plans</span>
                  </Button>
                </div>) 
                : 
                (<div className="info_div">
                  <p className="count">Applied on {item.discounted_plans.count} plan(s)</p>
                  <Chip
                      label = "Add Plans"
                      onClick = {() => {handleAddPlanToDiscounts(item.discount_code)}}
                      icon = {<AddIcon />}
                      variant = "outlined"
                      style={{margin: 2}}
                    />
                  {item.discounted_plans.map((plan, index) => (
                    <Chip
                      label = {plan.plan_name}
                      onClick = {handlePlanClick}
                      onDelete = {() => {handlePlanDelete(index, plan.id, item.discount_code, item.plans)}}
                      deleteIcon = {<DeleteIcon />}
                      variant = "outlined"
                      style={{margin: 2}}
                    />
                  ))}
                </div>)}
              </div>
                <AddNewStore discountCode={item.discount_code} adddedStores={item.stores} showAddStore={item.isExpanded}/>
            </div>
          ))}
        </div>
      )}
 <Pagination
      count={pageCount} // Total number of pages
      page={currentPage} // Current page number
      onChange={(event, page) => paginate(page)} // Page change handler
      shape="rounded"
      color="primary"
      className="pagination"
    />
    </div>
  );
}

export default Discounts;
