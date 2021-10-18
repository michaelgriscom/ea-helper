import {FormControl, InputAdornment, InputLabel, OutlinedInput, Select} from "@mui/material";
import _ from "lodash";
import {Donation, GroupableFields, useDonations} from "../donations/useDonations";
import ThemedLineChart from "./lineChart";
import LineChart, {Datum, Series} from "./nivoLineChart";
// import LineChart from "./lineChart";
import moment from "moment";

function Impact() {
  const donations = useDonations();
  const donationData = sumDonationsByDate(donations, "charity");
  const cumulativeDonationData = donationData.map(getCumulativeSeries);

  return (
    <div>
      <LineChart series={cumulativeDonationData} />
      {/* <ThemedLineChart /> */}
    </div>
  );
}

function getCumulativeSeries(oldSeries: Series): Series {
  const newSeries: Series = {id: oldSeries.id, data: []};
  newSeries.data = _.reduce(oldSeries.data,
    (acc, newDatum) => {
      if (_.isEmpty(acc)) {
        return [newDatum];
      }
      const sum = _.last(acc)!.y + newDatum.y;
      acc.push({x: newDatum.x, y: sum});
      return acc;
     },
    [] as Datum[]);

  return newSeries;
}

function sumDonationsByDate(
  donations: Donation[],
  groupBy: GroupableFields
): Series[] {
  const serie: Series[] = [];

  donations.forEach((donation) => {
    const bucketedDate = moment(donation.date).format("YYYY");
    const seriesId = donation[groupBy];
    let series = serie.find((s) => s.id === seriesId);
    if (!series) {
      series = { id: seriesId, data: []};
      serie.push(series);
    }

    let datum = series.data.find((d) => d.x === bucketedDate);
    if (!datum) {
      datum = {x: bucketedDate, y: 0};
      series.data.push(datum);
    }

    datum.y += donation.amount;
  });

  return serie;
}

export default Impact;
