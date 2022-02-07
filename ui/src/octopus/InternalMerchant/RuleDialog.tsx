import React from 'react';
import Button from '@material-ui/core/Button';
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid } from '@material-ui/core';
import { Service } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
import { CheckInternalMerchant } from "../../config";

export const DialogView = () => {
  const party = useParty();
  const ledger = useLedger();
  const [open, setOpen] = React.useState(false);
  const [ruleId, setRuleId] = React.useState("");
  const [rule, setRule] = React.useState(
    {gold:"", 
    silver: "",
    bronze:"", 
    iron:""
  }
  );

  const internalMerchantServices = useStreamQueries(Service).contracts
  const internalMerchantService = internalMerchantServices.find(i => i.payload.customer == party);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleNewRule = async() => {
  //   if (!internalMerchantService) return (<></>);
  //   const newRules = [{
  //     category: Category.GOLD ,
  //     power: rule.gold
  //   },
  //   {
  //     category: Category.SILVER ,
  //     power: rule.silver
  //   },
  //   {
  //     category: Category.BRONZE ,
  //     power: rule.bronze
  //   },
  //   {
  //     category: Category.IRON ,
  //     power: rule.iron
  //   },
  //   ]
  //   // await ledger.exercise(Service.CreateRule, internalMerchantService.contractId, { ruleId: ruleId, spendingPower : newRules});
  //   setOpen(false);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setRule(prevState => ({...prevState,[name]: value}));
};

  return (
    <div>
      { CheckInternalMerchant(party) && <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Rule
      </Button> }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW RULE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new spending power rule
          </DialogContentText>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
          <TextField
            required
            name="ruleId"
            label="Rule Id"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setRuleId(e.target.value as string)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="gold"
            label="GOLD Power"
            type="number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="silver"
            label="SILVER Power"
            type="number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="bronze"
            label="BRONZE Power"
            type="number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="iron"
            label="IRON Power"
            type="number"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleNewRule}>Create</Button> */}
        </DialogActions>
      </Dialog> 
    </div>
  );
}
