import { useState } from "react";

import useLogin from "../hooks/useLogin ";
import Form from "../components/UI/Form";
import { FormInput } from "../types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, handleLogin, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleLogin({ email, password });
  };

  const formInputs: FormInput[] = [
    {
      label: "Email or username",
      error: errors["email"],
      placeholder: "Your email or username",
      value: email,
      type:"text",
      onChange: (e) =>
        setEmail(e.target.value),
    },
    {
      label: "Password",
      error: errors["password"],
      placeholder: "Your password",
      value: password,
      type:"password",
      onChange: (e) =>
        setPassword(e.target.value),
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        formInputs={formInputs}
        onSubmitHandler={handleSubmit}
        submitButtonName="Log in"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
