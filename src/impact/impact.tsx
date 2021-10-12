import {FormControl, InputAdornment, InputLabel, OutlinedInput, Select} from "@mui/material";
import ThemedLineChart from "./lineChart";
import LineChart from "./nivoLineChart";
// import LineChart from "./lineChart";

function Impact() {
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={"100"}
          onChange={() => {}}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Charity
        </InputLabel>
        <Select
          defaultValue={1}
          inputProps={{
            name: "charity",
            id: "uncontrolled-native",
          }}
        >
          <option value={1}>Give Directly</option>
        </Select>
      </FormControl>

      <LineChart />
      <ThemedLineChart />
    </div>
  );
}

export default Impact;
