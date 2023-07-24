import { useState } from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "../redux/hooks";
import { FormInput } from "../types";

const useProfileForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const formInputs: FormInput[] = [
    {
      label: "Name",
      placeholder: "Your name",
      type: "text",
      onChange: (e) => setName(e.target.value),
      value: name,
      error: errors["name"],
      htmlType: "input",
    },
    {
      label: "Surname",
      placeholder: "Your surname",
      type: "text",
      onChange: (e) => setSurname(e.target.value),
      value: surname,
      error: errors["surname"],
      htmlType: "input",
    },
    {
      label: "Username",
      placeholder: "Your username",
      type: "text",
      onChange: (e) => setUsername(e.target.value),
      value: username,
      error: errors["username"],
      htmlType: "input",
    },
    {
      label: "Email",
      placeholder: "Your email",
      value: email,
      type: "text",
      onChange: (e) => setEmail(e.target.value),
      error: errors["email"],
      htmlType: "input",
    },
    {
      label: "Password",
      placeholder: "Your password",
      value: password,
      type: "password",
      onChange: (e) => setPassword(e.target.value),
      error: errors["password"],
      htmlType: "input",
    },
  ];

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    const errors: { [key: string]: string } = {};

    if (!name) {
      errors["name"] = "Enter a name";
    }

    if (!surname) {
      errors["surname"] = "Enter a surname";
    }

    if (!username) {
      errors["username"] = "Enter a username";
    }

    if (!email) {
      errors["email"] = "Enter a email";
    }

    if (!password) {
      errors["password"] = "Enter a password";
    }

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      setErrors(errors);
      return;
    }

    setTimeout(() => {
      toast("Successfully updated profile.", {
        type: "success",
      });

      setIsLoading(false);
    }, 2000);
  };

  return { formInputs, updateProfile, isLoading };
};

export default useProfileForm;
