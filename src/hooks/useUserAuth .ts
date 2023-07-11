// useUserAuth.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { login, logout } from "../redux/slices/authSlice";

import { User } from "../types";

interface UserAuthOptions {
  enableLocalStorage?: boolean;
  localStorageKey?: string;
}

const useUserAuth = (options: UserAuthOptions = {}) => {
  const { enableLocalStorage = false, localStorageKey = "user" } = options;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(localStorageKey);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(login(parsedUser as User));
    }

    // Simulate an asynchronous operation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch, enableLocalStorage, localStorageKey]);

  const loginUser = (user: User) => {
    dispatch(login(user));

    if (enableLocalStorage) {
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    }
  };

  const logoutUser = () => {
    dispatch(logout());

    if (enableLocalStorage) {
      localStorage.removeItem(localStorageKey);
    }
  };

  return { isAuthenticated, user, isLoading, loginUser, logoutUser };
};

export default useUserAuth;
