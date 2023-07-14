import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchUsers as fetchUsersAction,
  updateUser,
  deleteUser,
  setIsLoading,
} from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";

import { User, Roles } from "../types";

const useUserList = () => {
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  const [deleteUserId, setDeleteUserId] = useState<number | undefined>(
    undefined
  );

  const confirmDeleteUser = (userId: number | undefined) => {
    setDeleteUserId(userId);
  };

  const cancelDeleteUser = () => {
    setDeleteUserId(undefined);
  };

  const executeDeleteUser = async (userId: number | undefined) => {
    // Delete the user if the user confirms the deletion
    if (deleteUserId === userId) {
      try {
        dispatch(setIsLoading(true)); // Set isLoading to true

        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete<User>(`${apiUrl}/api/delete/${userId}/user`);

        // Dispatch the deleteUser action with the userId payload
        dispatch(deleteUser(<number>userId));

        toast("Successfully deleted user.", {
          type: "success",
        });
      } catch (error) {
        console.log("Error deleting user:", error);

        toast("Unsuccessfully deleted user.", {
          type: "error",
        });
      } finally {
        dispatch(setIsLoading(false)); // Set isLoading to false
        setDeleteUserId(undefined);
      }
    }
  };

  const fetchUsersFromAPI = async () => {
    try {
      dispatch(setIsLoading(true)); // Set isLoading to true

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get<User[]>(`${apiUrl}/api/user`);
      dispatch(fetchUsersAction(response.data));
    } catch (error) {
      console.log("Error fetching users:", error);
      toast("Unsuccessfully fetched users.", {
        type: "error",
      });
    } finally {
      dispatch(setIsLoading(false)); // Set isLoading to false
    }
  };

  useEffect(() => {
    fetchUsersFromAPI();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    userId: number | undefined,
    field: string
  ) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, [field]: event.target.value };
      }
      return user;
    });

    dispatch(fetchUsersAction(updatedUsers));
  };

  const handleSaveChanges = async (userId: number | undefined) => {
    if (userId !== undefined) {
      const userToUpdate = users.find((user) => user.id === userId);

      if (userToUpdate) {
        const {
          id,
          username,
          name,
          surname,
          role,
          isActive,
          email,
          selectedRole,
        } = userToUpdate;

        const updatedUser = {
          id,
          username,
          name,
          surname,
          role: selectedRole || role,
          isActive,
          email,
        };

        try {
          dispatch(setIsLoading(true)); // Set isLoading to true

          const apiUrl = import.meta.env.VITE_API_URL;
          await axios.put<User>(`${apiUrl}/api/user`, updatedUser);

          // Dispatch the updateUser action with the updatedUser payload
          dispatch(updateUser({ userId, updatedUser }));

          toast("Successfully saved changes.", {
            type: "success",
          });
        } catch (error) {
          console.log("Error saving changes:", error);

          toast("Unsuccessfully saved changes.", {
            type: "error",
          });
        } finally {
          dispatch(setIsLoading(false)); // Set isLoading to false
        }
      }
    }
  };

  const handleToggleBlock = (userId: number | undefined) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
    });

    dispatch(fetchUsersAction(updatedUsers));
  };

  const handleRoleSelection = (userId: number | undefined, role: Roles) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, selectedRole: role };
      }
      return user;
    });

    dispatch(fetchUsersAction(updatedUsers));
  };

  return {
    users,
    handleInputChange,
    handleSaveChanges,
    handleToggleBlock,
    handleRoleSelection,
    executeDeleteUser,
    isLoading,
    fetchUsers: fetchUsersFromAPI,
    confirmDeleteUser,
    cancelDeleteUser,
    deleteUserId,
    setDeleteUserId,
  };
};

export default useUserList;
