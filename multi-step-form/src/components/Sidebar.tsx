import sidebar from "../assets/images/bg-sidebar-desktop.svg";

export default function Sidebar({ currentStep }: React.ComponentState) {
  return (
    <div className="nav-wrapper">
      <img src={sidebar} alt="" />
      <ul className="list-menu">
        <li>
          <span className={currentStep == 1 ? "active" : ""}>1</span>
          <div className="nav-info">
            <p>STEP 1</p>
            <h3>YOUR INFO</h3>
          </div>
        </li>
        <li>
          <span className={currentStep == 2 ? "active" : ""}>2</span>
          <div className="nav-info">
            <p>STEP 2</p>
            <h3>SELECT PLANS</h3>
          </div>
        </li>
        <li>
          <span className={currentStep == 3 ? "active" : ""}>3</span>
          <div className="nav-info">
            <p>STEP 3</p>
            <h3>ADD-ONS</h3>
          </div>
        </li>
        <li>
          <span className={currentStep == 4 ? "active" : ""}>4</span>
          <div className="nav-info">
            <p>STEP 4</p>
            <h3>SUMMARY</h3>
          </div>
        </li>
      </ul>
    </div>
  );
}
