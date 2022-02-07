import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography } from "@material-ui/core";
import { Service as InternalMerchantService} from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
import {OnboardingDialogView} from "./OnboardInternalDialog"

export const InternalServiceView = () => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  

  const internalMerchantService = useStreamQueries(InternalMerchantService).contracts

  if (!internalMerchantService ) return (<></>);


  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">Internal Service</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Operator</b></TableCell>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Service</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Wallet</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {internalMerchantService.map((c, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.operator}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.provider}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.customer}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.accountId.label}</TableCell>
                </TableRow>
              ))}
                </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );

}