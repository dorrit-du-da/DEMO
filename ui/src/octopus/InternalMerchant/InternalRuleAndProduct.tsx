import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography, Button } from "@material-ui/core";
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { Product } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Model";
import { Party} from "@daml/types";
import { ProductView } from "./Product";
import { SnackbarProvider } from 'notistack';
import { ProductDialogView } from "./ProductDialog";
import { DialogView } from "./RuleDialog"

interface InternalRuleAndProductViewProps {
  c: Party
}

export const InternalRuleAndProductView = ({c}: InternalRuleAndProductViewProps) => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  

  const allRules = useStreamQueries(Rule).contracts
  const allProducts = useStreamQueries(Product).contracts
  const products = allProducts.filter(i => i.payload.provider == c);
  const rules = allRules.filter(i => i.payload.provider == c);


  if (!rules && !products) return (<></>);
  

  return (
    <>
    <SnackbarProvider maxSnack={4}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", flexDirection:"row" }}>
          <ProductDialogView/>
          </div>
        <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">{c}</Typography></Grid>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="subtitle1">Product List</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Merchant</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Rule Id</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Rule Id</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Product Id</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Item</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Unit Price</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Quantity</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Total Price</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((c, i) => (
                <ProductView c={c}/>
              ))}
                </TableBody>
          </Table>
        </Paper>
      </Grid>
      </SnackbarProvider>
    </>
  );

}