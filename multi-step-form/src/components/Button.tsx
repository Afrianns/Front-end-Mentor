interface propsType {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
}

export default function Button({ currentStep, prevStep, nextStep }: propsType) {
  let btnName = "";

  if (currentStep == 4) {
    btnName = "Confirm";
  } else {
    btnName = "Next Step";
  }
  return (
    <>
      {currentStep != 1 && <p onClick={prevStep}>Go Back</p>}
      <button className="btn-style" onClick={nextStep}>
        {btnName}
      </button>
    </>
  );
}
