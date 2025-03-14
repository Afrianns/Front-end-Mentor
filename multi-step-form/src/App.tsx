import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { activePlanType, planType } from "../types/Type";

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

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<planType>(initialChoosePlan);

  const [data, setData] = useState<ProfileType>(initialProfileData);
  const [profile, setProfile] = useState<ProfileType>(initialProfileData);

  const [toggle, setToggle] = useState("monthly");
  const [activePlan, setActivePlan] = useState<activePlanType>(
    activePlanType.none
  );

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const showProfileData = () => setData(profile);

  let component;

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
          next={nextStep}
          previous={prevStep}
          setPlan={setPlan}
          activePlan={activePlan}
          setActivePlan={setActivePlan}
          toggle={toggle}
          setToggle={setToggle}
        />
      ),
    },
    {
      id: 3,
      component: <Addons next={nextStep} previous={prevStep} />,
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
      <div className="card-wrapper">
        <Sidebar currentStep={currentStep} />
        <div className="contents-wrapper">{component}</div>
      </div>
    </>
  );
}

export default App;
