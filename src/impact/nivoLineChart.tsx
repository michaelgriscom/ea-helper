// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import {useTheme} from "@mui/material";
import { Line } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(235, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 77,
      },
      {
        x: "helicopter",
        y: 141,
      },
      {
        x: "boat",
        y: 32,
      },
      {
        x: "train",
        y: 183,
      },
      {
        x: "subway",
        y: 285,
      },
      {
        x: "bus",
        y: 107,
      },
      {
        x: "car",
        y: 259,
      },
      {
        x: "moto",
        y: 105,
      },
      {
        x: "bicycle",
        y: 150,
      },
      {
        x: "horse",
        y: 268,
      },
      {
        x: "skateboard",
        y: 138,
      },
      {
        x: "others",
        y: 23,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(87, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 138,
      },
      {
        x: "helicopter",
        y: 220,
      },
      {
        x: "boat",
        y: 236,
      },
      {
        x: "train",
        y: 278,
      },
      {
        x: "subway",
        y: 276,
      },
      {
        x: "bus",
        y: 102,
      },
      {
        x: "car",
        y: 86,
      },
      {
        x: "moto",
        y: 67,
      },
      {
        x: "bicycle",
        y: 45,
      },
      {
        x: "horse",
        y: 178,
      },
      {
        x: "skateboard",
        y: 199,
      },
      {
        x: "others",
        y: 222,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(237, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 234,
      },
      {
        x: "helicopter",
        y: 293,
      },
      {
        x: "boat",
        y: 28,
      },
      {
        x: "train",
        y: 77,
      },
      {
        x: "subway",
        y: 216,
      },
      {
        x: "bus",
        y: 117,
      },
      {
        x: "car",
        y: 2,
      },
      {
        x: "moto",
        y: 136,
      },
      {
        x: "bicycle",
        y: 137,
      },
      {
        x: "horse",
        y: 18,
      },
      {
        x: "skateboard",
        y: 231,
      },
      {
        x: "others",
        y: 9,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(171, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 227,
      },
      {
        x: "helicopter",
        y: 219,
      },
      {
        x: "boat",
        y: 106,
      },
      {
        x: "train",
        y: 210,
      },
      {
        x: "subway",
        y: 264,
      },
      {
        x: "bus",
        y: 108,
      },
      {
        x: "car",
        y: 34,
      },
      {
        x: "moto",
        y: 45,
      },
      {
        x: "bicycle",
        y: 238,
      },
      {
        x: "horse",
        y: 130,
      },
      {
        x: "skateboard",
        y: 159,
      },
      {
        x: "others",
        y: 56,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(29, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 114,
      },
      {
        x: "helicopter",
        y: 243,
      },
      {
        x: "boat",
        y: 177,
      },
      {
        x: "train",
        y: 225,
      },
      {
        x: "subway",
        y: 118,
      },
      {
        x: "bus",
        y: 5,
      },
      {
        x: "car",
        y: 13,
      },
      {
        x: "moto",
        y: 67,
      },
      {
        x: "bicycle",
        y: 183,
      },
      {
        x: "horse",
        y: 13,
      },
      {
        x: "skateboard",
        y: 141,
      },
      {
        x: "others",
        y: 219,
      },
    ],
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function LineChart() {
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

  return <Line
    data={data}
    theme={chartTheme}
    height={300}
    width={600}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      // orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      // orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
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
  />;
}

export default LineChart;
