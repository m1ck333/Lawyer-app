import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface newUserData {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async (data: newUserData) => {
    const { name, surname, username, email, password } = data;

    setErrors({}); // Clear errors before validating the form inputs

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
      errors["email"] = "Enter an email";
    }

    if (!password) {
      errors["password"] = "Enter a password";
    } else if (password.length < 6) {
      errors["password"] = "Password must contain more than 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);

    // TODO: handleCreateUser logic here
    setTimeout(() => {
      setIsLoading(false);

      console.log({
        name,
        surname,
        username,
        email,
        password,
      });

      // if success
      setName("");
      setSurname("");
      setUsername("");
      setEmail("");
      setPassword("");
      toast("Successfully created user!", {
        type: "success",
      });
    }, 2000);
  };

  return {
    errors,
    handleCreateUser,
    isLoading,
    name,
    setName,
    surname,
    setSurname,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
  };
};

export default useCreateUser;
