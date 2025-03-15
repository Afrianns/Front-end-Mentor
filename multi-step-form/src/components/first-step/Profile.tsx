import "./style/style.css";

type ProfileType = {
  name: string;
  email: string;
  phone: string;
};

interface propsType {
  next: () => void;
  profile: ProfileType | null;
  setProfile: (params: (profile: ProfileType) => ProfileType) => void;
  showProfileData: () => void;
}

export default function Profile({
  next,
  profile,
  setProfile,
  showProfileData,
}: propsType) {
  const funcNext = () => {
    showProfileData();
    next();
  };

  // const funcChange = (evt: React.divEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   let name = evt.target[
  //     "name" as keyof typeof evt.target
  //   ] as unknown as HTMLInputElement;
  //   let email = evt.target[
  //     "email" as keyof typeof evt.target
  //   ] as unknown as HTMLInputElement;
  //   let phone = evt.target[
  //     "phone" as keyof typeof evt.target
  //   ] as unknown as HTMLInputElement;

  //   setProfile((profile: ProfileType[]) => [
  //     ...profile,
  //     { name: name.value, email: email.value, phone: phone.value },
  //   ]);
  // };

  const funcName = (evt: React.FormEvent<HTMLInputElement>) => {
    let name = evt.target as unknown as HTMLInputElement;
    setProfile((profile: ProfileType) => ({ ...profile, name: name.value }));
  };

  const funcEmail = (evt: React.FormEvent<HTMLInputElement>) => {
    let email = evt.target as unknown as HTMLInputElement;
    setProfile((profile: ProfileType) => ({
      ...profile,
      email: email.value,
    }));
  };

  const funcPhone = (evt: React.FormEvent<HTMLInputElement>) => {
    let phone = evt.target as unknown as HTMLInputElement;
    setProfile((profile: ProfileType) => ({
      ...profile,
      phone: phone.value,
    }));
  };

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Profile Info</h1>
        <p className="subtitle">
          Please provide your name, email address, and phone number.
        </p>

        <div className="form-style">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={funcName}
            value={profile?.name}
            placeholder="type your name"
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            onChange={funcEmail}
            value={profile?.email}
            placeholder="type your email"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="type your phone number"
            onChange={funcPhone}
            value={profile?.phone}
          />
        </div>
      </div>
      <div className="desktop-bottom-nav-style">
        <button className="btn-style" onClick={funcNext}>
          Next Step
        </button>
      </div>
    </div>
  );
}
