import "./App.css";
import { useState, useReducer } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";


import InputErrorReducer from "../utils/InputErrorReducer";

import {
  activePlanType,
  planType,
  addonsCheckedType,
  ProfileType,
  sendStatusEnum,
} from "../types/Type";

// steps components
import Profile from "./components/first-step/Profile";
import Plans from "./components/second-step/Plans";
import Addons from "./components/third-step/Addons";
import Summary from "./components/fourth-step/Summary";
import Button from "./components/Button";
import Confirmed from "./components/confirmed-step/Confirmed";

const initialProfileData = { name: "", email: "", phone: "" };
const initialChoosePlan = { option: "", choosePlan: activePlanType.none };

const initalAddonsChecked = {
  type_one: false,
  type_two: false,
  type_three: false,
};

let initialErrorInput = {
  name: { isError: false },
  email: { isError: false },
  phone: { isError: false },
};

const inputsList = ["name", "email", "phone"];

function App() {
  // initial Variable / useState variable
  let component;
  let addonsSelected = [];

  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<planType>(initialChoosePlan);

  const [profile, setProfile] = useState<ProfileType>(initialProfileData);

  const [planTier, setPlanTier] = useState("monthly");
  const [activePlan, setActivePlan] = useState<activePlanType>(
    activePlanType.none
  );

  const [sendStatus, setSendStatus] = useState<sendStatusEnum>(
    sendStatusEnum.none
  );
  const [isSelected, setIsSelected] = useState(false);

  const [errorInput, dispatch] = useReducer(
    InputErrorReducer,
    initialErrorInput
  );

  const [addonsChecked, setAddonsChecked] =
    useState<addonsCheckedType>(initalAddonsChecked);

  // jump to next step
  const prevStep = () => setCurrentStep(currentStep - 1);
  const jumpPrevStep = () => setCurrentStep(currentStep - 2);

  // step function
  const nextStep = () => {
    if (currentStep == 1) {
      // check if error then show error messages
      inputsList.forEach((inputOption: string) => {
        dispatch({
          type: inputOption.toUpperCase(),
          isError: !profile?.[inputOption],
        });
      });

      // if profile data filled, go next section
      if (!profile?.name || !profile?.email || !profile?.phone) {
        console.log("hello");
        return;
      }
    } else if (currentStep == 2) {
      setPlan({
        option: planTier,
        choosePlan: activePlan,
      });

      // prevent user to continue if plan isn't selected
      const isSelected = activePlan == activePlanType.none;

      setIsSelected(isSelected);
      if (isSelected) return;
    } else if (currentStep == 4) {
      // set status to sending so summary getData will be trigger
      return setSendStatus(sendStatusEnum.sending);
    }
    setCurrentStep(currentStep + 1);
  };

  const step = {
    next: nextStep,
    previous: prevStep,
    currentStep: currentStep,
  };

  if (sendStatus === sendStatusEnum.success && currentStep == 4) {
    setCurrentStep(currentStep + 1);
  }
  const steps = [
    {
      id: 1,
      component: (
        <Profile
          {...step}
          profile={profile}
          setProfile={setProfile}
          errorInput={errorInput}
        />
      ),
    },
    {
      id: 2,
      component: (
        <Plans
          {...step}
          activePlan={activePlan}
          setActivePlan={setActivePlan}
          planTier={planTier}
          isSelected={isSelected}
          setPlanTier={setPlanTier}
        />
      ),
    },
    {
      id: 3,
      component: (
        <Addons
          {...step}
          planTier={planTier}
          addonsChecked={addonsChecked}
          setAddonsChecked={setAddonsChecked}
        />
      ),
    },
    {
      id: 4,
      component: (
        <Summary
          {...step}
          jumpStep={jumpPrevStep}
          plan={plan}
          profile={profile}
          addons={addonsChecked}
          sendStatus={sendStatus}
          setSendStatus={setSendStatus}
        />
      ),
    },
    {
      id: 5,
      component: <Confirmed />,
    },
  ];

  steps.forEach((step) => {
    if (step.id == currentStep) {
      component = step.component;
    }
  });

  for (const key in addonsChecked) {
    addonsSelected.push(addonsChecked[key]);
  }

  return (
    <>
      <Topbar currentStep={currentStep} />
      <div className="card-wrapper">
        <Sidebar currentStep={currentStep} />
        <div className="wrapper-gap">
          <div className="contents-wrapper">{component}</div>
        </div>
      </div>
      {currentStep != 5 && (
        <div className="mobile-bottom-nav-style">
          <Button
            prevStep={prevStep}
            nextStep={nextStep}
            currentStep={currentStep}
            loadingConfirm={sendStatus}
          />
        </div>
      )}
    </>
  );
}

export default App;
