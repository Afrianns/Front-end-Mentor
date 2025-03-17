import Button from "../Button";
import "./style/style.css";

import { ProfileType, buttonParamType, stateType } from ".../../../types/Type";
import React, { Fragment } from "react";

interface propsType {
  next: () => void;
  profile: ProfileType | null;
  setProfile: (params: (profile: ProfileType) => ProfileType) => void;
  errorInput: stateType;
}

type evtType = React.FormEvent<HTMLInputElement>;

export default function Profile({
  next,
  profile,
  setProfile,
  previous,
  errorInput,
  currentStep,
}: propsType & buttonParamType) {
  const funcNext = () => {
    next();
  };

  const funcSetProfileData = (evt: evtType, name: string) => {
    const input = evt.target as unknown as HTMLInputElement;
    setProfile((profile: ProfileType) => ({
      ...profile,
      [name]: input.value,
    }));
  };

  const inputList = [
    {
      id: 1,
      name: "Name",
      inputKey: "name",
      saveValueFunc: (evt: evtType) => funcSetProfileData(evt, "name"),
      placeholder: "e.g. andreas",
      inputType: "text",
    },
    {
      id: 2,
      name: "Email",
      inputKey: "email",
      saveValueFunc: (evt: evtType) => funcSetProfileData(evt, "email"),
      placeholder: "e.g. andreas@email.com",
      inputType: "email",
    },
    {
      id: 3,
      name: "Phone Number",
      inputKey: "phone",
      saveValueFunc: (evt: evtType) => funcSetProfileData(evt, "phone"),
      placeholder: "e.g. +62895325396604",
      inputType: "text",
    },
  ];

  return (
    <div className="content-pos-wrapper">
      <div>
        <h1 className="title">Profile Info</h1>
        <p className="subtitle">
          Please provide your name, email address, and phone number.
        </p>

        <div className="form-style">
          {inputList.map((data) => {
            return (
              <Fragment key={data.id}>
                <div className="input-info-style">
                  <label htmlFor={data.inputKey}>{data.name}</label>
                  <span
                    className={
                      errorInput[data.inputKey].isError ? "error-info-name" : ""
                    }
                  >
                    {data.name} is required
                  </span>
                </div>
                <input
                  type={data.inputType}
                  name={data.inputKey}
                  className={
                    errorInput[data.inputKey].isError ? "error-input-style" : ""
                  }
                  onChange={data.saveValueFunc}
                  value={profile?.[data.inputKey]}
                  placeholder={data.placeholder}
                />
              </Fragment>
            );
          })}
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
