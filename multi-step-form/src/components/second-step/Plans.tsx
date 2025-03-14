import { useRef, useState } from "react";
import "./style/style.css";

import plansArcade from "../../assets/images/icon-arcade.svg";
import plansAdvanced from "../../assets/images/icon-advanced.svg";
import plansPro from "../../assets/images/icon-pro.svg";

import { activePlanType } from "../../../types/Type";
import {
  propsType,
  planPaymentOptionsType,
  planPaymentType,
} from "./types/Types";

const planPaymentOptions: planPaymentOptionsType = {
  monthly: {
    arcade: {
      price: 9,
      msg: "",
    },
    advanced: {
      price: 12,
      msg: "",
    },
    pro: {
      price: 15,
      msg: "",
    },
  },
  yearly: {
    arcade: {
      price: 90,
      msg: "2 months free",
    },
    advanced: {
      price: 120,
      msg: "2 months free",
    },
    pro: {
      price: 150,
      msg: "2 months free",
    },
  },
};

export default function Plans({
  next,
  previous,
  setPlan,
  activePlan,
  setActivePlan,
  toggle,
  setToggle,
}: propsType) {
  const [planPayment, setPlanPayment] = useState<planPaymentType>(
    planPaymentOptions[toggle]
  );

  const updatePlanOptions = useRef(false);

  const funcPrevious = () => previous();
  const funcNext = () => {
    setPlan({
      option: toggle,
      choosePlan: activePlan,
    });
    next();
  };
  
  if (updatePlanOptions.current) {
    setPlanPayment({ ...planPaymentOptions[toggle] });
    updatePlanOptions.current = false;
  }
  
  const clickPlanBilingType = () => {
    updatePlanOptions.current = true;
    setToggle((toggle: string) => (toggle == "monthly" ? "yearly" : "monthly"));
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
              <p>${planPayment.arcade.price}/mo</p>
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
              <p>${planPayment.advanced.price}/mo</p>
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
              <p>${planPayment.pro.price}/mo</p>
            </div>
            <span className="payment-msg-style">{planPayment.pro.msg}</span>
          </section>
        </div>
        <div className="options-style">
          <p className={toggle == "monthly" ? "type-plan-style" : ""}>
            Monthly
          </p>
          <p className="toggle-style" onClick={clickPlanBilingType}>
            <span
              className="handle-style"
              style={
                toggle == "monthly" ? { left: ".2rem" } : { left: "1.4rem" }
              }
            ></span>
          </p>
          <p className={toggle == "yearly" ? "type-plan-style" : ""}>Yearly</p>
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
