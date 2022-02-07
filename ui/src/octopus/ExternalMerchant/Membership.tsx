import React, {useRef, useState, useEffect} from "react";
import useStyles from "../styles";
import { partymap } from "../../config";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { Table, TableBody, TableCell, TableRow, TableHead, Grid, Paper, Typography } from "@material-ui/core";
import { Membership } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";


export const MembershipView = () => {
  const classes = useStyles();
  const party = useParty();
  const ledger = useLedger();
  

  const memberships = useStreamQueries(Membership).contracts

  if (!memberships ) return (<></>);


  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">Membership/ Rebate Token</Typography></Grid>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Customer</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Rule Id</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Grade</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Point</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Target Ppint</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberships.map((c, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.provider}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.customer}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.ruleId}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.grade}</TableCell>
                  <TableCell key={1} className={classes.tableCell}>{c.payload.currentSpend}</TableCell>
                  <TableCell key={0} className={classes.tableCell}>{c.payload.targetSpend}</TableCell>
                </TableRow>
              ))}
                </TableBody>
          </Table>
        </Paper>
      </Grid>
    </>
  );

}