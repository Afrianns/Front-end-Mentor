import { planType, activePlanType } from "../../../../types/Type";

interface propsType {
  next: () => void;
  previous: () => void;
  setPlan: (n: planType) => void;
  activePlan: activePlanType;
  setActivePlan: (n: activePlanType) => void;
  planTier: string;
  setPlanTier: (n: (b: string) => string) => void;
}

export type { propsType};
