import React from 'react';
import Button from '@material-ui/core/Button';
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid, InputLabel, MenuItem, Select} from '@material-ui/core';
import { Role } from "@daml.js/da-marketplace/lib/SmartCash/Operator/Role";
import { Party} from "@daml/types";
import { CheckOperator} from "../../config";
import { makeStyles } from '@material-ui/core/styles'

export const OnboardingDialogView = () => {
  const party = useParty();
  const ledger = useLedger();
  const [open, setOpen] = React.useState(false);
  const [merchant, setMerchant] = React.useState<Party>();
  const classes = useStyles()

  const operatorRoles = useStreamQueries(Role).contracts
  const operatorRole = operatorRoles.find(i => i.payload.operator == party);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewMerchant = async() => {
    if (!operatorRole || !merchant ) return (<></>);
   
    await ledger.exercise(Role.OfferInternalMerchantService, operatorRole.contractId, {provider: party, customer: merchant });
    setOpen(false);
  }

  return (
    <div>
      { CheckOperator(party) && <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Onboard
      </Button> }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ONBOARD INTERNAL MERCHANT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To onboard new internal merchant
          </DialogContentText>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
          <TextField
            required
            name="merchant"
            label="Merchant"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setMerchant(e.target.value)}
          />
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewMerchant}>Create</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  button:{
    width: "140px",
    height: "45px",
    fontSize: "23px",
    cursor: "pointer",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "black",
    fontFamily: "'Times New Roman', Times, serif",
    fontWeight: 700,
    position: "relative",
    transition: "all 0.5s",
    zIndex: 1,
   }
  
}))