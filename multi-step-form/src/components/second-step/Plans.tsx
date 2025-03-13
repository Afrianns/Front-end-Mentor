import plansArcade from "../../assets/images/icon-arcade.svg";
import plansAdvanced from "../../assets/images/icon-advanced.svg";
import plansPro from "../../assets/images/icon-pro.svg";
import "./style/style.css";

interface propsType {
  next: () => void
  previous: () => void
} 

export default function Plans({next, previous}: propsType) {

  const funcNext = () => {
    next()
  }
  const funcPrevious = () => {
    previous()
  }
  return (
    <>
      <div>
        <h1 className="title">Choose Plans</h1>
        <p className="subtitle">
          You have the options of monthly or yearly billing.
        </p>
        <div className="plans-type-wrapper">
          <section className="plan-type-style">
            <img src={plansArcade} alt="" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Arcade</h4>
              <p>$9/mo</p>
            </div>
          </section>
          <section className="plan-type-style">
            <img src={plansAdvanced} alt="" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Advanced</h4>
              <p>$12/mo</p>
            </div>
          </section>
          <section className="plan-type-style">
            <img src={plansPro} alt="" />
            <div className="plan-detail-style">
              <h4 className="plan-title">Pro</h4>
              <p>$15/mo</p>
            </div>
          </section>
        </div>
        <div className="options-style">
          <p>Monthly</p>
          <p className="toggle-style">
            <span className="handle-style"></span>
          </p>
          <p>Yearly</p>
        </div>
      </div>
      <div className="bottom-nav-style">
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style" onClick={funcNext}>Next Step</button>
      </div>
    </>
  );
}
