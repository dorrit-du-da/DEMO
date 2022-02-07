import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { any } from 'prop-types';
import useStyles from "../styles";
import  { RuleDialogView } from "./RuleDialog";
import  { RuleDetails } from "./RuleDetails"
import { TableCell, TableRow, TableHead, TableBody, Table, Paper, Grid, Typography } from "@material-ui/core";

function createData(
  operator: string,
  provider: string,
  ruleId: string,
  factor: string,
  reward: string,
  value: string,
) {
  return {
    operator,
    provider,
    ruleId,
    factor,
    reward,
    value
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {

  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={classes.tableRow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ruleId}
        </TableCell>
        <TableCell className={classes.tableCell}>{row.operator}</TableCell>
        <TableCell className={classes.tableCell}>{row.provider}</TableCell>
        <TableCell className={classes.tableCell}>{row.factor}</TableCell>
        <TableCell className={classes.tableCell}>{row.reward}</TableCell>
        <TableCell className={classes.tableCell}>{row.value}</TableCell>
      </TableRow>
      <RuleDetails ruleId={[row.ruleId]} criterias={[row.factor]} open={open}/>
    </React.Fragment>
  );
}

interface Props {
  viewOnly?: boolean
}


export function RuleView({viewOnly}: Props) {
  const classes = useStyles();
  const rules = useStreamQueries(Rule).contracts
  const rows: any []= []
  const header = viewOnly? "Rule List" : "Rule Management"

  rules.map((c, i) => (
    rows.push(createData(c.payload.operator, c.payload.provider, c.payload.ruleId, c.payload.rewardRule.factor[0],c.payload.rewardRule.reward, c.payload.rewardRule.value))
  ))
  
  return (
    <Grid item xs={12}>
    <Paper className={classes.paper}>
      {!viewOnly &&<RuleDialogView/>}
      <Grid container direction="row" justify="center" className={classes.paperHeading}><Typography variant="h2">{header}</Typography></Grid>
      <Table size="small">
      {/* <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table"> */}
        <TableHead>
          <TableRow  className={classes.tableRow}>
          <TableCell className={classes.tableCell} ><b>Details</b></TableCell>
            <TableCell className={classes.tableCell} ><b>Rule Id</b></TableCell>
            <TableCell className={classes.tableCell} ><b>Operator</b></TableCell>
            <TableCell  className={classes.tableCell}><b>Provider</b></TableCell>
            <TableCell  className={classes.tableCell} ><b>Criteria</b></TableCell>
            <TableCell className={classes.tableCell} ><b>Reward Model</b></TableCell>
            <TableCell className={classes.tableCell} ><b>Reward Value</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ruleId} row={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Grid>
  
  );
}