// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import {useTheme} from "@mui/material";
import { Line } from "@nivo/line";

export interface Datum {
  x: string;
  y: number;
}

export interface Series {
  id: string;
  data: Datum[];
}

interface LineChartProps {
  series: Series[];
  minX: Date|'auto',
  maxX: Date|'auto',
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function LineChart(props: LineChartProps) {
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
    <Line
      data={props.series}
      // enableArea={true}
      // yScale={{
      //   type: "linear",
      //   stacked: true,
      // }}

      theme={chartTheme}
      height={300}
      width={600}
      xScale={{
        type: "time",
        format: "%Y",
        min: props.minX,
        max: props.maxX,
      }}
      xFormat="time:%Y"
      yFormat={(val) =>
        `${val.valueOf().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}`
      }
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      axisLeft={{
        format: (val) =>
          `${val.valueOf().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`,
      }}
      axisBottom={{
        // orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "transportation",
        // legendOffset: 36,
        // legendPosition: "middle",
        format: "%Y",
      }}
      // pointSize={10}
      // pointColor={{ theme: "background" }}
      // pointBorderWidth={2}
      // pointBorderColor={{ from: "serieColor" }}
      // pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

LineChart.defaultProps = {minX: 'auto', maxX: 'auto'};

export default LineChart;
