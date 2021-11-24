import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
};

const ModalPoster = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ display: "flex", flexDirection: "column" }}>
          <img src={props.poster} alt="poster" />
          <Link to={`/detail/${props.id}`}>see detail</Link>
        </Box>
      </Modal>
    </>
  );
};

export default ModalPoster;
