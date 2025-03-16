import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import { addonsCheckedType, buttonParamType } from "../../../types/Type";

import { useState } from "react";
import Button from "../Button";
import Addon from "./Addon";

interface propsType {
  next: () => void;
  previous: () => void;
  planTier: string;
  addonsChecked: addonsCheckedType;
  setAddonsChecked: (a: addonsCheckedType) => void;
}

const addonOptions = [
  {
    id: 1,
    title: "Online service",
    subtitle: "Access to multiplayer games",
    addonType: "type_one",
  },
  {
    id: 2,
    title: "Large storage",
    subtitle: "Extra 1TB of cloud save",
    addonType: "type_two",
  },
  {
    id: 3,
    title: "Customizable profile",
    subtitle: "Custom theme on your profile",
    addonType: "type_three",
  },
];

export default function Addons({
  next,
  previous,
  planTier,
  addonsChecked,
  setAddonsChecked,
  currentStep,
}: propsType & buttonParamType) {
  const [addonsTier, _] = useState(planPaymentOptions[planTier]);

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
        <form className="form-wrapper">
          {addonOptions.map((addon) => (
            <Addon
              key={addon.id}
              {...addon}
              clickSelectAddons={clickSelectAddons}
              addonsChecked={addonsChecked}
              addonsTier={addonsTier}
            />
          ))}
        </form>
      </div>
      <div className="desktop-bottom-nav-style">
        <Button prevStep={previous} nextStep={next} currentStep={currentStep} />
      </div>
    </div>
  );
}
