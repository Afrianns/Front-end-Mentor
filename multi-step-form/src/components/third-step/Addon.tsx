import { ChangeEvent } from "react";
import { addonsCheckedType, offerType } from "../../../types/Type";

interface propsType {
  title: string;
  subtitle: string;
  addonType: string;
  addonsChecked: addonsCheckedType;
  addonsTier: offerType;
  clickSelectAddons: (n: ChangeEvent<HTMLInputElement>, b: string) => void;
}

export default function Addon({
  title,
  subtitle,
  addonType,
  addonsChecked,
  addonsTier,
  clickSelectAddons,
}: propsType) {
  return (
    <>
      <label
        className={
          addonsChecked[addonType]
            ? "addons-wrapper addons-wrapper-selected"
            : "addons-wrapper "
        }
        htmlFor={title}
      >
        <div className="addons-detail">
          <input
            onChange={(evt) => clickSelectAddons(evt, addonType)}
            type="checkbox"
            name={title}
            checked={addonsChecked[addonType]}
            id={title}
          />
          <div className="addons-detail-info">
            <h3>{title}</h3>
            <p className="subtitle">{subtitle}</p>
          </div>
        </div>
        <span>
          +${addonsTier.addons[addonType].price}
          {addonsTier.subsriptionType}
        </span>
      </label>
    </>
  );
}
