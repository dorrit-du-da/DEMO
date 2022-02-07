import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography } from "@material-ui/core";
import { Service as ExternalMerchantService} from "@daml.js/da-marketplace/lib/SmartCash/ExternalMerchant/Service";

export const ExternalServiceView = () => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  

  const externalMerchantService = useStreamQueries(ExternalMerchantService).contracts

  if (!externalMerchantService ) return (<></>);


  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">Partner Service</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Operator</b></TableCell>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Partner</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Wallet</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {externalMerchantService.map((c, i) => (
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