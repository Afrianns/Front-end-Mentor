import { useRef, useState } from "react";
import "./style/style.css";

import plansArcade from "../../assets/images/icon-arcade.svg";
import plansAdvanced from "../../assets/images/icon-advanced.svg";
import plansPro from "../../assets/images/icon-pro.svg";

import { activePlanType, planPaymentType } from "../../../types/Type";
import { planPaymentOptions } from "../../../utils/InitialData";

import { propsType } from "./types/Types";

export default function Plans({
  next,
  previous,
  setPlan,
  activePlan,
  setActivePlan,
  planTier,
  setPlanTier,
}: propsType) {
  const [planPayment, setPlanPayment] = useState<planPaymentType>(
    planPaymentOptions[planTier].plans
  );

  const updatePlanOptions = useRef(false);

  const funcPrevious = () => previous();
  const funcNext = () => {
    setPlan({
      option: planTier,
      choosePlan: activePlan,
    });
    next();
  };

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

  const changeActivePlan = (type: activePlanType) => {
    setActivePlan(type);
  };

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Choose Plans</h1>
        <p className="subtitle">
          You have the options of monthly or yearly billing.
        </p>
        <div className="plans-type-wrapper">
          <section
            onClick={() => changeActivePlan(activePlanType.arcade)}
            className={
              activePlan == "arcade"
                ? "plan-type-style plan-type-style-active"
                : "plan-type-style"
            }
          >
            <img src={plansArcade} alt="plan type arcade" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Arcade</h4>
              <p>${planPayment.arcade.price}</p>
            </div>
            <span className="payment-msg-style">{planPayment.arcade.msg}</span>
          </section>
          <section
            onClick={() => changeActivePlan(activePlanType.advanced)}
            className={
              activePlan == "advanced"
                ? "plan-type-style plan-type-style-active"
                : "plan-type-style"
            }
          >
            <img src={plansAdvanced} alt="plan type Advanced" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Advanced</h4>
              <p>${planPayment.advanced.price}</p>
            </div>
            <span className="payment-msg-style">
              {planPayment.advanced.msg}
            </span>
          </section>
          <section
            onClick={() => changeActivePlan(activePlanType.pro)}
            className={
              activePlan == "pro"
                ? "plan-type-style plan-type-style-active"
                : "plan-type-style"
            }
          >
            <img src={plansPro} alt="plan type Pro" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Pro</h4>
              <p>${planPayment.pro.price}</p>
            </div>
            <span className="payment-msg-style">{planPayment.pro.msg}</span>
          </section>
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
      </div>
      <div className="bottom-nav-style">
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style" onClick={funcNext}>
          Next Step
        </button>
      </div>
    </div>
  );
}
