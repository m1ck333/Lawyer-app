import React, { useState } from "react";

import { FormInput } from "../types";
import Form from "../components/UI/Form";

const Profile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateProfile = (e: React.FormEvent<Element>) => {};

  const formInputs: FormInput[] = [
    {
      label: "Name",
      placeholder: "Your name",
      type: "text",
      onChange: (e) => setName(e.target.value),
      value: name,
      error: "eeeerrrr",
    },
    {
      label: "Surname",
      placeholder: "Your surname",
      type: "text",
      onChange: (e) => setSurname(e.target.value),
      value: surname,
      error: "eeeerrrr",
    },
    {
      label: "Username",
      placeholder: "Your username",
      type: "text",
      onChange: (e) => setUsername(e.target.value),
      value: username,
      error: "eeeerrrr",
    },
    {
      label: "Email or username",
      error: "!@#",
      placeholder: "Your email or username",
      value: email,
      type: "text",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      error: "!@#",
      placeholder: "Your password",
      value: password,
      type: "password",
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl font-bold mb-10">My profile</h1>

      <div className="w-full">
        <Form
          classes="w-max"
          formInputs={formInputs}
          onSubmitHandler={updateProfile}
          submitButtonName={"Update profile"}
          isLoading={false}
        ></Form>
      </div>
    </div>
  );
};

export default Profile;
