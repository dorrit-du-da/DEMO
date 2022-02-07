import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { any } from 'prop-types';
import useStyles from "../styles";
import { Grid, Paper,Typography } from "@material-ui/core";
import  { RuleDialogView } from "./RuleDialog"
import { DateRule, TimeRule, QuantityRule, MembershipRule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import  { DateDetails } from "./details/DateDetails"
import  { TimeDetails } from "./details/TimeDetails"
import  { QuantityDetails } from "./details/QuantityDetails"
import  { MembershipDetails } from "./details/MembershipDetails"
import  { AnyDetails } from "./details/AnyDetails"
import { ConstructionOutlined } from '@mui/icons-material';

type Props = {
  ruleId: string[],
  criterias: string[],
  open: boolean
}

// export const handleFactorParameters = (ruleId:string)  => {
//   const rules = useStreamQueries(DateRule).contracts
//   const rule = rules.find(i => i.payload.ruleId == ruleId);

//   const rewards = useStreamQueries(Rule).contracts
//   const reward = rewards.find(i => i.payload.ruleId == ruleId);

//   return (
//     <React.Fragment>
//       <Box sx={{ margin: 1 }}>
//         <Typography variant="h6" gutterBottom component="div">
//           Rule Details
//         </Typography>
//         <Table size="small" aria-label="purchases">
//           <TableHead>
//             <TableRow>
//               <TableCell>Provider</TableCell>
//               <TableCell>Rule Id</TableCell>
//               <TableCell >Start Date</TableCell>
//               <TableCell >End Date</TableCell>
//               <TableCell >Reward</TableCell>
//               <TableCell >Value</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableCell>{rule?.payload.provider}</TableCell>
//             <TableCell>{rule?.payload.ruleId}</TableCell>
//             <TableCell>{rule?.payload.startDate}</TableCell>
//             <TableCell>{rule?.payload.endDate}</TableCell>
//             <TableCell>{reward?.payload.rewardRule.reward}</TableCell>
//             <TableCell>{reward?.payload.rewardRule.value}</TableCell>
//           </TableBody>
//         </Table>
//       </Box>
//     </React.Fragment>
//   )
// }

// const handleFactorParameters = (ruleId: string) => {
//   const rules = useStreamQueries(Rule).contracts
//   const rule = rules.find(i => i.payload.ruleId == ruleId);
//   let criteria = rule?.payload.rewardRule.factor[0]

//   if (!criteria ) return (<></>);

//   // const casehandler = () => {
//   //   switch (true) {
//   //     case (criteria ==='DATE'): 
//   //       return DateDetails(ruleId) 
//   //     case(criteria ==='TIME'): 
//   //       return TimeDetails(ruleId)
//   //     case ((criteria ==='ONE_OFF_QTY') || (criteria ==="ONE_OFF_AMOUNT") || (criteria ==="ACCUMULATED_QTY")  || (criteria ==="ACCUMULATED_AMOUNT")): 
//   //       return QuantityDetails(ruleId)
//   //     case (criteria === "MEMBERSHIP" ):
//   //       return MembershipDetails(ruleId)
//   //     case (criteria === "ANY" ):
//   //       return AnyDetails(ruleId) 
//   //   }

//   return (
//     <React.Fragment>
//      hello
//     </React.Fragment>)
//   }

export const RuleDetails: React.FC<Props>= ({ruleId, criterias, open})  => {
  const rules = useStreamQueries(Rule).contracts

    // const casehandler = (rd:string) => {
    //   const rule = rules.find(i => i.payload.ruleId == rd);
    //   let criteria = rule?.payload.rewardRule.factor[0]

    //   switch (criteria) {
    //     case 'DATE': 
    //       return <DateDetails ruleId={rd}/>
    //     // case(criteria ==='TIME'): 
    //     //   return <TimeDetails ruleId={rd}/>
    //     // case ((criteria ==='ONE_OFF_QTY') || (criteria ==="ONE_OFF_AMOUNT") || (criteria ==="ACCUMULATED_QTY")  || (criteria ==="ACCUMULATED_AMOUNT")): 
    //     //   return QuantityDetails(rd)
    //     // case (criteria === "MEMBERSHIP" ):
    //     //   return MembershipDetails(rd)
    //     // case (criteria === "ANY" ):
    //   }}

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
           {ruleId.map((rd) => {
            const rule = rules.find(i => i.payload.ruleId == rd);
            let criteria = rule?.payload.rewardRule.factor[0]

            switch (true) {
              case (criteria ==='DATE'): 
                return <DateDetails ruleId={rd}/>
              case(criteria ==='TIME'): 
                return <TimeDetails ruleId={rd}/>
              case ((criteria ==='ONE_OFF_QTY') || (criteria ==="ONE_OFF_AMOUNT") || (criteria ==="ACCUMULATED_QTY")  || (criteria ==="ACCUMULATED_AMOUNT")): 
                return <QuantityDetails ruleId={rd}/>
              case (criteria === "MEMBERSHIP" ):
                return <MembershipDetails ruleId={rd}/>
              case (criteria === "ANY" ):
                return <AnyDetails ruleId={rd}/>
            }})}

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}