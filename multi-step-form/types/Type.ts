export enum activePlanType {
  none,
  arcade = "Arcade",
  advanced = "Advanced",
  pro = "Pro",
}

export enum sendStatusEnum {
  none,
  sending,
  success,
  failed,
}

// button type
interface buttonParamType {
  currentStep: number;
  previous: () => void;
  next: () => void;
}

type ProfileType = {
  [a: string]: string;
};

type planType = {
  option: string;
  choosePlan: activePlanType;
};

type paymentTierType = {
  price: number;
  msg: string;
};

type addonsType = {
  [a: string]: {
    name: string;
    price: number;
  };
};

type addonsCheckedType = {
  [a: string]: boolean;
};

type offerType = {
  addons: addonsType;
  plans: planPaymentType;
  subsriptionType: string;
};

type planPaymentType = {
  [activePlanType.none]: paymentTierType;
  [activePlanType.arcade]: paymentTierType;
  [activePlanType.advanced]: paymentTierType;
  [activePlanType.pro]: paymentTierType;
};

type planPaymentOptionsType = {
  [a: string]: offerType;
};

// reducer types
type stateInsideType = {
  [a: string]: boolean;
};
interface stateType {
  [a: string]: stateInsideType;
}

type actionType = {
  type: string;
  isError: boolean;
};

type componentType = {
  name: string;
  price: number;
};

type choosedPlanType = {
  msg: string;
  price: number;
};

export type {
  planType,
  planPaymentOptionsType,
  planPaymentType,
  addonsCheckedType,
  ProfileType,
  addonsType,
  buttonParamType,
  offerType,
  stateType,
  actionType,
  componentType,
  choosedPlanType,
};
