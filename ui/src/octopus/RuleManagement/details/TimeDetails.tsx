import * as React from 'react';
import { useStreamQueries } from "@daml/react";
import { TimeRule, Rule} from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { TableCell, TableRow, TableHead, TableBody, Table, Paper, Grid } from "@material-ui/core";
import useStyles from "../../styles";


type Props = {
  ruleId: string
}

export const TimeDetails  : React.FC<Props>= ({ruleId}) => {
  const rules = useStreamQueries(TimeRule).contracts
  const rule = rules.find(i => i.payload.ruleId == ruleId);
  const classes = useStyles();
  const basics = useStreamQueries(Rule).contracts
  const basic = basics.find(i => i.payload.ruleId == ruleId);


  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
          <TableCell key={0} className={classes.tableCell}><b>Rule Details</b></TableCell>
            <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
            <TableCell key={0} className={classes.tableCell}><b>Rule Id</b></TableCell>
            <TableCell key={1} className={classes.tableCell}><b>Start Time</b></TableCell>
            <TableCell key={2} className={classes.tableCell}><b>End Time</b></TableCell>
            <TableCell key={2} className={classes.tableCell}><b>Reward</b></TableCell>
            <TableCell key={2} className={classes.tableCell}><b>Value</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell className={classes.tableCell}></TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.provider}</TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.ruleId}</TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.startTime}{" : 00"}</TableCell>
          <TableCell className={classes.tableCell}>{rule?.payload.endTime}{" : 00"}</TableCell>
          <TableCell>{basic?.payload.rewardRule.reward}</TableCell>
          <TableCell>{basic?.payload.rewardRule.value}</TableCell>
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
