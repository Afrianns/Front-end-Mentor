enum activePlanType {
  none,
  arcade = "Arcade",
  advanced = "Advanced",
  pro = "Pro",
}

type ProfileType = {
  name: string;
  email: string;
  phone: string;
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

export {
  activePlanType,
  type planType,
  type planPaymentOptionsType,
  type planPaymentType,
  type addonsCheckedType,
  type ProfileType,
  type addonsType,
};
