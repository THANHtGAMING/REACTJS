export interface ILoai {
    id: number;
    ten_loai: string;
    thu_tu: number;
    an_hien: number;
}
export interface ISanpham {
    id: number;
    ten_sp: string;
    gia: number;
    gia_km: number;
    ngay: string;
    hinh: string;
    id_loai: number;
    luot_xem: number;
    hot: string;
    an_hien: string;
    tinh_chat: string
}
export interface IBinhLuan {
  id: number
  id_sp: number
  id_user: string
  noi_dung: string
  ngay: string
}
 export interface BinhLuanState {
  listBL: IBinhLuan[]
  loading: boolean
}
export interface CartItem {
    id: number
    ten_sp: string;
    so_luong: number;
    gia: number;
    hinh: string;
}
export interface CartState {
  items: CartItem[];
}
//  USER INTERFACE
// Kiểu dữ liệu của user lấy từ API
export interface IUser {
    id: number;
    ho_ten: string;
    email: string;
    vai_tro: number;
   hinh: string 

}
// AUTH STATE
// Kiểu dữ liệu lưu trong Redux
export interface AuthState {
    user: IUser | null;      // thông tin user sau khi login
    token: string | null;    // JWT token
    loading: boolean;        // trạng thái đang gọi API
    error: string | null;
    message: string | null;  // thông báo lỗi
}
export interface RegisterData {
    ho_ten: string;
    email: string;
    mat_khau: string;
    go_lai_mat_khau: string;
}
export interface IBinhLuan {
  id: number
  ho_ten: string
  noi_dung: string
  id_sp: number
}


