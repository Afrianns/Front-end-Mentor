import Button from "../Button";
import "./style/style.css";

import { ProfileType, buttonParamType } from ".../../../types/Type";

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
  previous,
  currentStep,
}: propsType & buttonParamType) {
  const funcNext = () => {
    showProfileData();
    next();
  };

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
        <Button
          prevStep={previous}
          nextStep={funcNext}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}
