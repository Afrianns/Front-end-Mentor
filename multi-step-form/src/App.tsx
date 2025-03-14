import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { activePlanType, planType, addonsCheckedType } from "../types/Type";

// steps components
import Profile from "./components/first-step/Profile";
import Plans from "./components/second-step/Plans";
import Addons from "./components/third-step/Addons";
import Summary from "./components/fourth-step/Summary";

type ProfileType = {
  name: string;
  email: string;
  phone: string;
};

const initialProfileData = { name: "", email: "", phone: "" };
const initialChoosePlan = { option: "", choosePlan: activePlanType.none };
const initialAddonsChecked = {
  type_one: false,
  type_two: false,
  type_three: false,
};

function App() {
  let component;

  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<planType>(initialChoosePlan);

  const [data, setData] = useState<ProfileType>(initialProfileData);
  const [profile, setProfile] = useState<ProfileType>(initialProfileData);

  const [planTier, setPlanTier] = useState("monthly");
  const [activePlan, setActivePlan] = useState<activePlanType>(
    activePlanType.none
  );

  const [addonsChecked, setAddonsChecked] =
    useState<addonsCheckedType>(initialAddonsChecked);

  const showProfileData = () => setData(profile);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const step = {
    next: nextStep,
    previous: prevStep,
  };

  console.log(addonsChecked);

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
    { id: 4, component: <Summary previous={prevStep} /> },
  ];

  steps.forEach((step) => {
    if (step.id == currentStep) {
      component = step.component;
    }
  });

  return (
    <>
      {data && (
        <div>
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
      )}
      {plan.choosePlan != 0 && (
        <div>
          <p>{plan.option}</p>
          <p>{plan.choosePlan}</p>
        </div>
      )}

      {addonsChecked && (
        <div>
          <p>type 1: {addonsChecked["type_one"]}</p>
          <p>type 2: {addonsChecked["type_two"]}</p>
          <p>type 3: {addonsChecked["type_three"]}</p>
        </div>
      )}
      <div className="card-wrapper">
        <Sidebar currentStep={currentStep} />
        <div className="contents-wrapper">{component}</div>
      </div>
    </>
  );
}

export default App;
