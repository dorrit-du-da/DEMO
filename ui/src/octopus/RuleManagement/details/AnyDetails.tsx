import * as React from 'react';
import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { useStreamQueries } from "@daml/react";
import { Typography } from "@material-ui/core";
import { Rule} from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { TableCell, TableRow, TableHead, TableBody, Table, Paper, Grid } from "@material-ui/core";
import useStyles from "../../styles";

type Props = {
  ruleId: string
}

export const AnyDetails  : React.FC<Props>= ({ruleId}) => {
  const rules = useStreamQueries(Rule).contracts
  const rule = rules.find(i => i.payload.ruleId == ruleId);
  const classes = useStyles();

  return (
    <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell key={0} className={classes.tableCell}><b>Rule Details</b></TableCell>
                <TableCell key={0} className={classes.tableCell}><b>Provider</b></TableCell>
                <TableCell key={1} className={classes.tableCell}><b>Rule Id</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Description</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Reward</b></TableCell>
                <TableCell key={2} className={classes.tableCell}><b>Value</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell className={classes.tableCell}></TableCell>
              <TableCell className={classes.tableCell}>{rule?.payload.provider}</TableCell>
              <TableCell className={classes.tableCell}>{rule?.payload.ruleId}</TableCell>
              <TableCell className={classes.tableCell}>Any purchase</TableCell>
              <TableCell className={classes.tableCell}>{rule?.payload.rewardRule.reward}</TableCell>
              <TableCell className={classes.tableCell}>{rule?.payload.rewardRule.value}</TableCell>
            </TableBody>
          </Table>
      {/* <Box sx={{ margin: 1 }}>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Rule Details</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Rule Id</TableCell>
              <TableCell>Description</TableCell>
              <TableCell >Reward</TableCell>
              <TableCell >Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell></TableCell>
            <TableCell>{rule?.payload.provider}</TableCell>
            <TableCell>{rule?.payload.ruleId}</TableCell>
            <TableCell>Any purchase</TableCell>
            <TableCell>{rule?.payload.rewardRule.reward}</TableCell>
            <TableCell>{rule?.payload.rewardRule.value}</TableCell>
          </TableBody>
        </Table>
      </Box> */}
    </React.Fragment>
  )
}
