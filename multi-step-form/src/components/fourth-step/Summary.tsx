import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import {
  addonsCheckedType,
  buttonParamType,
  planType,
} from "../../../types/Type";
import Button from "../Button";

interface propsType {
  previous: () => void;
  plan: planType;
  addons: addonsCheckedType;
  jumpStep: () => void;
}

export default function Summary({
  previous,
  jumpStep,
  plan,
  addons,
  next,
  currentStep,
}: propsType & buttonParamType) {
  let totalComponentsPrice = 0;

  const subType = planPaymentOptions[plan.option].subsriptionType;
  const choosedPlan = planPaymentOptions[plan.option].plans[plan.choosePlan];
  const components = [];

  for (const key in addons) {
    if (addons[key]) {
      let data = planPaymentOptions[plan.option].addons[key];
      components.push(data);
      totalComponentsPrice += data.price;
    }
  }

  const funcCalcSum = () => choosedPlan.price + totalComponentsPrice;

  const funcChangePlan = () => jumpStep();
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
              {planPaymentOptions[plan.option].subsriptionType}
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
      </div>
      <div className="desktop-bottom-nav-style">
        <Button prevStep={previous} nextStep={next} currentStep={currentStep} />
      </div>
    </div>
  );
}
