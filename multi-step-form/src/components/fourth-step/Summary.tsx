import "./style/style.css";
import { planPaymentOptions } from "../../../utils/InitialData";
import {
  addonsCheckedType,
  buttonParamType,
  planType,
  ProfileType,
} from "../../../types/Type";
import Button from "../Button";
import { useEffect, useState } from "react";

interface propsType {
  previous: () => void;
  plan: planType;
  addons: addonsCheckedType;
  jumpStep: () => void;
  profile: ProfileType;
}

const URL = `https://api.telegram.org/bot${
  import.meta.env.VITE_TELEGRAM_API_TOKEN
}`;

type componentType = {
  name: string;
  price: number;
};

export default function Summary({
  previous,
  jumpStep,
  plan,
  addons,
  next,
  currentStep,
  profile,
}: propsType & buttonParamType) {
  let totalComponentsPrice = 0;

  const subType = planPaymentOptions[plan.option].subsriptionType;
  const choosedPlan = planPaymentOptions[plan.option].plans[plan.choosePlan];
  const components: componentType[] = [];

  const [getClicked, setGetClicked] = useState(false);

  for (const key in addons) {
    if (addons[key]) {
      let data = planPaymentOptions[plan.option].addons[key];
      components.push(data);
      totalComponentsPrice += data.price;
    }
  }

  const funcCalcSum = () => choosedPlan.price + totalComponentsPrice;

  // Escape string character form input to telegram API parse
  const escapeStr = (value: string) => {
    let newValue = "";
    const regexp = /[\_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.\!]/gi;
    let chars = [...new Set(value.match(regexp))];

    if (chars != undefined) {
      newValue = replaceEscapeChar(value, chars, chars.length - 1);
    } else {
      newValue = value;
    }
    return newValue;
  };

  const replaceEscapeChar = (value: string, chars: string[], i: number) => {
    if (i < 0) {
      return value;
    } else {
      let result = value.replace(
        new RegExp(`[\\${chars[i]}]`, "g"),
        `\\${chars[i]}`
      );

      return replaceEscapeChar(result, chars, --i);
    }
  };

  // render multiple choosed Addons to Message
  const renderAddons = () => {
    let strs = "";
    components.forEach((component) => {
      strs += `${component.name}     : *$${component.price}${subType}*\n  `;
    });

    return strs;
  };

  // string literal Message for Telegram
  const Message = `
  ${escapeStr("-----------")}*MESSAGE FROM MULTI\\-STEP FORM*${escapeStr(
    "-----------"
  )}
  
  ${escapeStr("-------------------------------")}*User Data*${escapeStr(
    "--------------------------------"
  )}
  Name          : ${escapeStr(profile.name)}
  Email         : ${escapeStr(profile.email)}
  Phone Number  : ${escapeStr(profile.phone)}

  ${escapeStr("+-------------------------")}*Plan Selected*${escapeStr(
    "----------------------------+"
  )}
  ${plan.choosePlan} \\(${plan.option}\\)     : *$${
    choosedPlan.price
  }${subType}*


  ${escapeStr("+----------------------")}*Add\\-ons Selected*${escapeStr(
    "------------------------+"
  )}
  ${renderAddons()}

  ${escapeStr(
    "+---------------------------------------------------------------------------+"
  )}
  *Total Price*         : *$${
    choosedPlan.price + totalComponentsPrice
  }${subType}*
  
  *P\\.S*: ${escapeStr(
    profile.name
  ).toLowerCase()} need to _pay_ every *${plan.option.replace("ly", "")}*\\.

  $Thanks
  `;

  // send post request to Telegram API
  useEffect(() => {
    if (getClicked) {
      fetch(URL + "/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
          text: Message,
          parse_mode: "MarkdownV2",
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          next();
          setGetClicked(false);
        });
    }
  }, [getClicked]);

  const funcNext = () => {
    // check if already on summary section to call post request
    if (currentStep == 4) setGetClicked(true);
  };

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
      </div>
      <div className="desktop-bottom-nav-style">
        <Button
          prevStep={previous}
          nextStep={funcNext}
          currentStep={currentStep}
          loadingConfirm={getClicked}
        />
      </div>
    </div>
  );
}
