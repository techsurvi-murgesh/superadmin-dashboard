import React, { useEffect, useState } from "react";
import "../../App.scss";
import "./stores.scss";
import { fetchStores } from "./storeServices";
import {
  Button,
  Chip,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StoreDiscount from "./storeDiscount";

function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);

  const storesPerPage = 10;

  useEffect(() => {
    fetchStores((response) => {
      setStores(response.data.rows);
      setLoading(false);
    });
  }, []);

  // Pagination Logic
  const startIndex = (page - 1) * storesPerPage;
  const endIndex = startIndex + storesPerPage;
  const displayedStores = stores.slice(startIndex, endIndex);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleStoreClick = (store) => {
    setShowInfo(false);
    setShowOptions(true);
    setSelectedStore(store);
    setShowDiscounts(false);
  };

  const handleInformationClick = () => {
    setShowInfo(!showInfo);
    setShowDiscounts(false);
  };

  const handleDiscountsClick = () => {
    setShowDiscounts(!showDiscounts);
    setShowInfo(false);
  };

  // Function to format ISO date to a user-friendly format (e.g., "YYYY-MM-DD")
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="page_container">
      <div className="header">
        <p className="page_heading">Stores</p>
      </div>

      <div className="store_content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayedStores.map((store) => (
            <div key={store.id}>
              <div className="store_items">
                <span>{store.username}</span>
                <div>{store.domain}</div>
                <div>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleInformationClick(handleStoreClick(store))
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Show Info
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleDiscountsClick(handleStoreClick(store))
                    }
                  >
                    Discount History
                  </Button>
                </div>
              </div>
              {selectedStore && selectedStore.id === store.id && showInfo && (
                <div className="store_info">
                  <h3> Store Info </h3>
                  <p>
                    <b> Store ID: </b> {selectedStore.store_id}
                  </p>
                  <p>
                    <b>Shop Email:</b> {selectedStore.email}
                  </p>
                  <p>
                    <b>Shop Domain:</b> {selectedStore.domain}
                  </p>
                  <p>
                    <b>Free Trail Status: </b>
                    {selectedStore.is_freetrial_used == 1 ? "Used" : "Unused"}
                  </p>
                  {selectedStore.active_discount ? (
                    <p>
                      <b>Active Discount:</b>{" "}
                      {selectedStore.active_discount.discount_code}
                    </p>
                  ) : (
                    <p>
                      <b>No active code available</b>
                    </p>
                  )}

                  <StoreDiscount storeId={selectedStore.store_id} />
                </div>
              )}
              {showDiscounts &&
                selectedStore &&
                selectedStore.id === store.id && (
                  <div className="store_info">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3> Discount History For {selectedStore.store_id} </h3>
                    </div>

                    {/* Display other discount history details */}
                    <TableContainer className="table-container">
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>Discount Name</b>
                            </TableCell>
                            <TableCell>
                              <b>Discount Code</b>
                            </TableCell>
                            <TableCell>
                              <b>Created At</b>
                            </TableCell>
                            <TableCell>
                              <b>Expires On</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* Display active discount row */}
                          {selectedStore.active_discount && (
                            <TableRow className="table-row">
                              <TableCell>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{ justifyContent: "space-between" }}
                                >
                                  {selectedStore.active_discount.discount_name}
                                  <Chip
                                    icon={<FiberManualRecordIcon />}
                                    label="Active"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                </Stack>
                              </TableCell>
                              <TableCell>
                                {selectedStore.active_discount.discount_code}
                              </TableCell>
                              <TableCell>
                                {selectedStore.active_discount.created_at !==
                                null
                                  ? formatDate(
                                      selectedStore.active_discount.created_at
                                    )
                                  : "-"}
                              </TableCell>

                              <TableCell>
                                {selectedStore.active_discount.expires_on !==
                                null
                                  ? formatDate(
                                      selectedStore.active_discount.expires_on
                                    )
                                  : "-"}
                              </TableCell>
                            </TableRow>
                          )}
                          {Array.isArray(selectedStore.discount_history) &&
                          selectedStore.discount_history.length > 0 ? (
                            selectedStore.discount_history.map(
                              (discount, index) => (
                                <TableRow key={index} className="table-row">
                                  <TableCell>
                                    {discount.discount_name}
                                  </TableCell>
                                  <TableCell>
                                    {discount.discount_code}
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(discount.created_at)}
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(discount.expires_on)}
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4}>
                                No discount history available.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
            </div>
          ))
        )}
        <Pagination
          count={Math.ceil(stores.length / storesPerPage)}
          page={page}
          onChange={handlePageChange}
          className="pagination"
        />
      </div>
    </div>
  );
}

export default Stores;
