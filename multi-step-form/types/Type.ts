enum activePlanType {
  none,
  arcade = "arcade",
  advanced = "advanced",
  pro = "pro",
}
type planType = {
  option: string;
  choosePlan: activePlanType;
};

type paymentTierType = {
  price: string;
  msg: string;
};

type addonsType = {
  [a: string]: string;
};

type addonsCheckedType = {
 [a: string]: boolean 
}

type offerType = {
  addons: addonsType;
  plans:  planPaymentType;
};

type planPaymentType = {
  arcade: paymentTierType;
  advanced: paymentTierType;
  pro: paymentTierType;
};

type planPaymentOptionsType = {
  [a: string]: offerType;
};

export {
  activePlanType,
  type planType,
  type planPaymentOptionsType,
  type planPaymentType,
  type addonsCheckedType
};
