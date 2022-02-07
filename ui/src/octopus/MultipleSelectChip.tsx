import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Rule } from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";
import {useStreamQueries } from "@daml/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  personName: string[];
  onChange: (e: any) => void;
};

export const MultipleSelectChip = ({personName, onChange}: Props) => {
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>([]);

  const allRules = useStreamQueries(Rule).contracts
  // const rules = allRules.filter(i => i.payload.provider == party);

  const ruleIds:any[] = []
  allRules.map((c, i) => (ruleIds.push(c.payload.ruleId)))

  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel id="demo-multiple-chip-label">RuleId</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          value={personName}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {ruleIds.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
