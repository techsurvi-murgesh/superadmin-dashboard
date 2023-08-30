import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../App.scss";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function Home() {
  return (
    <div>
     <h1> This is homepage </h1>
    </div>
  );
}
