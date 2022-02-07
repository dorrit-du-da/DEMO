import React, { useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ErrorComponent from "./pages/error/Error";
import { useUserState, useUserDispatch } from "./context/UserContext";
import Login from "./pages/login/Login";
import Apps from "./Apps";
import DamlLedger from "@daml/react";
import { httpBaseUrl, wsBaseUrl } from "./config";
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppMenu from './AppMenu'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AccountBalanceView } from "./octopus/Account/AccountBalance";
import clsx from 'clsx'
import Header from "./components/Header/Header";
import { SnackbarProvider } from 'notistack';
import { InternalServiceRequestView } from "./octopus/InternalMerchant/InternalServiceRequest"
import { ExternalServiceRequestView } from "./octopus/ExternalMerchant/ExternalServiceRequest"
import { InternalServiceView } from "./octopus/InternalMerchant/InternalService";
import { ExternalServiceView } from "./octopus/ExternalMerchant/ExternalService";

type MainProps = {
  defaultPath: string
}

export default function Main({ defaultPath }: MainProps) {
  const user = useUserState();
  const classes = useStyles()

  const PageAccount = () => <><Header app="Account" /><AccountBalanceView /></>
  const PageNewOnboarding = () => <> <SnackbarProvider maxSnack={4}><Header app="Onboarding - New Request" />  <div className={classes.padding}> <InternalServiceRequestView /> <ExternalServiceRequestView /> </div></SnackbarProvider></>
  const PageOnboarding = () => <> <Header app="Onboarding - Merchant List" />  <div className={classes.padding}> <InternalServiceView /> <ExternalServiceView/> </div></>

  return (
    <DamlLedger party={user.party} token={user.token} httpBaseUrl={httpBaseUrl} wsBaseUrl={wsBaseUrl}>
    
      <HashRouter>
        <Switch>
          <Route exact path="/" component={RootRoute} />
          <PrivateRoute exact path="/apps" component={Apps} />
          {/* <PrivateRoute path="/apps/accounts" component={PageAccount} />
          <PrivateRoute path="/apps/newonboarding" component={PageNewOnboarding} />
          <PrivateRoute path="/apps/onboarding" component={PageOnboarding} />
           */}
          {/*<PrivateRoute path="/apps/wallet" component={Custody} /> 
          <PrivateRoute path="/apps/registry" component={Registry} />
          <PrivateRoute path="/apps/issuance" component={Issuance} />
          <PrivateRoute path="/apps/distribution" component={Distribution} />
          <PrivateRoute path="/apps/listing" component={Listing} />
          <PrivateRoute path="/apps/trading" component={Trading} /> */}
          <PublicRoute path="/login" component={Login} />
          <Route component={ErrorComponent} />
        </Switch>
      </HashRouter>
    </DamlLedger>
  );

  function RootRoute() {
    var userDispatch = useUserDispatch();
    useEffect(() => {
      const url = new URL(window.location.toString());
      const token = url.searchParams.get('token');
      const party = url.searchParams.get('party');
      if (token === null || party === null) return;
      localStorage.setItem("daml.name", party);
      localStorage.setItem("daml.party", party);
      localStorage.setItem("daml.token", token);
      userDispatch({ type: "LOGIN_SUCCESS", name: party, party, token });
    })

    return (<Redirect to={defaultPath} />)
  }

  function PrivateRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props => user.isAuthenticated ? (React.createElement(component, props)) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)}
      />
    );
  }

  function PublicRoute({ component, ...rest }: any) {
    return (
      <Route
        {...rest}
        render={props => user.isAuthenticated ? (<Redirect to={{ pathname: "/" }} />) : (React.createElement(component, props))}
      />
    );
  }
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  padding: {
    paddingTop: 80,
  },
}))