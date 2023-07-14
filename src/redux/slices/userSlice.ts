import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  users: User[];
  isLoading: boolean;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<{ userId: number; updatedUser: User }>
    ) => {
      const { userId, updatedUser } = action.payload;
      state.users = state.users.map((user) =>
        user.id === userId ? updatedUser : user
      );
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  fetchUsers,
  updateUser,
  deleteUser,
  setIsLoading,
} = userSlice.actions;

export default userSlice.reducer;
