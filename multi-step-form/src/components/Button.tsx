import { useRef, useState } from "react";

interface propsType {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  loadingConfirm?: boolean;
}

export default function Button({
  currentStep,
  prevStep,
  nextStep,
  loadingConfirm,
}: propsType) {
  let btnName = "";

  if (currentStep == 4) {
    btnName = "Confirm";
  } else {
    btnName = "Next Step";
  }

  return (
    <>
      {currentStep != 1 && <p onClick={prevStep}>Go Back</p>}

      {loadingConfirm ? (
        <button className="btn-style btn-loading-style">Loading</button>
      ) : (
        <button className="btn-style" onClick={nextStep}>
          {btnName}
        </button>
      )}
    </>
  );
}
