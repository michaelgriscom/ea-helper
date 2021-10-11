import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
// import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from '@latticejs/mui-recharts';

const data = [{name: '2019', amount: 400, }, {name: '2020', amount: 500, }, {name: '2021', amount: 600, }];

function lineChart() {
  return <LineChart width={600} height={300} data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>;
}

export default lineChart;
