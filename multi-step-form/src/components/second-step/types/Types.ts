import { planType, activePlanType } from "../../../../types/Type";

interface propsType {
  next: () => void;
  previous: () => void;
  setPlan: (n: planType) => void;
  activePlan: activePlanType;
  setActivePlan: (n: activePlanType) => void;
  toggle: string;
  setToggle: (n: (b: string) => string) => void;
}

type paymentTierType = {
  price: number;
  msg: string;
};

type planPaymentType = {
  arcade: paymentTierType;
  advanced: paymentTierType;
  pro: paymentTierType;
};

type planPaymentOptionsType = {
  [a: string]: planPaymentType;
};

export type { propsType, planPaymentOptionsType, planPaymentType };
