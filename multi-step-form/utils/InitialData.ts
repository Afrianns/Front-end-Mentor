import { planPaymentOptionsType } from "../types/Type";

export const planPaymentOptions: planPaymentOptionsType = {
  monthly: {
    addons: {
      type_one: "1/mo",
      type_two: "2/mo",
      type_three: "2/mo",
    },
    plans: {
      arcade: {
        price: "9/mo",
        msg: "",
      },
      advanced: {
        price: "12/mo",
        msg: "",
      },
      pro: {
        price: "15/mo",
        msg: "",
      },
    },
  },
  yearly: {
    addons: {
      type_one: "10/yr",
      type_two: "20/yr",
      type_three: "20/yr",
    },
    plans: {
      arcade: {
        price: "90/yr",
        msg: "2 months free",
      },
      advanced: {
        price: "120/yr",
        msg: "2 months free",
      },
      pro: {
        price: "150/yr",
        msg: "2 months free",
      },
    },
  },
};
