"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { loginUser } from "../lib/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "../lib/store";

export default function Dangnhap() {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [mat_khau, setMatKhau] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, mat_khau }));
  };

  // chuyển trang sau khi login
  useEffect(() => {

    if (user) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }

  }, [user, router]);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">

      <div className="bg-white shadow-2xl rounded-2xl w-[420px] p-8">

        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Đăng nhập
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black">
              Email
            </label>

            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-lg text-black"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-black">
              Mật khẩu
            </label>

            <input
              type="password"
              className="w-full mt-1 p-3 border rounded-lg text-black"
              placeholder="Nhập mật khẩu"
              value={mat_khau}
              onChange={(e) => setMatKhau(e.target.value)}
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center text-sm">
              {error}
            </p>
          )}

          {/* Success */}
          {user && (
            <p className="text-green-600 text-center text-sm">
              Đăng nhập thành công! Xin chào {user.ho_ten} <br />
              Đang chuyển về trang chủ...
            </p>
          )}

        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border"></div>
          <span className="px-3 text-gray-500 text-sm">hoặc</span>
          <div className="flex-1 border"></div>
        </div>

        {/* Social */}
        <div className="space-y-3">

          <button className="w-full flex items-center justify-center gap-2 border p-3 rounded-lg hover:bg-gray-100 text-black">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width="20"/>
            Đăng nhập bằng Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 border p-3 rounded-lg hover:bg-gray-100 text-black">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="20"/>
            Đăng nhập bằng Facebook
          </button>

        </div>

        {/* Register */}
        <p className="text-center text-sm mt-6 text-black">
          Chưa có tài khoản?

          <Link href="/dangky" className="text-blue-500 font-semibold ml-1">
            Đăng ký
          </Link>

        </p>

      </div>

    </div>
  );
}