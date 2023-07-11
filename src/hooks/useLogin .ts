import { useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useUserAuth from "./useUserAuth ";

interface LoginData {
  email: string;
  password: string;
}

const useLogin = () => {
  const { loginUser } = useUserAuth({ enableLocalStorage: true });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async (data: LoginData) => {
    const { email, password } = data;

    const errors: { [key: string]: string } = {};

    if (!email) {
      errors["email"] = "Email is required";
    }

    if (!password) {
      errors["password"] = "Password is required";
    } else if (password.length < 6) {
      errors["password"] = "Password must contain more than 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const USER = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      role: "operator",
      jwt: "this_is_jwt",
    };

    // Create a new instance of axios mock adapter
    const mock = new MockAdapter(axios);

    // Mock the login API call
    mock.onPost("your_login_endpoint").reply(200, {
      user: USER,
    });

    try {
      // Make the API call
      const response = await axios.post("your_login_endpoint", {
        email,
        password,
      });

      // Handle the response
      const { user } = response.data;

      loginUser(user); // Pass only the user object
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
      // Example: Display error message
      setErrors({ login: "An error occurred during login. Please try again later." });
    }

    // Clear the axios mock adapter
    mock.reset();
  };

  return {
    errors,
    handleLogin,
  };
};

export default useLogin;
