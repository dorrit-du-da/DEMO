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
import { Service } from "@daml.js/da-marketplace/lib/SmartCash/ExternalMerchant/Service";
import { CheckExternalMerchant} from "../../config";

export const DialogView = () => {
  const party = useParty();
  const ledger = useLedger();
  const [open, setOpen] = React.useState(false);
  const [ruleId, setRuleId] = React.useState("");
  const [rule, setRule] = React.useState(
    {goldLimit:"", 
    goldDiscount: "",
    silverLimit:"", 
    silverDiscount: "",
    bronzeLimit:"", 
    bronzeDiscount: "",
    ironLimit:"", 
    ironDiscount: "",
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
  //     limit: rule.goldLimit,
  //     discount: rule.goldDiscount
  //   },
  //   {
  //     category: Category.SILVER ,
  //     limit: rule.silverLimit,
  //     discount: rule.silverDiscount
  //   },
  //   {
  //     category: Category.BRONZE ,
  //     limit: rule.bronzeLimit,
  //     discount: rule.bronzeDiscount
  //   },
  //   {
  //     category: Category.IRON ,
  //     limit: rule.ironLimit,
  //     discount: rule.ironDiscount
  //   },
  //   ]
  //   // await ledger.exercise(Service.CreateRule, internalMerchantService.contractId, { ruleId: ruleId, rewardRule : newRules});
  //   setOpen(false);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setRule(prevState => ({...prevState,[name]: value}));
};

  return (
    <div>
      { CheckExternalMerchant(party) && <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Rule
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW RULE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new reward rule base on business need
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
            name="goldLimit"
            label="GOLD Limit"
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
            name="goldDiscount"
            label="GOLD Discount"
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
            name="silverLimit"
            label="SILVER Limit"
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
            name="silverDiscount"
            label="SILVER Discount"
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
            name="bronzeLimit"
            label="BRONZE Limit"
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
            name="bronzeDiscount"
            label="BRONZE Discount"
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
            name="ironLimit"
            label="IRON Limit"
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
            id="cvv"
            name="ironDiscount"
            label="IRON Discount"
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
