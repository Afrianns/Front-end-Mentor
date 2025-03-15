import { activePlanType, planPaymentOptionsType } from "../types/Type";

export const planPaymentOptions: planPaymentOptionsType = {
  monthly: {
    addons: {
      type_one: {
        name: "Online service",
        price: 1,
      },
      type_two: {
        name: "Large storage",
        price: 2,
      },
      type_three: {
        name: "Customizable profile",
        price: 2,
      },
    },
    plans: {
      [activePlanType.none]: {
        price: 0,
        msg: "",
      },
      [activePlanType.arcade]: {
        price: 9,
        msg: "",
      },
      [activePlanType.advanced]: {
        price: 12,
        msg: "",
      },
      [activePlanType.pro]: {
        price: 15,
        msg: "",
      },
    },
    subsriptionType: "/mo",
  },
  yearly: {
    addons: {
      type_one: {
        name: "Online service",
        price: 10,
      },
      type_two: {
        name: "Large storage",
        price: 20,
      },
      type_three: {
        name: "Customizable profile",
        price: 20,
      },
    },
    plans: {
      [activePlanType.none]: {
        price: 0,
        msg: "",
      },
      [activePlanType.arcade]: {
        price: 90,
        msg: "2 months free",
      },
      [activePlanType.advanced]: {
        price: 120,
        msg: "2 months free",
      },
      [activePlanType.pro]: {
        price: 150,
        msg: "2 months free",
      },
    },
    subsriptionType: "/yr",
  },
};
