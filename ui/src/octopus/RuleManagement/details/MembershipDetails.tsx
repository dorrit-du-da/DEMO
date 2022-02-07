import * as React from 'react';
import { useStreamQueries } from "@daml/react";
import { MembershipRule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { TableCell, TableRow, TableHead, TableBody, Table, Paper, Grid } from "@material-ui/core";
import useStyles from "../../styles";



type Props = {
  ruleId: string
}

export const MembershipDetails : React.FC<Props>= ({ruleId})  => {
  const rules = useStreamQueries(MembershipRule).contracts
  const rule = rules.find(i => i.payload.ruleId == ruleId);
  const mds = rule?.payload.membershipDetail
  const classes = useStyles();

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell key={0} className={classes.tableCell}><b>Rule Details</b></TableCell>
            <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
            <TableCell key={1} className={classes.tableCell}><b>Rule Id</b></TableCell>
              {mds?.map((md) => (
            <TableCell className={classes.tableCell} >{md.grade} <b>Limit - Value</b></TableCell>
           ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell className={classes.tableCell}></TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.provider}</TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.ruleId}</TableCell>
           {mds?.map((md) => (
             <>
            <TableCell className={classes.tableCell}>{md.limit}{" - "}{md.value}</TableCell>
            </>
           ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
