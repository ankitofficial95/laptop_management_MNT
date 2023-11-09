import { createSlice } from "@reduxjs/toolkit";

const laptopregisterSlice = createSlice({
  name: "laptopregister",
  initialState: {
    laptopUser: null,
  },
  reducers: {
    registerLaptopUser: (state, action) => {
      state.laptopUser = action.payload;
    },
  },
});

export const { registerLaptopUser } = laptopregisterSlice.actions;
export default laptopregisterSlice.reducer;
