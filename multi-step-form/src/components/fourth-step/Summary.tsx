import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import {
  addonsCheckedType,
  buttonParamType,
  planType,
  ProfileType,
  sendStatusEnum,
  componentType,
  choosedPlanType,
} from "../../../types/Type";
import Button from "../Button";

import Exclamation from "./../../assets/images/exclamation-mark.svg";

import SendData from "../../../utils/SendData";
import { useRef, useState } from "react";

interface propsType {
  previous: () => void;
  plan: planType;
  addons: addonsCheckedType;
  jumpStep: () => void;
  profile: ProfileType;
  setSendStatus: (n: sendStatusEnum) => void;
  sendStatus: sendStatusEnum;
  next: () => void;
}

export default function Summary({
  previous,
  jumpStep,
  plan,
  addons,
  next,
  currentStep,
  profile,
  sendStatus,
  setSendStatus,
}: propsType & buttonParamType) {
  let totalComponentsPrice = 0;

  const [errorSending, setErrorSending] = useState(false);
  const isError = useRef(false);

  const subType = planPaymentOptions[plan.option].subsriptionType;
  const choosedPlan: choosedPlanType =
    planPaymentOptions[plan.option].plans[plan.choosePlan];
  const components: componentType[] = [];

  for (const key in addons) {
    if (addons[key]) {
      let data = planPaymentOptions[plan.option].addons[key];
      components.push(data);
      totalComponentsPrice += data.price;
    }
  }

  const funcCalcSum = () => choosedPlan.price + totalComponentsPrice;

  SendData({
    components,
    subType,
    plan,
    choosedPlan,
    profile,
    sendStatus,
    setSendStatus,
    funcCalcSum,
  });

  const funcChangePlan = () => jumpStep();

  if (
    sendStatus === sendStatusEnum.failed &&
    currentStep == 4 &&
    !isError.current
  ) {
    isError.current = true;
    setErrorSending(true);
  }

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Finishing-up</h1>
        <p className="subtitle">Double-check everything before confirming</p>
        <div className="summary-list-style">
          <section className="primary-plan-style">
            <div className="primary-plan-info-style">
              <p className="type">
                {plan.choosePlan} ({plan.option})
              </p>
              <span className="edit-link-style" onClick={funcChangePlan}>
                Change
              </span>
            </div>
            <p>
              ${choosedPlan.price}
              {subType}
            </p>
          </section>
          <hr />

          {components.map((component, index) => {
            return (
              <section className="addons-plan-style" key={index}>
                <p className="addons-plan-info-style">{component.name}</p>
                <p>
                  +${component.price}
                  {subType}
                </p>
              </section>
            );
          })}
        </div>
        <div className="total-price-style">
          <p>Total (per {plan.option == "monthly" ? "month" : "year"})</p>
          <p>
            ${funcCalcSum()}
            {subType}
          </p>
        </div>
        <div className={errorSending ? "warn-info-plan-style" : "hide-style"}>
          <img src={Exclamation} alt="" />
          <p>There is an error occur, please try again</p>
        </div>
      </div>
      <div className="desktop-bottom-nav-style">
        <Button
          prevStep={previous}
          nextStep={next}
          currentStep={currentStep}
          loadingConfirm={sendStatus}
        />
      </div>
    </div>
  );
}
