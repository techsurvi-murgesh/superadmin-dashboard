import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../App.scss";
import ComingSoon from "../Assets/ComingSoon.gif";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function Home() {
  return (
    <div>
      <img src={ComingSoon} />
    </div>
  );
}
