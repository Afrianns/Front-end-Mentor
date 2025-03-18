import { sendStatusEnum } from "../../types/Type";

interface propsType {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  loadingConfirm?: sendStatusEnum;
}

export default function Button({
  currentStep,
  prevStep,
  nextStep,
  loadingConfirm,
}: propsType) {
  let btnName = currentStep == 4 ? "Confirm" : "Next Step";

  return (
    <>
      {currentStep != 1 && <p onClick={() => prevStep()}>Go Back</p>}
      {loadingConfirm === sendStatusEnum.sending ? (
        <button className="btn-style btn-loading-style">Loading</button>
      ) : (
        <button className="btn-style" onClick={() => nextStep()}>
          {btnName}
        </button>
      )}
    </>
  );
}
