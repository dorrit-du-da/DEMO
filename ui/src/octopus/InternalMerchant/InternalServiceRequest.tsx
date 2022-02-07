import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap, CheckInternalMerchant } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography, Button} from "@material-ui/core";
import { Offer } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
import {OnboardingDialogView} from "./OnboardInternalDialog"
import { VariantType, useSnackbar } from 'notistack';
import { CreateEvent } from "@daml/ledger";
import { AssetSettlementRule } from "@daml.js/da-marketplace/lib/DA/Finance/Asset/Settlement";


export const InternalServiceRequestView = () => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  const { enqueueSnackbar } = useSnackbar();
  

  const offer = useStreamQueries(Offer).contracts
  const assetSettlementRules = useStreamQueries(AssetSettlementRule).contracts
  const assetSettlmentRule = assetSettlementRules.find(i => i.payload.account.id.label == party+"@SmartCashAccount");


  const handleAccept = async (ms: CreateEvent<Offer>, variant: VariantType) =>{
    console.log("handleAccept", offer, assetSettlmentRule)
    if (!offer || !assetSettlmentRule) return (<></>);
    let accountId = assetSettlmentRule.payload.account.id
    const response = await ledger.exercise(Offer.Accept, ms.contractId, { accountId, observers: ["Alice", "Bob", "Charlie"] });
    response && enqueueSnackbar('Purchase successfully!', { variant });
  }



  return (
    <>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <OnboardingDialogView/>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">Internal Service</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Service</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offer.map((c, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.provider}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.customer}</TableCell>
                  <TableCell key={2} className={classes.tableCellMini}>
                    { CheckInternalMerchant(party) && <Button color="primary" size="small" className={classes.smallButton} variant="contained" 
                    style={{ backgroundColor: "#275ba1", color:"white" }} onClick={() => handleAccept(c, 'success')}>Accept</Button> }
                  </TableCell>
                </TableRow>
              ))}
                </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );

}