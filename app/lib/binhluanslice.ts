import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import  {BinhLuanState}  from "../components/cautrucdata"
const initialState: BinhLuanState = {
   listBL: [],
  loading: false
}
const API = "http://localhost:3000/api/binhluan"
// ================= LẤY BÌNH LUẬN =================
export const fetchBinhLuan = createAsyncThunk(
  "binhluan/fetchBinhLuan",
  async (id_sp: number) => {
    const res = await axios.get(`${API}/${id_sp}`)
    return res.data
  }
)


// ================= THÊM BÌNH LUẬN =================
export const addBinhLuan = createAsyncThunk(
  "binhluan/addBinhLuan",
  async (data: { id_sp:number, ho_ten:string, noi_dung:string }) => {
    const res = await axios.post(API, data)
    return res.data
  }
)



const binhLuanSlice = createSlice({
  name: "binhluan",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchBinhLuan.pending, (state)=>{
      state.loading = true
    })

    builder.addCase(fetchBinhLuan.fulfilled, (state, action)=>{
      state.loading = false
      state.listBL = action.payload
    })


    builder.addCase(addBinhLuan.fulfilled, (state, action)=>{
      state.listBL.unshift(action.payload)
    })

  }

})

export default binhLuanSlice.reducer