import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { useParty } from "@daml/react";
import useStyles from "./styles";
import headerLogo from "../../images/companyLogo.png";
import { useUserDispatch, signOut } from "../../context/UserContext";
import { getName } from "../../config";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

interface HeaderProps {
  app : string
}

function Header({ history, app } : RouteComponentProps & HeaderProps) {
  const classes = useStyles();
  const party = useParty();

  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={3}>
      <Toolbar className={classes.toolbar}>
        {/* <IconButton color="inherit" onClick={() => toggleSidebar(layoutDispatch)} className={classNames(classes.headerMenuButtonSandwich, classes.headerMenuButtonCollapse)}>
          {layoutState.isSidebarOpened
            ? (<ArrowBack classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />)
            : (<Menu classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />)}
        </IconButton> */}
        <img alt="headerLogo" src={headerLogo} height="48px" />
        <div className={classes.grow} />
        <Box alignContent="center">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
            <Typography variant="h1" className={classes.logotype}>Smart Commerce And Tokenization Management Platform</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "#275ba1" }}>{app}</Typography>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.grow} />
        <Box className={classes.userBox} style={{ width: "120px" }}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}><Typography variant="caption">{getName(party)}</Typography></Grid>
          </Grid>
        </Box>
        <IconButton className={classes.headerMenuButton} color="inherit" onClick={() => signOut(userDispatch, history)}>
          <ExitToApp classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);