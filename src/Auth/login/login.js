import React, { useEffect, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginPost } from "./loginServices";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie library

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    loginPost(loginData, (response) => {
      setUser(response.data);
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.data.Token);
        console.log(response.data.data.Token)
        navigate("/discounts");
        navigate(0)
      } else {
        // Failed login logic
        console.log("Login failed");
      }
    });
  };

  // useEffect(() => {
  //   const token = Cookies.get("jwtToken");
  //   if (token) {
  //     setLoggedIn(true);
  //     console.log(token)
  //   } else {
  //     setLoggedIn(true);
  //   }
  // }, []);

  const btnStyle = {
    border: "1px solid #252929",
    color: "white",
    backgroundColor: "#252929",
    fontWeight: "bold",
    "&:hover": {
      borderColor: "#252929",
      color: "#252929",
    },
  };

  return (
    <div className="login_container">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3>Sign in</h3>
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          sx={{ width: 400 }}
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: "400" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button sx={btnStyle} type="submit">
          {" "}
          Sign In{" "}
        </Button>
      </Box>
    </div>
  );
};

export default LoginPage;
