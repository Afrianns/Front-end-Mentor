import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import { addonsCheckedType, planType } from "../../../types/Type";

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
}: propsType) {
  const funcPrevious = () => previous();

  const components = [];
  let totalComponentsPrice = 0;
  const subType = planPaymentOptions[plan.option].subsriptionType;

  const choosedPlan = planPaymentOptions[plan.option].plans[plan.choosePlan];

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
      </div>
      <div>
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
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style">Submit</button>
      </div>
    </div>
  );
}
