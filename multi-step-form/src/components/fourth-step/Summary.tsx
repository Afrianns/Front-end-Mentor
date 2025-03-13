import "./style/style.css";

interface propsType {
  previous: () => void;
}

export default function Summary({ previous }: propsType) {
  const funcPrevious = () => {
    previous();
  };
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
              <p className="type">Arcade (Monthly)</p>
              <span className="edit-link-style">Change</span>
            </div>
            <p>$9/mo</p>
          </section>
          <hr />
          <section className="addons-plan-style">
            <p className="addons-plan-info-style">Online service</p>
            <p>+$2/mo</p>
          </section>
          <section className="addons-plan-style">
            <p className="addons-plan-info-style">Large storage</p>
            <p>+$2/mo</p>
          </section>
        </div>
        <div className="total-price-style">
          <p>Total (per Month)</p>
          <p>+$12/mo</p>
        </div>
      </div>
      <div className="bottom-nav-style">
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style">Next Step</button>
      </div>
    </div>
  );
}
