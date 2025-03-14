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

export { activePlanType, type planType };
