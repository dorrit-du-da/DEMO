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
import { Service } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
// import { Category } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Model";
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { CheckInternalMerchant} from "../../config";
import { externalCondition } from "../utils";
import {MultipleSelectChip} from "../MultipleSelectChip";
import { Condition } from "@daml.js/da-marketplace/lib/SmartCash/ExternalMerchant/Model";
import { SelectChangeEvent } from "@mui/material";

export const ProductDialogView = () => {
  const party = useParty();
  const ledger = useLedger();
  const [open, setOpen] = React.useState(false);
  const [ruleId, setRuleId] = React.useState("");
  const [condition, setCondition] = React.useState<Condition>();
  const [ruleIds, setRuleIds] = React.useState<string[]>([]);
  const [product, setProduct] = React.useState(
    {ruleId:"", 
    productId: "",
    item:"", 
    unitPrice: ""
  }
  );


  const internalMerchantServices = useStreamQueries(Service).contracts
  const internalMerchantService = internalMerchantServices.find(i => i.payload.customer == party);

  // const rules = useStreamQueries(Rule).contracts
  // // const rules = allRules.filter(i => i.payload.provider == party);

  // const ruleIds:any[] = []
  // rules.map((c, i) => (ruleIds.push({label : c.payload.ruleId})))

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewRule = async() => {
    if (!internalMerchantService || !ruleIds || !product.productId || !product.item || !product.unitPrice || !condition ) return (<></>);
   
    await ledger.exercise(Service.CreateProduct, internalMerchantService.contractId, {ruleIds: ruleIds, productId: product.productId, item: product.item, unitPrice: product.unitPrice, condition: condition });
    setOpen(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProduct(prevState => ({...prevState,[name]: value}));
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    switch (value) {
      case 'AND':
        setCondition(Condition.AND);
        break;
      case 'OR':
        setCondition(Condition.OR);
        break;
      case 'NONE':
        setCondition(Condition.NONE);
        break;
      default:
        console.log("unwanted condition")
    }
  };

  const handleFieldChange = (event: SelectChangeEvent<typeof ruleIds>) => {
    const {
      target: { value },
    } = event;
    setRuleIds(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      { CheckInternalMerchant(party) &&  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new product
          </DialogContentText>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <TextField
            required
            name="productId"
            label="Product Id"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="item"
            label="Item"
            type="text"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="unitPrice"
            label="Unit Price"
            type="text"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            name="condition"
            label="Rule Condition"
            fullWidth
            variant="standard"
            onChange={handleConditionChange}
          >{externalCondition.map((option) => (
            <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12}>
          <MultipleSelectChip personName={ruleIds} onChange= {handleFieldChange}/>
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewRule}>Create</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}
