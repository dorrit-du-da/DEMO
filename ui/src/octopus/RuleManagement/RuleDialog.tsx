import React from 'react';
import Button from '@material-ui/core/Button';
import { useLedger, useParty, useStreamQueries } from "@daml/react";
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid, InputLabel, MenuItem, Select} from '@material-ui/core';
import { Service } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Service";
import { Rule, Factor, Reward, Grade } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import { CheckRuleCreator } from "../../config";
import { Date } from "@daml/types";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import { rewards, criterias, grades, parseDate} from './Config'
import { any } from 'prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const RuleDialogView = () => {
  const party = useParty();
  const ledger = useLedger();
  const [open, setOpen] = React.useState(false);
  const [ruleId, setRuleId] = React.useState("");
  const [ startDate, setStartDate ] = React.useState<MaterialUiPickersDate | null >(null);
  const [ endDate, setEndDate ] = React.useState<MaterialUiPickersDate | null >(null);

  const [startTime, setStartTime] = React.useState<Date | null>(null);
  const [endTime, setEndTime] = React.useState<Date | null>(null);
  const [membershipDetail, setMembershipDetail] = React.useState<any[]>([
    { id: uuidv4(), 
      grade: "", 
      limit: "", 
      value: "" },
  ]);
  const [factor, setFactor] = React.useState<Factor>();
  const [reward, setReward] = React.useState<Reward>();
  const [rule, setRule] = React.useState(
    {ruleId:"", 
    value:"0", 
    quantity: null,
    startDate: null,
    endDate: null,
    startTime: null
  }
  );
  // console.log("dates", typeof(selectedDate) , selectedDate)
console.log("rule", rule)

  const ruleServices = useStreamQueries(Service).contracts
  const ruleService = ruleServices.find(i => i.payload.provider == party);
  const allRules = useStreamQueries(Rule).contracts
  const rules = allRules.filter(i => i.payload.provider == party);
  const ruleIds:any[] = []
  rules.map((c, i) => (ruleIds.push({label : c.payload.ruleId})))



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFactor(undefined)
    setOpen(false);
  };

  const handleNewRule = async() => {
    console.log ("handleNewRule", ruleService, rule.ruleId , reward, rule.value , factor  )
    if (!ruleService || !rule.ruleId || !reward || !rule.value || !factor ) return (<></>);
    let 
      rewardRule = { factor: [factor], reward: reward, value: rule.value.toString()},
      md:any[] = []

    membershipDetail.map((c, i) => (md.push({grade : c.grade, limit: c.limit, value: c.value })))

    if (factor == Factor.MEMBERSHIP) {
    await ledger.exercise(Service.CreateRule, ruleService.contractId, 
      {ruleId: rule.ruleId, rewardRule, startDate : null , endDate: null, quantity : rule.quantity , startTime: null, endTime: null , membershipDetail: md });
    } else if (factor == Factor.DATE){
      await ledger.exercise(Service.CreateRule, ruleService.contractId, 
        {ruleId: rule.ruleId, rewardRule, startDate : parseDate(startDate) , endDate: parseDate(endDate) , quantity : rule.quantity , startTime: null, endTime: null , membershipDetail: null });
    }
    else {
      await ledger.exercise(Service.CreateRule, ruleService.contractId, 
        {ruleId: rule.ruleId, rewardRule, startDate : null , endDate: null, quantity : rule.quantity , startTime: null, endTime: null , membershipDetail: null });
    }

    setFactor(undefined)
    setOpen(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setRule(prevState => ({...prevState,[name]: value}));
  };

const handleRemoveFields = (id:any) => {
  const values  = [...membershipDetail];
  values.splice(values.findIndex(value => value.id === id), 1);
  setMembershipDetail(values);
}

const handleAddFields = () => {
  setMembershipDetail([...membershipDetail, { id: uuidv4(),  grade: '', limit: '' , value: ''}])
}

const handleChangeInput = (id:string, event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const newInputFields = membershipDetail.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value
    }
    return i;
  })
  setMembershipDetail(newInputFields);
}

const handleFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  switch (value) {
    case 'DATE':
      setFactor(Factor.DATE);
      break;
    case 'TIME':
      setFactor(Factor.TIME);
      break;
    case 'ACCUMULATED_QTY':
      setFactor(Factor.ACCUMULATED_QTY);
      break;
    case 'ONE_OFF_QTY':
      setFactor(Factor.ONE_OFF_QTY);
      break;
    case 'ACCUMULATED_AMOUNT':
      setFactor(Factor.ACCUMULATED_AMOUNT);
      break;
    case 'ONE_OFF_AMOUNT':
      setFactor(Factor.ONE_OFF_AMOUNT);
      break;
    case 'MEMBERSHIP':
      setFactor(Factor.MEMBERSHIP);
      break;
    case 'ANY':
      setFactor(Factor.ANY);
      break;
    default:
      console.log("unwanted factor")
  }
};

const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  switch (value) {
    case 'DISCOUT':
      setReward(Reward.DISCOUT);
      break;
    case 'MULTIPLY':
      setReward(Reward.MULTIPLY);
      break;
    case 'FIXED_PX':
      setReward(Reward.FIXED_PX);
      break;
    case 'FIXED_CUT':
      setReward(Reward.FIXED_CUT);
      break;
    default:
      console.log("unwanted reward")
  }
};

const handleFactorParameters = () => {
  switch (true) {
    case (factor ==='DATE'): 
      return <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            label="Start Date"
            value={startDate}
            onChange={e => setStartDate(e)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <KeyboardDatePicker
            
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            label="End Date"
            value={endDate}
            onChange={e => setEndDate(e)}
          />
         </MuiPickersUtilsProvider>
    </>
    case(factor ==='TIME'): 
      return <>
        <TextField
          name="startTime"
          label="Select Time"
          type="time"
          defaultValue="03:30"
          value={startTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </>
    case ((factor ==='ONE_OFF_QTY') || (factor ==="ONE_OFF_AMOUNT") || (factor ==="ACCUMULATED_QTY")  || (factor ==="ACCUMULATED_AMOUNT")): 
      return <>
         <TextField
            required
            name="quantity"
            label="Qauntity/Amount"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
      </>
    case (factor === "MEMBERSHIP" ):
      return <>
       { membershipDetail.map(inputField => (
          <div key={inputField.id}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
                select
                name="grade"
                label="Grade"
                autoComplete="cc-number"
                variant="standard"
                onChange={event => handleChangeInput(inputField.id, event)}
                fullWidth
              >{grades.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                name="limit"
                label="Limit"
                type="text"
                variant="standard"
                onChange={event => handleChangeInput(inputField.id, event)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                name="value"
                label="Value"
                type="text"
                variant="standard"
                onChange={event => handleChangeInput(inputField.id, event)}
              />
            </Grid>
            <IconButton disabled={membershipDetail.length === 1} 
              onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </Grid>
          </div>
        )) }
      </>
    default:
      console.log("no selected reward")
  }
}


  return (
    <div>
      { CheckRuleCreator(party) &&  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Rule
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW RULE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new rule
          </DialogContentText>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          <TextField
            required
            name="ruleId"
            label="Rule Id"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            name="factor"
            label="Criteria"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleFactorChange}
          >{criterias.map((option) => (
            <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12}>
        {handleFactorParameters()}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            name="reward"
            label="Reward"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleRewardChange}
          >{rewards.map((option) => (
            <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
          </TextField>
        </Grid>

        {(factor != Factor.MEMBERSHIP) && <Grid item xs={12} md={6}>
          <TextField
            required
            name="value"
            label="Reward value"
            type="number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>}

        <Grid item xs={12}>
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewRule}>Create</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}
