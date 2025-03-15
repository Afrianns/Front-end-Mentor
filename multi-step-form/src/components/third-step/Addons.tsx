import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import { addonsCheckedType } from "../../../types/Type";

import { useState } from "react";

interface propsType {
  next: () => void;
  previous: () => void;
  planTier: string;
  addonsChecked: addonsCheckedType;
  setAddonsChecked: (a: addonsCheckedType) => void;
}

export default function Addons({
  next,
  previous,
  planTier,
  addonsChecked,
  setAddonsChecked,
}: propsType) {
  const [addonsTier, _] = useState(planPaymentOptions[planTier]);

  const funcNext = () => {
    next();
  };
  const funcPrevious = () => previous();

  const clickSelectAddons = (
    evt: React.FormEvent<HTMLInputElement>,
    type: string
  ) => {
    setAddonsChecked({
      ...addonsChecked,
      [type]: (evt.target as HTMLFormElement).checked,
    });
  };

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Pick Add-ons</h1>
        <p className="subtitle">Add-ons help enhance your gaming experince</p>
      </div>
      <form className="form-wrapper">
        <label
          className={
            addonsChecked["type_one"]
              ? "addons-wrapper addons-wrapper-selected"
              : "addons-wrapper "
          }
          htmlFor="online-service"
        >
          <div className="addons-detail">
            <input
              onChange={(evt) => clickSelectAddons(evt, "type_one")}
              type="checkbox"
              name="online-service"
              checked={addonsChecked["type_one"]}
              id="online-service"
            />
            <div className="addons-detail-info">
              <h3>Online service</h3>
              <p className="subtitle">Access to multiplayer games</p>
            </div>
          </div>
          <span>
            +${addonsTier.addons["type_one"].price}
            {addonsTier.subsriptionType}
          </span>
        </label>
        <label
          className={
            addonsChecked["type_two"]
              ? "addons-wrapper addons-wrapper-selected"
              : "addons-wrapper "
          }
          htmlFor="large-storage"
        >
          <div className="addons-detail">
            <input
              onChange={(evt) => clickSelectAddons(evt, "type_two")}
              type="checkbox"
              name="large-storage"
              checked={addonsChecked["type_two"]}
              id="large-storage"
            />
            <div className="addons-detail-info">
              <h3>Large Storage</h3>
              <p className="subtitle">Extra 1TB of cloud save</p>
            </div>
          </div>
          <span>
            +${addonsTier.addons["type_two"].price}
            {addonsTier.subsriptionType}
          </span>
        </label>
        <label
          className={
            addonsChecked["type_three"]
              ? "addons-wrapper addons-wrapper-selected"
              : "addons-wrapper "
          }
          htmlFor="customizable-profile"
        >
          <div className="addons-detail">
            <input
              onChange={(evt) => clickSelectAddons(evt, "type_three")}
              type="checkbox"
              checked={addonsChecked["type_three"]}
              name="customizable-profile"
              id="customizable-profile"
            />
            <div className="addons-detail-info">
              <h3>Customizable Profile</h3>
              <p className="subtitle">Custom theme on your profile</p>
            </div>
          </div>
          <span>
            +${addonsTier.addons["type_three"].price}
            {addonsTier.subsriptionType}
          </span>
        </label>
      </form>
      <div className="desktop-bottom-nav-style">
        <p onClick={funcPrevious}>Go Back</p>
        <button className="btn-style" onClick={funcNext}>
          Next Step
        </button>
      </div>
    </div>
  );
}
