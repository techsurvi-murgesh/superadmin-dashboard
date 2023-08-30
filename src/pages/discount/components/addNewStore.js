import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { fetchDiscounts, updateStore } from "../discountService";
import { fetchStores } from "../../stores/storeServices";
import { Box, Chip } from "@mui/material";
import "../discounts.scss";
import AddIcon from "@mui/icons-material/Add";

function AddNewStore({ discountCode, showAddStore, adddedStores }) {
  const [data, setData] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchStores((response) => {
      if (response.data && response.data.rows) {
        setStores(response.data.rows);
      }
    });
  }, []);

  const handleToggleSelect = (storeId) => {
    if (selectedStores.includes(storeId)) {
      setSelectedStores(selectedStores.filter((id) => id !== storeId));
    } else {
      setSelectedStores([...selectedStores, storeId]);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStores([]);
  };

  const handleSubmit = () => {
    try {
      const selectedStoreIds =
        selectedStores.length === stores.length ? null : selectedStores;
      const postData = {
        discountCode: discountCode,
        storeIdList: selectedStoreIds,
      };

      console.log(postData);

      updateStore(postData, (response) => {
        handleCloseModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    overflow: "scroll",
    height: "50%",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="newStore_main">
      {showAddStore && (
        <div>
          <p className="count"> Added Stores </p>
          <Chip
            label="Add Stores"
            onClick={handleOpenModal}
            icon={<AddIcon />}
            variant="outlined"
            style={{ margin: 2 }}
          />
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box sx={style}>
              <div className="modal-content">
                <div>
                  <Checkbox
                    checked={selectedStores.length === stores.length}
                    onChange={() => {
                      if (selectedStores.length === stores.length) {
                        setSelectedStores([]);
                      } else {
                        setSelectedStores(
                          stores.map((store) => store.store_id)
                        );
                      }
                    }}
                  />
                  <span>Select All</span>
                </div>
                {stores.map((store) => (
                  <div key={store.id}>
                    <Checkbox
                      checked={selectedStores.includes(store.store_id)}
                      onChange={() => handleToggleSelect(store.store_id)}
                    />
                    <span>{store.username}</span>
                  </div>
                ))}
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default AddNewStore;
