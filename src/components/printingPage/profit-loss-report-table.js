import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";



export default function CollapsibleTable({ profitOrLossReport }) {
  function convert(date) {
    var date = new Date(date),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>S/N</TableCell>
          <TableCell>Invoice</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Product name</TableCell>
          <TableCell align="right">Cost Price</TableCell>
          <TableCell align="right">Selling Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Total Selling Price</TableCell>
          <TableCell align="right">Profit</TableCell>
          <TableCell align="right">Loss</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {profitOrLossReport?.map((row, index) => (
          
          <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
             <TableCell align="right">{index + 1}</TableCell>
            <TableCell component="th" scope="row">
              {row.invoice_number}
            </TableCell>
            <TableCell align="right">{convert(new Date(row?.created_at))}</TableCell>
            <TableCell align="right">{row.product}</TableCell>
            <TableCell align="right">{row.cost_price}</TableCell>
            <TableCell align="right">{`₦${row.selling_price}`}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">
              {`₦${Number(row.quantity) * Number(row.selling_price)}`}
            </TableCell>
            <TableCell align="right">{row.selling_price - row.cost_price<0?0:row.selling_price - row.cost_price}</TableCell>
            <TableCell align="right">{row.selling_price - row.cost_price>0?0:row.selling_price-row.cost_price}</TableCell>
            {/* <TableCell align="right">{row.previous_product_quantity}</TableCell> */}
            
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Typography variant="h6">Total Profit</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">{`₦${profitOrLossReport?.reduce(
              (a, c) => a + Number(c.selling_price - c.cost_price),
              0
            )}`}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Total Loss</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">{`₦${profitOrLossReport?.reduce(
              (a, c) => a + Number(c.selling_price - c.cost_price>0?0:c.selling_price - c.cost_price),
              0
            )}`}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  );
}
