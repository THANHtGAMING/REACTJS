"use client"

import { ISanpham } from "./components/cautrucdata";
 import Link  from "next/link";
import { useEffect, useState } from "react";

export default  function Home() {
  const [spHot, ganspHot] = useState([] as ISanpham[])
    const [currentPage, setcurrentPage] = useState(1);
    const producsPerpage =8 //san pham moi trang la 8
    useEffect(() =>{
       fetch (`http://localhost:3000/api/sphot/32`)
     .then(res => res.json())
     .then(data => ganspHot(data))
    },[])
    const start = (currentPage -1) * producsPerpage
  const end = start + producsPerpage
  const currentProducts = spHot.slice(start, end)
  const tongtrang = Math.ceil(spHot.length / producsPerpage)
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


    return(
     <>
    <div className="w-[1350px] mx-auto mt-[20px]">
      <div className="flex flex row p-10">
        <div className="font-bold text-[#1B5A7D] text-2xl text-sans">Popular products</div>
        <div className="flex-grow text-right mt-1 ">
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] "
            href="">Cameras</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Laptops</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Tablets</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Mouse</a>
        </div>
      </div>
    </div>
     <div className="max-w-[1300px] mx-auto mt-8 px-4 grid grid-cols-4 gap-6">
      {currentProducts.map((sp: ISanpham) => (
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
     <div className="w-[1330px] mx-auto mt-6 flex justify-center space-x-2">
      {pageButtons}
    </div>
  
    </>
    )
}
