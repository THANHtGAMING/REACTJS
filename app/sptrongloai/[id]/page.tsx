'use client'


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
 import Link  from "next/link";
import {  ISanpham, ILoai } from "@/app/components/cautrucdata";



export default  function SPtrongloai( ) {
    const [sp_arr, gan_sp] = useState ([] as ISanpham[])
 const [currentPage, setcurrentPage] = useState(1)
     const [loai, setLoai] = useState([] as ILoai[]);
      const params = useParams();
      const id_loai = params.id;
   const spPerpage = 6

 useEffect(() =>{
     fetch (`http://localhost:3000/api/sptrongloai/${id_loai}`)
     .then(res => res.json())
     .then(data => gan_sp(data))
     fetch(`http://localhost:3000/api/loai`)
      .then(res => res.json())
      .then(data => setLoai(data));
 },[id_loai])

 const start = (currentPage -1) * spPerpage
  const end = start + spPerpage
    const sp_hientai = sp_arr.slice(start, end)
 const tongtrang = Math.ceil(sp_arr.length / spPerpage)
   const pageButtons = [];
for (let i = 1; i <= tongtrang; i++) {
  pageButtons.push(
    <button
      key={i}
      onClick={() => setcurrentPage(i)}
      className={`px-4 py-2 border rounded-md ${
        currentPage === i
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 border-blue-600"
      }`}
    >
      {i}
    </button>
  );
}
const tenLoai = loai.find(l => String(l.id) === String(id_loai))?.ten_loai || "";
return (
  <div className="max-w-[1400px] mx-auto px-6 mt-8 flex gap-8">

    <div className="w-1/4 bg-white shadow-md rounded-xl p-6 h-fit">
      <h2 className="text-xl font-bold text-[#003F62] mb-4 border-b pb-2">
        Danh mục Laptop
      </h2>

      <ul className="space-y-3">
        {loai.map((l) => (
          <li key={l.id}>
            <Link
              href={`/sptrongloai/${l.id}`}
              className={`block px-4 py-2 rounded-lg transition-all duration-200 
                ${
                  String(l.id) === String(id_loai)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`}
            >
              {l.ten_loai}
            </Link>
          </li>
        ))}
      </ul>
    </div>

   
    <div className="w-3/4">

      <h1 className="text-2xl font-bold text-[#003F62] mb-6">
        Sản phẩm loại: <span className="text-[#EDA415]">{tenLoai}</span>
      </h1>

      {/* Grid 3 sản phẩm mỗi hàng */}
      <div className="grid grid-cols-3 gap-6">

       {sp_hientai.map((sp: ISanpham) => (
        <div
          key={sp.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group relative"
        >
          {/* Ảnh */}
          <Link href={`/sp/${sp.id}`} className="block overflow-hidden">
            <img
              src={sp.hinh}
              alt={sp.ten_sp}
              className="w-full h-[220px] object-contain p-4 transform group-hover:scale-105 transition duration-300"
            />
          </Link>

          {/* Nội dung */}
          <div className="px-5 pb-5">
            <h2 className="text-lg font-semibold text-[#003F62] line-clamp-2 h-[48px]">
              <Link href={`/sp/${sp.id}`}>
                {sp.ten_sp}
              </Link>
            </h2>

            <p className="text-xl font-bold text-[#EDA415] mt-2">
              {Number(sp.gia).toLocaleString("vi-VN")} đ
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-400 mt-2 text-sm">
              ⭐⭐⭐⭐☆
              <span className="text-gray-500 ml-2">(4.0)</span>
            </div>
          </div>

          {/* Hover Actions */}
          <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm flex justify-center gap-3 py-3 translate-y-full group-hover:translate-y-0 transition duration-300">
            <button className="px-4 py-2 bg-[#003F62] text-white rounded-lg hover:bg-[#002c44] transition">
              Add to cart
            </button>

            <Link
              href={`/sp/${sp.id}`}
              className="px-4 py-2 border border-[#003F62] text-[#003F62] rounded-lg hover:bg-[#003F62] hover:text-white transition"
            >
              View
            </Link>
          </div>

          {/* Heart */}
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-[#EDA415] hover:text-white cursor-pointer transition">
            ❤️
          </div>
        </div>
      ))}

      </div>

      {/* ============ PHÂN TRANG ============ */}
      <div className="mt-10 flex justify-center gap-3">
        {pageButtons}
      </div>

    </div>
  </div>
);
}