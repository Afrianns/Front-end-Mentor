import { useRef, useState } from "react";
import "./style/style.css";

import plansArcade from "../../assets/images/icon-arcade.svg";
import plansAdvanced from "../../assets/images/icon-advanced.svg";
import plansPro from "../../assets/images/icon-pro.svg";

import Exclamation from "./../../assets/images/exclamation-mark.svg";

import {
  activePlanType,
  buttonParamType,
  planPaymentType,
} from "../../../types/Type";
import { planPaymentOptions } from "../../../utils/InitialData";

import Button from "../Button";
import Plan from "./Plan";

interface propsType {
  next: () => void;
  previous: () => void;
  activePlan: activePlanType;
  setActivePlan: (n: activePlanType) => void;
  planTier: string;
  setPlanTier: (n: (b: string) => string) => void;
  isSelected: boolean;
}

const planOptions = [
  {
    id: 1,
    name: "Arcade",
    imgIcon: plansArcade,
    planType: activePlanType.arcade,
  },
  {
    id: 2,
    name: "Advanced",
    imgIcon: plansAdvanced,
    planType: activePlanType.advanced,
  },
  {
    id: 3,
    name: "Pro",
    imgIcon: plansPro,
    planType: activePlanType.pro,
  },
];

export default function Plans({
  next,
  previous,
  activePlan,
  setActivePlan,
  planTier,
  setPlanTier,
  currentStep,
  isSelected,
}: propsType & buttonParamType) {
  const subType = planPaymentOptions[planTier].subsriptionType;
  const updatePlanOptions = useRef(false);
  const [planPayment, setPlanPayment] = useState<planPaymentType>(
    planPaymentOptions[planTier].plans
  );

  if (updatePlanOptions.current) {
    setPlanPayment({ ...planPaymentOptions[planTier].plans });
    updatePlanOptions.current = false;
  }

  const clickPlanBilingType = () => {
    updatePlanOptions.current = true;
    setPlanTier((planTier: string) =>
      planTier == "monthly" ? "yearly" : "monthly"
    );
  };

  const changeActivePlan = (type: activePlanType) => setActivePlan(type);

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Choose Plans</h1>
        <p className="subtitle">
          You have the options of monthly or yearly billing.
        </p>
        <div className="plans-type-wrapper">
          {planOptions.map((plan) => (
            <Plan
              key={plan.id}
              {...plan}
              changeActivePlan={changeActivePlan}
              subType={subType}
              planPayment={planPayment}
              activePlan={activePlan}
            />
          ))}
        </div>
        <div className="options-style">
          <p className={planTier == "monthly" ? "type-plan-style" : ""}>
            Monthly
          </p>
          <p className="plan-tier-style" onClick={clickPlanBilingType}>
            <span
              className="handle-style"
              style={
                planTier == "monthly" ? { left: ".2rem" } : { left: "1.4rem" }
              }
            ></span>
          </p>
          <p className={planTier == "yearly" ? "type-plan-style" : ""}>
            Yearly
          </p>
        </div>
        <div className={isSelected ? "warn-info-plan-style" : "hide-style"}>
          <img src={Exclamation} alt="" />
          <p>Choose plan first to continue</p>
        </div>
      </div>
      <div className="desktop-bottom-nav-style">
        <Button prevStep={previous} nextStep={next} currentStep={currentStep} />
      </div>
    </div>
  );
}
