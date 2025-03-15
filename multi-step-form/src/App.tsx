import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import {
  activePlanType,
  planType,
  addonsCheckedType,
  ProfileType,
} from "../types/Type";

// steps components
import Profile from "./components/first-step/Profile";
import Plans from "./components/second-step/Plans";
import Addons from "./components/third-step/Addons";
import Summary from "./components/fourth-step/Summary";

const initialProfileData = { name: "", email: "", phone: "" };
const initialChoosePlan = { option: "", choosePlan: activePlanType.none };
const initalAddonsChecked = {
  type_one: false,
  type_two: false,
  type_three: false,
};
function App() {
  let component;
  let addonsSelected = [];

  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<planType>(initialChoosePlan);

  const [data, setData] = useState<ProfileType>(initialProfileData);
  const [profile, setProfile] = useState<ProfileType>(initialProfileData);

  const [planTier, setPlanTier] = useState("monthly");
  const [activePlan, setActivePlan] = useState<activePlanType>(
    activePlanType.none
  );

  const [addonsChecked, setAddonsChecked] =
    useState<addonsCheckedType>(initalAddonsChecked);

  const showProfileData = () => setData(profile);

  const nextStep = () => {
    if (currentStep == 2) {
      setPlan({
        option: planTier,
        choosePlan: activePlan,
      });
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);
  const jumpPrevStep = () => setCurrentStep(currentStep - 2);

  const step = {
    next: nextStep,
    previous: prevStep,
  };

  const steps = [
    {
      id: 1,
      component: (
        <Profile
          next={nextStep}
          profile={profile}
          setProfile={setProfile}
          showProfileData={showProfileData}
        />
      ),
    },
    {
      id: 2,
      component: (
        <Plans
          {...step}
          setPlan={setPlan}
          activePlan={activePlan}
          setActivePlan={setActivePlan}
          planTier={planTier}
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
          previous={prevStep}
          jumpStep={jumpPrevStep}
          plan={plan}
          addons={addonsChecked}
        />
      ),
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
        <div style={{ padding: "2rem" }}>
          <div className="contents-wrapper">{component}</div>
        </div>
      </div>
      <div className="mobile-bottom-nav-style">
        {currentStep != 1 && <p onClick={prevStep}>Go Back</p>}
        {currentStep == 4 ? (
          <button className="btn-style">Confirm</button>
        ) : (
          <button className="btn-style" onClick={nextStep}>
            Next Step
          </button>
        )}
      </div>
    </>
  );
}

export default App;
