import mobile_sidebar from "../assets/images/bg-sidebar-mobile.svg";

export default function Sidebar({ currentStep }: React.ComponentState) {
  return (
    <div className="mobile-nav-wrapper">
      <img src={mobile_sidebar} alt="" />
      <ul className="mobile-list-menu">
        <li>
          <span className={currentStep == 1 ? "active" : ""}>1</span>
        </li>
        <li>
          <span className={currentStep == 2 ? "active" : ""}>2</span>
        </li>
        <li>
          <span className={currentStep == 3 ? "active" : ""}>3</span>
        </li>
        <li>
          <span className={currentStep == 4 ? "active" : ""}>4</span>
        </li>
      </ul>
    </div>
  );
}
