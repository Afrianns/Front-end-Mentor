import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Profile from "./components/first-step/Profile";
import Plans from "./components/second-step/Plans";
import Addons from "./components/third-step/Addons";
import Summary from "./components/fourth-step/Summary";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 1, title: "Profile", component: <Profile next={nextStep} /> },
    {
      id: 2,
      title: "Plans",
      component: <Plans next={nextStep} previous={prevStep} />,
    },
    {
      id: 3,
      title: "Addons",
      component: <Addons next={nextStep} previous={prevStep} />,
    },
    { id: 4, title: "Summary", component: <Summary previous={prevStep} /> },
  ];

  return (
    <>
      <div className="card-wrapper">
        <Sidebar currentStep={currentStep} />
        <div className="content-wrapper">
          {steps.map((step) => {
            return (
              <div key={step.id}>
                {step.id == currentStep ? step.component : ""}
              </div>
            );
          })}
          {/* <Profile next={nextStep}/> */}
          {/* <Plans /> */}
          {/* <Addons /> */}
          {/* <Summary /> */}
        </div>
      </div>
    </>
  );
}

export default App;
