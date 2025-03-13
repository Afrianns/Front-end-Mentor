import "./style/style.css";

interface propsType {
  next: () => void;
}

export default function Profile({ next }: propsType) {
  const funcNext = () => {
    next();
  };

  return (
    <>
      <div>
        <h1 className="title">Profile Info</h1>
        <p className="subtitle">
          Please provide your name, email address, and phone number.
        </p>

        <form className="form-style">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="type your name" />

          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="type your email" />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="type your phone number"
          />
        </form>
      </div>
       <div className="bottom-nav-style">
        <button className="btn-style" onClick={funcNext}>Next Step</button>
      </div>
    </>
  );
}
