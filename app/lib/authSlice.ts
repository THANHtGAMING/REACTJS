import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, RegisterData } from "../components/cautrucdata";
import axios from "axios";

// ================= INITIAL STATE =================
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};


// ================= LOAD USER =================
// ================= LOAD USER =================
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async () => {
    const userLocal = localStorage.getItem("user");

    if (!userLocal) return null;

    const user = JSON.parse(userLocal);

    const res = await fetch(
      `http://localhost:3000/api/users/${user.id}`
    );

    const data = await res.json();

    return data;
  }
);


// ================= LOGIN =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; mat_khau: string }, thunkAPI) => {
    try {

      const res = await fetch("http://localhost:3000/api/dangnhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(result.thong_bao);
      }

      // lưu localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.info));

      return result;

    } catch {
      return thunkAPI.rejectWithValue("Lỗi server");
    }
  }
);


// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: RegisterData, thunkAPI) => {
    try {

      const res = await axios.post(
        "http://localhost:3000/api/dangky",
        data
      );

      return res.data;

    } catch {
      return thunkAPI.rejectWithValue("Lỗi đăng ký");
    }
  }
);


// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    // LOGOUT
    logout: (state) => {

      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

    },

  },

  extraReducers: (builder) => {

    builder

      // LOAD USER
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
      })


      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;
        state.user = action.payload.info;
        state.token = action.payload.token;

      })

      .addCase(loginUser.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;

      })


      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {

        state.loading = false;
        state.message = action.payload.thong_bao;

      })

      .addCase(registerUser.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload as string;

      });

  },

});

export const { logout } = authSlice.actions;

export default authSlice.reducer;