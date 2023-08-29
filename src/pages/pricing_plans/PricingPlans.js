import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./pricingPlan.scss";
import { btnStyle, thead } from "./muiStyle";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddNewPlan from "./components/addNewPlan";
import { fetchPlans } from "./pricingPlanService";
import { Pagination } from "@mui/material";

function PricingPlans() {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showPricingPlanForm, setShowPricingPlanForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchPlans((response) => {
      setData(response.data.rows);
    });
  }, []);

  const handleRowClick = (rowIndex) => () => {
    setExpandedRow((prevRow) => (prevRow === rowIndex ? null : rowIndex));
  };

  const handleDelete = () => {
    alert("You clicked the delete icon.");
  };

  const toggleForm = () => {
    setShowPricingPlanForm(
      (prevShowPricingPlanForm) => !prevShowPricingPlanForm
    );
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (_, page) => {
    setCurrentPage(page - 1);
  };
  return (
    <div className="page_container">
      <div className="pp_header">
        <p className="pp_heading"> Plans </p>
        <div className="pp_action_btns">
          <Button variant="outlined" onClick={toggleForm} sx={btnStyle}>
            {showPricingPlanForm
              ? "Create Pricing Plan"
              : "Create Pricing Plan"}
          </Button>
        </div>
      </div>
      {showPricingPlanForm && <AddNewPlan />}

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", width: "unset" }}
      >
        <Table sx={{ borderCollapse: "separate", borderSpacing: " 0 20px" }}>
          <TableHead className="thead">
            <TableRow>
              <TableCell>Store Id</TableCell>
              <TableCell>Store Tags</TableCell>
              <TableCell>Plan Name</TableCell>
              <TableCell>Description </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Annual Discount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table_body">
            {data
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow onClick={handleRowClick(index)} className="row-gap">
                    <TableCell sx={{ maxWidth: "20px" }}>
                      {row.store_id}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Chip label={row.store_tags} onDelete={handleDelete} />
                      </Stack>
                    </TableCell>
                    <TableCell>{row.plan_name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.is_active === "1" ? (
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label="active"
                            color="success"
                            variant="outlined"
                            icon={<DoneIcon />}
                          />
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label="inactive"
                            color="warning"
                            variant="outlined"
                            icon={<HighlightOffIcon />}
                          />
                        </Stack>
                      )}
                      {/* <p>{(row.is_active)}</p> */}
                    </TableCell>
                    <TableCell>{row.annual_discount}</TableCell>
                  </TableRow>
                  {expandedRow === index && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Table>
                          <TableHead className="thead">
                            <TableRow>
                              <TableCell>Plan Id</TableCell>
                              <TableCell>Discount Id</TableCell>
                              <TableCell>Orders</TableCell>
                              <TableCell>Plan Name</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Customer Limit</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.pricing_plans.map((detail, detailIndex) => (
                              <TableRow key={detailIndex}>
                                <TableCell>{detail.plan_group_id}</TableCell>
                                <TableCell>{detail.discount_id}</TableCell>
                                <TableCell>{detail.orders}</TableCell>
                                <TableCell>{detail.plan_name}</TableCell>
                                <TableCell>{detail.price}</TableCell>
                                <TableCell>{detail.customer_limit}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageCount}
        page={currentPage + 1}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        className="pagination"
      />
    </div>
  );
}

export default PricingPlans;
