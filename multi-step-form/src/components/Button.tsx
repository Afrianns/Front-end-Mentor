interface propsType {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
}

export default function Button({ currentStep, prevStep, nextStep }: propsType) {
  return (
    <>
      {currentStep != 1 && <p onClick={prevStep}>Go Back</p>}
      {currentStep == 4 ? (
        <button className="btn-style">Confirm</button>
      ) : (
        <button className="btn-style" onClick={nextStep}>
          Next Step
        </button>
      )}
    </>
  );
}
