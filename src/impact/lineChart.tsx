import { useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
// import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from '@latticejs/mui-recharts';

const data = [
  { name: "2019", amount: 400 },
  { name: "2020", amount: 500 },
  { name: "2021", amount: 600 },
];

function ThemedLineChart() {
  const theme = useTheme();

  // const {theme} = props;
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        dataKey="amount"
        // type="monotone" dataKey="amount" stroke="#8884d8"
      />
      <CartesianGrid
      // stroke="#ccc" strokeDasharray="5 5"
      />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        wrapperStyle={{
          // backgroundColor: "#f5f5f5",
          backgroundColor: theme.palette.background.paper,
          // color: "#f5f5f5",
          color: theme.palette.text.secondary,
          border: "none",
          boxShadow: theme.shadows[1],
        }}
      />
    </LineChart>
  );
}

export default ThemedLineChart;
