import React from "react";
import { addPaymentDebt } from "../../../libs/effects";

export const Payment = () => {
  const handleClick = e => {
    addPaymentDebt("346790", "10.06.2020", 93000.0);
  };
  return <button onClick={handleClick}>Payment</button>;
};
