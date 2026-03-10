"use client"

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { loadUser, logout } from "../lib/authSlice";
import { AppDispatch, RootState } from "../lib/store";

import { ISanpham, ILoai } from "./cautrucdata";

export default function Header() {

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  
  
const cartItems = useSelector((state: RootState) => state.cart.items);
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])
const totalCart = cartItems.reduce(
  (sum, item) => sum + item.so_luong,
  0
);
  const [search, setSearch] = useState("");
  const [sp, setSp] = useState<ISanpham[]>([]);
  const [ds_loai, setLoai] = useState<ILoai[]>([]);

  const page = 1;

  // LOAD USER
  useEffect(() => {
    dispatch(loadUser());
  },[] );

  // SEARCH PRODUCT
  useEffect(() => {

    const delay = setTimeout(() => {

      if (search.trim() !== "") {

        fetch(`http://localhost:3000/api/timkiem/${search}/${page}`)
          .then(res => res.json())
          .then(data => setSp(data))
          .catch(() => setSp([]));

      } else {
        setSp([]);
      }

    }, 400);

    return () => clearTimeout(delay);

  }, [search]);

  // LOAD CATEGORY
  useEffect(() => {

    fetch("http://localhost:3000/api/loai/")
      .then(res => res.json())
      .then(data => setLoai(data));

  }, []);


  return (
    <>
      {/* TOP BAR */}
      <div className="w-[1520px] mx-auto flex justify-between px-[100px] py-4">

        <div className="text-sm text-[#292D32]">
          Cần hỗ trợ? Gọi ngay: (+84) 0234 456 789
        </div>

        <div className="text-[#292D32]">

          <i className="fa-light fa-location-dot"></i>
          <span className="mx-4">Hệ thống cửa hàng</span>

          <i className="fa-light fa-truck"></i>
          <span className="mx-4">Theo dõi đơn hàng</span>

        </div>

      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#003F62] py-6">

        <div className="max-w-[1300px] mx-auto flex items-center justify-between px-4">

          {/* LOGO */}
          <Link href="/">
            <img src="/logo 1 (1).png" className="w-36" />
          </Link>

          {/* SEARCH */}
          <div className="relative w-[450px]">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full bg-white text-black px-5 py-3 rounded-full shadow-md border"
            />

            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#EDA415] text-white px-9 py-3 rounded-full">
              Tìm kiếm
            </button>

            {/* SEARCH DROPDOWN */}
            {search && (

              <div className="absolute left-0 mt-2 w-full bg-white shadow-xl rounded-xl border max-h-[350px] overflow-y-auto z-50">

                {sp.length > 0 ? (

                  sp.map((item) => (

                    <Link
                      key={item.id}
                      href={`/sp/${item.id}`}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#003F62] hover:text-white"
                    >

                      <img
                        src={item.hinh}
                        className="w-12 h-12 object-cover rounded-md"
                      />

                      <span>{item.ten_sp}</span>

                    </Link>

                  ))

                ) : (

                  <div className="px-4 py-4 text-gray-500 text-center">
                    Không tìm thấy sản phẩm
                  </div>

                )}

              </div>

            )}

          </div>

          {/* RIGHT MENU */}
          <div className="flex items-center gap-8 text-white font-medium">

            <Link href="#">Yêu thích (0)</Link>
<Link href="/giohang" className="relative">

🛒 Giỏ hàng

{mounted && totalCart > 0 && (
  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
    {totalCart}
  </span>
)}

</Link>

            {user ? (

              <div className="relative group cursor-pointer">

                {/* AVATAR */}
                <img
                  src={user.hinh}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />

                {/* DROPDOWN */}
                <div className="absolute right-0 hidden group-hover:block bg-white text-black shadow-xl rounded-xl w-44">

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Thông tin
                  </Link>

                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>

                </div>

              </div>

            ) : (

              <Link href="/dangnhap">Đăng nhập</Link>

            )}

          </div>

        </div>

      </div>

      {/* MENU */}
      <div className="w-full bg-[#F4F4F4] border-t">

        <div className="max-w-[1300px] mx-auto flex items-center justify-between">

          {/* CATEGORY */}
          <div className="relative group">

            <div className="flex items-center gap-2 bg-[#EDA415] text-white font-semibold px-8 py-4 cursor-pointer z-9999">

              <i className="fa-light fa-bars"></i>

              Danh mục sản phẩm

            </div>

            <div className="absolute text-black hidden group-hover:block bg-white shadow-xl w-64 border z-9999">

              {ds_loai.map((ds) => (

                <Link
                  key={ds.id}
                  href={`/sptrongloai/${ds.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[#003F62] hover:text-white"
                >

                  {ds.ten_loai}

                </Link>

              ))}

            </div>

          </div>

          {/* MAIN MENU */}
          <ul className="flex gap-10 font-bold text-[#3A3A3A]">

            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/tin">Tin tức</Link></li>
            <li><Link href="#">Trang</Link></li>
            <li><Link href="#">Về chúng tôi</Link></li>

          </ul>

          <div className="font-bold text-[#003F62]">
            30 Ngày Đổi Trả
          </div>

        </div>

      </div>
    </>
  );
}