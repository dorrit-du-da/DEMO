import React from 'react'
import clsx from 'clsx'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import { AccountBalanceView } from "./octopus/Account/AccountBalance";
import { InternalServiceView } from "./octopus/InternalMerchant/InternalService";
import { ExternalServiceView } from "./octopus/ExternalMerchant/ExternalService";
import AppMenu from './AppMenu'
import Header from "./components/Header/Header";
import { Service as InternalMerchantService} from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
import { Service as ExternalMerchantService} from "@daml.js/da-marketplace/lib/SmartCash/ExternalMerchant/Service";
import { useStreamQueries } from "@daml/react";
import { InternalRuleAndProductView } from "./octopus/InternalMerchant/InternalRuleAndProduct"
import { ExternalRuleAndProductView } from "./octopus/ExternalMerchant/ExternalRuleAndProduct"
// import { ExternalReceiptView } from "./octopus/ExternalMerchant/ExternalReceipt"
import { ReceiptView } from "./octopus/Receipt"
import { InternalServiceRequestView } from "./octopus/InternalMerchant/InternalServiceRequest"
import { ExternalServiceRequestView } from "./octopus/ExternalMerchant/ExternalServiceRequest"
import { MembershipView } from "./octopus/ExternalMerchant/Membership"
import { RuleView } from "./octopus/RuleManagement/Rule"
import { SnackbarProvider } from 'notistack';
import { CheckRuleCreator } from "./config"
import {  useParty } from "@daml/react";


const App: React.FC = () => {
  const party = useParty();
  const classes = useStyles()
  const internalMerchantService = useStreamQueries(InternalMerchantService).contracts
  const externalMerchantService = useStreamQueries(ExternalMerchantService).contracts

  const PageMembership = () => <><Header app="Membership /Points" /><div className={classes.padding}><MembershipView /></div></>
  const PageAccount = () => <><Header app="Wallet" /><AccountBalanceView /></>
  const PageInternal = () => <> <Header app="Internal Merchant" />  <div className={classes.padding}> {CheckRuleCreator(party) && <RuleView viewOnly={true}/>} {internalMerchantService.map((c, i) => (
    <InternalRuleAndProductView c = {c.payload.customer} />
   ))} </div></>
  const PageExternal = () => <> <Header app="External Partner" />  <div className={classes.padding}> {CheckRuleCreator(party) && <RuleView viewOnly={true}/>}{externalMerchantService.map((c, i) => (
    <ExternalRuleAndProductView c = {c.payload.customer} />
   ))} </div></>
  const PageOnboarding = () => <> <Header app="Onboarding - Merchant List" />  <div className={classes.padding}> <InternalServiceView /> <ExternalServiceView/> </div></>
  const PageNewOnboarding = () => <> <SnackbarProvider maxSnack={4}><Header app="Onboarding - New Request" />  <div className={classes.padding}> <InternalServiceRequestView /> <ExternalServiceRequestView /> </div></SnackbarProvider></>
  const PageReceipt = () => <> <Header app="Receipt/ Book" />  <div className={classes.padding}> <ReceiptView /></div></>
  const PageRule = () => <> <Header app="Rule Management" />  <div className={classes.padding}> <RuleView /></div></>

  return (
    <>
    <BrowserRouter>
      <div className={clsx('App', classes.root)}>
        <CssBaseline />
        <Header app="Portal" /> 
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppMenu />
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
          <Switch>
              <Route exact path="/apps" component={PageAccount} />
              <Route path="/wallet" component={PageAccount} />
              <Route path="/onboarding" component={PageOnboarding} />
              <Route path="/newonboarding" component={PageNewOnboarding} />
              <Route path="/internal" component={PageInternal} />
              <Route path="/external" component={PageExternal} />
              <Route path="/membership" component={PageMembership} />
              <Route path="/receipt" component={PageReceipt} />
              <Route path="/rules" component={PageRule} />
            </Switch> 

          </Container>
        </main>
      </div>
    </BrowserRouter>
    </>
  )
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
    background: '#f2f2f2',
    color: '#535454',
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

export default App
