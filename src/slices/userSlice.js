import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});



const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    removeUser: (state, action) => {
      const userId = action.payload;
      return state.filter((user) => user.id !== userId);
      //return state.splice(action.payload,1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
