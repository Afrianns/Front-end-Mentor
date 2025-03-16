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
import Button from "./components/Button";

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

  const [_, setProfileData] = useState<ProfileType>(initialProfileData);
  const [profile, setProfile] = useState<ProfileType>(initialProfileData);

  const [planTier, setPlanTier] = useState("monthly");
  const [activePlan, setActivePlan] = useState<activePlanType>(
    activePlanType.none
  );

  const [addonsChecked, setAddonsChecked] =
    useState<addonsCheckedType>(initalAddonsChecked);

  const showProfileData = () => setProfileData(profile);

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
    currentStep: currentStep,
  };

  const steps = [
    {
      id: 1,
      component: (
        <Profile
          {...step}
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
          {...step}
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
        <Button
          prevStep={prevStep}
          nextStep={nextStep}
          currentStep={currentStep}
        />
      </div>
    </>
  );
}

export default App;
