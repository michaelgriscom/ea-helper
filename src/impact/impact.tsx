import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';

function Impact() {
  return (
    <div><FormControl fullWidth sx={{m: 1}}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        value={"100"}
        onChange={() => { }}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
      />
    </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Charity
  </InputLabel>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: 'charity',
            id: 'uncontrolled-native',
          }}
        >
          <option value={1}>Give Directly</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default Impact;
