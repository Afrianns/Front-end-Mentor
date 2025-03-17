import { activePlanType, planPaymentType } from "../../../types/Type";

interface propsType {
  changeActivePlan: (n: activePlanType) => void;
  name: string;
  imgIcon: string;
  planType: activePlanType;
  subType: string;
  planPayment: planPaymentType;
  activePlan: activePlanType;
}

export default function Plan({
  changeActivePlan,
  name,
  imgIcon,
  planType,
  subType,
  planPayment,
  activePlan,
}: propsType) {
  return (
    <>
      <section
        onClick={() => changeActivePlan(planType)}
        className={
          activePlan == planType
            ? "plan-type-style plan-type-style-active"
            : "plan-type-style"
        }
      >
        <img src={imgIcon} alt="plan type arcade" />
        <div className="plan-detail-style">
          <h4 className="plan-title">{name}</h4>
          <p>
            ${planPayment[planType].price}
            {subType}
          </p>
          <span className="payment-msg-style">{planPayment[planType].msg}</span>
        </div>
      </section>
    </>
  );
}
