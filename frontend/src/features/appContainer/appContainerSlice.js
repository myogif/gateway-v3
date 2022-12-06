import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pageActive: "home",
  deviceData: [],
  isLoading: false,
  isSuccess: false,
  successMessage: "",
};

export const getDevices = createAsyncThunk(
  "appContainer/getDevices",
  async () => {
    const response = await axios.get("http://localhost:8080/devices");
    return response.data;
  }
);
export const postDevices = createAsyncThunk(
  "appContainer/postDevices",
  async (payload) => {
    const response = await axios.post("http://localhost:8080/devices", payload);
    return response.data;
  }
);

export const appContainerSlice = createSlice({
  name: "appContainer",
  initialState,
  reducers: {
    setPageActive: (state, action) => {
      state.pageActive = action.payload;
    },
    setPopupSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDevices.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.deviceData = action.payload;
      state.isLoading = false;
    });

    builder.addCase(postDevices.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.successMessage = action.payload.message;
    });
  },
});

export const { setPageActive, setPopupSuccess } = appContainerSlice.actions;
export default appContainerSlice.reducer;
