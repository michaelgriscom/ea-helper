import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useDonations} from "./useDonations";

export default function DonationTable() {
  const donations = useDonations();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Charity</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.map((donation) => (
            <TableRow
              key={donation.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {donation.date.toLocaleDateString('en-US')}
              </TableCell>
              <TableCell component="th" scope="donation">
                {donation.charity}
              </TableCell>
              <TableCell align="right">{donation.amount}</TableCell>
              <TableCell align="right">{donation.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
