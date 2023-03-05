import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "src/contexts/customer-context";
import { getCustomerPayments } from "src/services/APIService";
import { resolve } from "path";

// const statusMap = {
//   pending: "UPCOMING",
//   delivered: "ONTIME",
//   refunded: "MISSED",
// };

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  const { authData } = useContext(CustomerContext);

  const [payments, setPayments] = useState([]);

  function getPaymentType(type) {
    if(type === "UPCOMING") return "warning"
    if(type === "ONTIME") return "success"
    if(type === "MISSED") return "error"
  }

  useEffect(() => {
    getCustomerPayments(authData.customerId)
      .then((res) => {
        console.log("These are the payments", res);
        setPayments(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authData]);

  if (payments === []) return <p>Payments</p>;

  return (
    <Card sx={sx}>
      <CardHeader title="Your Payments" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell sortDirection="desc">Payment Due Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments?.customer_payments?.map((payment) => {
                return (
                  <TableRow hover key={payment.id}>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{payment.payment_date}</TableCell>
                    <TableCell>{payment.payment_due}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    
                    <TableCell>
                      <SeverityPill color={getPaymentType(payment.type_of_payment)}>
                        {payment.type_of_payment}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />

    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
