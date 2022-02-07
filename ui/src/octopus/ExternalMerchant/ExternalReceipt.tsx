import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography } from "@material-ui/core";
import { PurchaseReceipt } from "@daml.js/da-marketplace/lib/SmartCash/Receipt";

export const ExternalReceiptView = () => {
  const classes = useStyles();
  const purchaseReceipt = useStreamQueries(PurchaseReceipt).contracts
  if (!purchaseReceipt ) return (<></>);


  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">External Merchant Receipt</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
              <TableCell key={2} className={classes.tableCell}><b>Timestamp</b></TableCell>
                <TableCell key={0} className={classes.tableCell}><b>Operator</b></TableCell>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Customer</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Item</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Quantity</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Unit Price</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Total Price</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Discount</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Final Price</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseReceipt.map((c, i) => (
                <TableRow key={i} className={classes.tableRow}>
                   <TableCell key={0} className={classes.tableCell}>{c.payload.timeStamp}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.operator}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.provider}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.customer}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.item}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.quantity}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.unitPrice}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.totalPrice}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.discount}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.finalPx}</TableCell>
                </TableRow>
              ))}
                </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );

}