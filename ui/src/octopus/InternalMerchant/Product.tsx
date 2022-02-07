import React, {useState} from "react";
import { useLedger, useParty, useStreamQueries } from "@daml/react";
import { TableCell, TableRow, TextField, Button } from "@material-ui/core";
import useStyles from "../styles";
import { AssetDeposit } from "@daml.js/da-marketplace/lib/DA/Finance/Asset";
import { CreateEvent } from "@daml/ledger";
import { AssetSettlementRule } from "@daml.js/da-marketplace/lib/DA/Finance/Asset/Settlement";
import { CheckCustomer } from "../../config";
import { Product } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Model";
import { VariantType, useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import  { RuleDetails } from "../RuleManagement/RuleDetails"
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { parseDate} from '../RuleManagement/Config'


interface ProductViewProps {
  c: CreateEvent<Product>
}

export const ProductView = ({c}: ProductViewProps) => {
  const classes = useStyles();
  const ledger = useLedger();
  const [ quantity, setQuantity ] = useState("");
  const party = useParty();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const currentDate = new Date();
  const currentTime = currentDate.getHours()
  const assetDeposits = useStreamQueries(AssetDeposit).contracts
  const assetDeposit = assetDeposits.find(i => i.payload.account.id.label == party+"@SmartCashAccount");
  const assetSettlmentRules = useStreamQueries(AssetSettlementRule).contracts
  const assetSettlmentRule = assetSettlmentRules.find(i => i.payload.account.id.label == party+"@SmartCashAccount");

  const rules = useStreamQueries(Rule).contracts
  const rule = rules.find(i => i.payload.ruleId == c.payload.ruleIds[0]);

  const factorStringfy = rule?.payload.rewardRule.factor.toString().split(",");

  const handlePurchase = async (ms: CreateEvent<Product>, variant: VariantType) =>{
    console.log("handlePurchase", assetDeposit, assetSettlmentRule, currentDate,)
    if (!assetDeposit || !assetSettlmentRule || !currentDate ) return (<></>);
    const response = await ledger.exercise(Product.Purchase, ms.contractId, { customer: party, customerDepositCid: assetDeposit.contractId, customerSettlementCid: assetSettlmentRule.contractId, quantity, date:parseDate(currentDate), time:currentTime.toString() });
    console.log("handlePurchase",response )
    response && enqueueSnackbar('Purchase successfully!', { variant });
  }

  return (
    <React.Fragment>
     <TableRow key={0} className={classes.tableRow}>
        <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell key={0} className={classes.tableCell}>{c.payload.operator}</TableCell>
          <TableCell key={0} className={classes.tableCell}>{c.payload.provider}</TableCell>
          <TableCell key={0} className={classes.tableCell}>{(c.payload.ruleIds).toString()}</TableCell>
          <TableCell key={0} className={classes.tableCell}>{c.payload.productId}</TableCell>
          <TableCell key={1} className={classes.tableCell}>{c.payload.item}</TableCell>
          <TableCell key={1} className={classes.tableCell}>{c.payload.unitPrice}</TableCell>
          <TableCell key={2} className={classes.tableCell}>
            <TextField className={classes.inputField} fullWidth type="number" value={quantity} InputProps={{ inputProps: { min: 0, max: 20 } }} onChange={e => setQuantity(e.target.value as string)} />
          </TableCell>
          <TableCell key={2} className={classes.tableCell}>{quantity? parseFloat(c.payload.unitPrice)*parseFloat(quantity): 0}</TableCell>
          <TableCell key={2} className={classes.tableCellMini}>
            { CheckCustomer(party) && <Button color="primary" size="small" className={classes.smallButton} variant="contained" 
            style={{ backgroundColor: "#275ba1", color:"white" }} onClick={() => handlePurchase(c, 'success')}>Purchase</Button> }
          </TableCell>
        
      </TableRow>  
      { factorStringfy != undefined && <RuleDetails ruleId={c.payload.ruleIds} criterias={factorStringfy} open={open}/>    }  
    </React.Fragment>
  );

}

