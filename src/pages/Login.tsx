import { useState } from "react";
import useLogin from "../hooks/useLogin ";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, handleLogin } = useLogin();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleLogin({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-main-light text-main-dark shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          {errors["email"] && (
            <p className="text-red-500 text-xs italic">{errors["email"]}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>

          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          {errors["password"] && (
            <p className="text-red-500 text-xs italic">{errors["password"]}</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
