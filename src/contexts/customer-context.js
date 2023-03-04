/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import React, { useState, createContext, useEffect, useContext } from "react";
import { getCustomerDetails } from "src/services/APIService.js";

const initialValues = {
  email: undefined,
  customerId: undefined,
};
const CustomerContext = createContext(initialValues);

const Customer = (props) => {
  const [authData, setAuthData] = useState(initialValues);
  const router = useRouter();

  const [customerData, setCustomerData] = useState({
    creditLimit: 0,
    currentAccount: 0,
    savings: 0,
    missedPayments: 0,
    creditSpent: 0,
  });

  const [loading, setLoading] = useState(false);

  async function signout() {
    try {
      setAuthData(initialValues);
      router.push("/auth/login");
    } catch (error) {
      console.log("error signing out", error);
    }
  }

  async function signin(email) {
    try {
      setLoading(true);
      getCustomerDetails(email)
        .then((res) => {
          console.log("these are the details", res.customers[0]);

          setAuthData({
            email: email,
            customerId: res.customers[0].id,
          });

          setCustomerData({
            creditLimit: res.customers[0].credit_limit,
            currentAccount: res.customers[0].current_account,
            savings: res.customers[0].savings,
            creditSpent: res.customers[0].credit_spent,
          });
          setLoading(false);

          router.push("/");
        })
        .catch((err) => {
          console.log("Something went wrong");
          setLoading(false);
        });

      return;
      // setAuthData({ email: email, customerId: getCustomerId(email) });
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  useEffect(() => {
    if (!authData.email && !authData.customerId) {
      router.push("/auth/login");
    }
  }, [authData]);

  return (
    <CustomerContext.Provider value={{ authData, signin, loading, customerData,signout }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export { Customer, CustomerContext };
