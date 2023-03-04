import React from "react";

import axios from "axios";

export async function getCustomerDetails(email) {
  let i = await axios
    .post("https://better-mollusk-57.hasura.app/api/rest/getCustomerDetails", { email: email })
    .then((res) => {
      console.log("these are the details", res);
      return res?.data;
    })
    .catch((err) => {
      console.log("Something went wrong");
      return err;
    });

  return i;
}

export async function getOffers() {
  let i = await axios
    .get("https://better-mollusk-57.hasura.app/api/rest/getOffers")
    .then((res) => {
      console.log("these are the details", res);
      return res?.data;
    })
    .catch((err) => {
      console.log("Something went wrong");
      return err;
    });

  return i;
}

export async function getCustomerPayments(id) {
  let i = await axios
    .post("https://better-mollusk-57.hasura.app/api/rest/getCustomerPayments", {
      customerId: id,
    })
    .then((res) => {
      console.log("these are the details", res);
      return res?.data;
    })
    .catch((err) => {
      console.log("Something went wrong");
      return err;
    });

  return i;
}
