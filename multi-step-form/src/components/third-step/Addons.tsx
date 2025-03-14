import "./style/style.css";

interface propsType {
  next: () => void;
  previous: () => void;
}

export default function Addons({ next, previous }: propsType) {
  const funcNext = () => next();
  const funcPrevious = () => previous();

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Pick Add-ons</h1>
        <p className="subtitle">Add-ons help enhance your gaming experince</p>
      </div>
      <form className="form-wrapper">
        <label className="addons-wrapper" htmlFor="online-service">
          <div className="addons-detail">
            <input type="checkbox" name="online-service" id="online-service" />
            <div className="addons-detail-info">
              <h3>Online service</h3>
              <p className="subtitle">Access to multiplayer games</p>
            </div>
          </div>
          <span>+$1/mo</span>
        </label>
        <label className="addons-wrapper" htmlFor="large-storage">
          <div className="addons-detail">
            <input type="checkbox" name="large-storage" id="large-storage" />
            <div className="addons-detail-info">
              <h3>Large Storage</h3>
              <p className="subtitle">Extra 1TB of cloud save</p>
            </div>
          </div>
          <span>+$2/mo</span>
        </label>
        <label className="addons-wrapper" htmlFor="customizable-profile">
          <div className="addons-detail">
            <input
              type="checkbox"
              name="customizable-profile"
              id="customizable-profile"
            />
            <div className="addons-detail-info">
              <h3>Customizable Profile</h3>
              <p className="subtitle">Custom theme on your profile</p>
            </div>
          </div>
          <span>+$2/mo</span>
        </label>
      </form>
      <div className="bottom-nav-style">
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style" onClick={funcNext}>
          Next Step
        </button>
      </div>
    </div>
  );
}
