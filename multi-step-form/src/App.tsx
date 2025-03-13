import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

// steps
import Profile from "./components/first-step/Profile";
import Plans from "./components/second-step/Plans";
import Addons from "./components/third-step/Addons";
import Summary from "./components/fourth-step/Summary";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  let component;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 1, component: <Profile next={nextStep} /> },
    {
      id: 2,
      component: <Plans next={nextStep} previous={prevStep} />,
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
      <div className="card-wrapper">
        <Sidebar currentStep={currentStep} />
        <div className="contents-wrapper">{component}</div>
      </div>
    </>
  );
}

export default App;
