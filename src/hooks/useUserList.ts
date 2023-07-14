import { useState, useEffect } from "react";
import axios from "axios";
import { User, Roles } from "../types";
import { toast } from "react-toastify";

const useUserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    console.log("@@@@@@@@@@@@@@@@@");
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get<User[]>(`${apiUrl}/api/user`);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
      toast("Unsuccessfully fetched users.", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
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

    setUsers(updatedUsers);
  };

  const handleSaveChanges = async (userId: number | undefined) => {
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

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

        await axios.put<User>(`${apiUrl}/api/user`, updatedUser);

        toast("Succesfuly updated user.", {
          type: "success",
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error saving changes for user:", error);

      toast("Unsuccessfully updated user.", {
        type: "error",
      });

      setIsLoading(false);
    }
  };

  const handleToggleBlock = (userId: number | undefined) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: user.isActive };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleRoleSelection = (userId: number | undefined, role: Roles) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, selectedRole: role };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return {
    users,
    handleInputChange,
    handleSaveChanges,
    handleToggleBlock,
    handleRoleSelection,
    isLoading,
    fetchUsers
  };
};

export default useUserList;
