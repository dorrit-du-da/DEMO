import React,  { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import DateFnsAdapter from '@mui/lab/AdapterDateFns';


import Themes from "./themes";
import Main from "./Main";
// import Main from "./App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>   
        <CssBaseline />
        <Main defaultPath="/apps"/>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);
