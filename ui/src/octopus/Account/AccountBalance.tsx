import React from "react";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography, 
  } from "@material-ui/core";
import useStyles from "../styles";
import { AssetDeposit } from "@daml.js/da-marketplace/lib/DA/Finance/Asset";
import Header from "../../components/Header/Header";
import classnames from "classnames";
export const AccountBalanceView = () => {
  const classes = useStyles();

  const assetDeposits = useStreamQueries(AssetDeposit).contracts

  return (
    <>
     <div className={classes.padding}>
     <Grid item >
            <Paper className={classes.paper}>
              <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">Wallet Balance</Typography></Grid>
              <Table size="medium">
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell key={0} className={classes.tableCell}><b>Owner</b></TableCell>
                    <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                    <TableCell key={1} className={classes.tableCell}><b>Wallet</b></TableCell>
                    <TableCell key={2} className={classes.tableCell}><b>Asset</b></TableCell>
                    <TableCell key={3} className={classes.tableCell}><b>Balance</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetDeposits.map((c, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell key={0} className={classes.tableCell}>{c.payload.account.owner}</TableCell>
                      <TableCell key={0} className={classes.tableCell}>{c.payload.account.provider}</TableCell>
                      <TableCell key={0} className={classes.tableCell}>{c.payload.account.id.label}</TableCell>
                      <TableCell key={1} className={classes.tableCell}>{c.payload.asset.id.label}</TableCell>
                      <TableCell key={1} className={classes.tableCell}>{c.payload.asset.quantity}</TableCell>
                    </TableRow>
                  ))}
                   </TableBody>
              </Table>
            </Paper>
          </Grid>
          </div>
    </>
  );

}