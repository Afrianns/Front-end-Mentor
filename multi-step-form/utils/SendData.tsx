import { useEffect } from "react";

import {
  planType,
  ProfileType,
  componentType,
  choosedPlanType,
  sendStatusEnum,
} from "../types/Type";

const URL = `https://api.telegram.org/bot${
  import.meta.env.VITE_TELEGRAM_API_TOKEN
}`;

interface propsType {
  components: componentType[];
  subType: string;
  plan: planType;
  choosedPlan: choosedPlanType;
  profile: ProfileType;
  sendStatus: sendStatusEnum;
  setSendStatus: (n: sendStatusEnum) => void;
  funcCalcSum: () => void;
}

export default function SendData({
  components,
  subType,
  plan,
  choosedPlan,
  profile,
  sendStatus,
  setSendStatus,
  funcCalcSum,
}: propsType) {
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
  *Total Price*         : *$${funcCalcSum()}${subType}*
  
  *P\\.S*: ${escapeStr(
    profile.name
  ).toLowerCase()} need to _pay_ every *${plan.option.replace("ly", "")}*\\.

  $Thanks
  `;

  // send post request to Telegram API
  useEffect(() => {
    if (sendStatus === sendStatusEnum.sending) {
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
          setSendStatus(sendStatusEnum.success);

          console.log(res);
        })
        .catch((err) => {
          setSendStatus(sendStatusEnum.failed);
          console.log(err);
        });
    }
  }, [sendStatus]);
}
