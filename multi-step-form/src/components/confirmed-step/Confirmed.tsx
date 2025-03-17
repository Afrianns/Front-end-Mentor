import "./style/style.css";
import ThanksIcon from "../../assets/images/icon-thank-you.svg";

export default function Confirmed() {
  return (
    <div className="confirmed-style">
      <img src={ThanksIcon} alt="" />
      <h1 className="title">Thank You!</h1>
      <p className="subtitle">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at{" "}
        <a href="mailto:hanifnafrian12@gmail.com">hanifnafrian12@gmail.com.</a>
      </p>
    </div>
  );
}
