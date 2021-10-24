// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { useTheme } from "@mui/material";
import { Pie } from "@nivo/pie";


export interface Datum {
  id: string;
  value: number;
}

interface PieChartProps {
  data: Datum[];
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function PieChart(props: PieChartProps) {
  const theme = useTheme();

  const light = theme.palette.primary.main;
  const dark = theme.palette.primary.dark;

  const chartTheme = {
    grid: {
      line: {
        // stroke: theme.palette.primary.main,
        // stroke: "rgba(0,0,0,0.05)",
      },
    },
    axis: {
      legend: {
        text: {
          fill: theme.palette.primary.main,
          // fill: theme.palette.text.primary,
          fontSize: 12,
        },
      },
      ticks: {
        text: {
          fill: "rgba(0,0,0,0.3)",
          fontSize: 12,
        },
        line: {
          stroke: "rgba(0,0,0,0.3)",
          strokeWidth: 1,
        },
      },
      domain: {
        line: {
          stroke: "rgba(0,0,0,0.1)",
          strokeWidth: 1,
        },
      },
    },
    crosshair: {
      line: {
        stroke: "rgba(0,0,0,0.5)",
        strokeWidth: 1,
        strokeOpacity: 0.35,
      },
    },
  };

  return (
    <Pie
      data={props.data}
      theme={chartTheme}
      height={300}
      width={600}
    />
  );
}

export default PieChart;
