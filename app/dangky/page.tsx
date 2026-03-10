"use client";

import { useState, useEffect } from "react";
import { registerUser } from "../lib/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "../lib/store";

export default function Dangky() {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // lấy dữ liệu từ redux
  const { loading, error, message } = useSelector(
    (state: RootState) => state.auth
  );

  // state form
  const [ho_ten, setHoten] = useState("");
  const [email, setEmail] = useState("");
  const [mat_khau, setMatkhau] = useState("");
  const [go_lai_mat_khau, setGolaimatkhau] = useState("");

  // submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      registerUser({
        ho_ten,
        email,
        mat_khau,
        go_lai_mat_khau,
      })
    );
  };

  // nếu đăng ký thành công
  useEffect(() => {
    if (message) {
      alert(message);
      router.push("/dangnhap");
    }
  }, [message]);

  return (
    <div className="flex justify-center mt-20">

      <div className="border p-8 w-[400px]">

        <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Họ tên"
            className="border p-2 w-full mb-3"
            value={ho_ten}
            onChange={(e) => setHoten(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="border p-2 w-full mb-3"
            value={mat_khau}
            onChange={(e) => setMatkhau(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="border p-2 w-full mb-3"
            value={go_lai_mat_khau}
            onChange={(e) => setGolaimatkhau(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="bg-green-500 text-white p-2 w-full"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

        </form>

      </div>

    </div>
  );
}