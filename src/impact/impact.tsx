import {
  FormControl,
  InputAdornment,
  Grid,
  CardContent, InputLabel,
  Card,
  OutlinedInput,
  Paper,
  Select,
  Slider,
} from "@mui/material";
import _ from "lodash";
import {useState} from "react";
import {Donation, GroupableFields, useDonations} from "../donations/useDonations";
import {giveDirectly2021} from "../modeler/charities/charities";
import {CalculateSums, DateAmount, getEconomicImpact} from "./impactCalculations";
import ThemedLineChart from "./lineChart";
import LineChart, { Datum, Series } from "./nivoLineChart";
import PieChart from "./PieChart";
// import LineChart from "./lineChart";

function getGiveDirectlyCumulativeImpact(giveDirectlyDonations: Donation[]) {
  const giveDirectlyImpact = getEconomicImpact(
    giveDirectly2021,
    giveDirectlyDonations
  );
  const summed = sumByDate(giveDirectlyImpact);
  const series = createSeries("GiveDirectly", summed);
  const cumulativeSeries = getCumulativeSeries(series);
  return cumulativeSeries;
}

function Impact() {
  const rawDonations = useDonations();
   const minYear = _.first(rawDonations)!.date.getFullYear();
   const maxYear = _.last(rawDonations)!.date.getFullYear();
   const [timeRange, setTimeRange] = useState([minYear, maxYear]);
  const minDistance = 2;

  const donations = rawDonations.filter(
    (donation) =>
      donation.date.getFullYear() >= timeRange[0] &&
      donation.date.getFullYear() <= timeRange[1]
  );

  const donationData = sumDonationsByGroup(donations, "charity");
  const cumulativeDonationData = donationData.map(getCumulativeSeries);
  const donationsByCharity = _.groupBy(donations, (donation) => donation.charity);
  // const giveDirectlyDonations = donationsByCharity['givedirectly'];
  const giveDirectlyDonations: Donation[] = [{date: new Date(2015, 0, 0), amount: 1000, id: '151654654', source: 'DAF', charity: 'givedirectly'}];

   const giveDirectlyImp = getEconomicImpact(
     giveDirectly2021,
     giveDirectlyDonations
   );
  const summedRaw = sumByDate(giveDirectlyImp);
  const summed = summedRaw.filter(
    (donation) =>
      donation.date.getFullYear() >= timeRange[0] &&
      donation.date.getFullYear() <= timeRange[1]
  );
   const series = createSeries("GiveDirectly", summed);
   const giveDirectlyImpact = getCumulativeSeries(series);

  const sumByCharity = CalculateSums(donations);


  const handleChange = (event: any, newValue: number|number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTimeRange([Math.min(newValue[0], timeRange[1] - minDistance), timeRange[1]]);
    } else {
      setTimeRange([timeRange[0], Math.max(newValue[1], timeRange[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: minYear,
      label: minYear,
    },
    {
      value: maxYear,
      label: maxYear,
    },
  ];


  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={4} style={{ height: "300px" }}>
        <Card>
          <CardContent style={{ height: "300px" }}>
            <Slider
              value={timeRange}
              min={minYear}
              max={maxYear}
              step={1}
              marks={marks}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} md={4} style={{ height: "300px" }}>
        <Card>
          <CardContent style={{ height: "300px" }}>
            <LineChart
              series={cumulativeDonationData}
              minX={new Date(timeRange[0], 0, 0)}
              maxX={new Date(timeRange[1], 0, 0)}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} md={4} style={{ height: "300px" }}>
        <Card>
          <CardContent style={{ height: "300px" }}>
            <LineChart
              series={[giveDirectlyImpact]}
              minX={new Date(timeRange[0], 0, 0)}
              maxX={new Date(timeRange[1], 0, 0)}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} md={4}>
        <Card>
          <CardContent style={{ height: "300px" }}>
            <PieChart data={sumByCharity} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function getCumulativeSeries(originalSeries: Series): Series {
  const cumulativeSeries: Series = {id: originalSeries.id, data: []};
  cumulativeSeries.data = _.reduce(originalSeries.data,
    (acc, newDatum) => {
      if (_.isEmpty(acc)) {
        return [newDatum];
      }
      const sum = _.last(acc)!.y + newDatum.y;
      acc.push({x: newDatum.x, y: sum});
      return acc;
     },
    [] as Datum[]);

  return cumulativeSeries;
}

function sumDonationsByGroup(
  donations: Donation[],
  groupBy: GroupableFields
): Series[] {
  const serie: Series[] = [];

  donations.forEach((donation) => {
    const bucketedDate = donation.date.getFullYear().toString();
    const seriesId = donation[groupBy];
    let series = serie.find((s) => s.id === seriesId);
    if (!series) {
      series = { id: seriesId, data: [] };
      serie.push(series);
    }

    let datum = series.data.find((d) => d.x === bucketedDate);
    if (!datum) {
      datum = { x: bucketedDate, y: 0 };
      series.data.push(datum);
    }

    datum.y += donation.amount;
  });

  return serie;
}

function createSeries(id: string, amounts: DateAmount[]): Series {
  const data: Datum[] = amounts.map((amount) => ({
    x: amount.date.getFullYear().toString(),
    y: amount.amount,
  }));

  return { id, data };
}

function sumByDate(amounts: DateAmount[]): DateAmount[] {
  return _(amounts)
    .groupBy((amount) => amount.date.getFullYear())
    .map((group, key) => ({
      date: new Date(key),
      amount: _.sumBy(group, (group) => group.amount),
    }))
    .sort((sum) => sum.date.valueOf())
    .value();

  // const groups = _.groupBy(amounts, (amount) => amount.date.getFullYear());
  // const sums = _.map(groups, (group, key) => ({
  //   date: new Date(key),
  //   amount: _.sumBy(group, group => group.amount),
  // }));
  // sums.sort((sum) => sum.date.valueOf());
  // return sums;
}

export default Impact;
