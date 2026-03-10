"use client"

import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../lib/store"
import { increase, decrease, removeItem, clearCart } from "../lib/cartSlice"
import Link from "next/link"

export default function GioHang() {

  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)

  const tongTien = items.reduce(
    (sum, item) => sum + item.gia * item.so_luong,
    0
  )

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-yellow-600">🛒 Giỏ hàng trống</h2>

        <Link
          href="/"
          className="bg-[#003F62] text-white px-6 py-3 rounded-lg"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8 text-yellow-600">Giỏ hàng của bạn</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Sản phẩm</th>
              <th className="p-4">Giá</th>
              <th className="p-4">Số lượng</th>
              <th className="p-4">Tổng</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id} className="border-t">

                {/* PRODUCT */}

                <td className="p-4 flex items-center gap-4">

                  <img
                    src={item.hinh}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div className="font-medium text-black">
                    {item.ten_sp}
                  </div>

                </td>

                {/* PRICE */}

                <td className="text-center font-semibold text-[#003F62]">
                  {item.gia.toLocaleString()} đ
                </td>

                {/* QUANTITY */}

                <td className="text-center">

                  <div className="flex justify-center items-center gap-2">

                    <button
                      onClick={() => dispatch(decrease(item.id))}
                      className=" text-black"
                    >
                      -
                    </button>

                    <span className="w-10 text-center font-semibold text-black">
                      {item.so_luong}
                    </span>

                    <button
                      onClick={() => dispatch(increase(item.id))}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 text-black"
                    >
                      +
                    </button>

                  </div>

                </td>

                {/* TOTAL */}

                <td className="text-center font-bold text-red-500">
                  {(item.gia * item.so_luong).toLocaleString()} đ
                </td>

                {/* DELETE */}

                <td className="text-center">

                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FOOTER CART */}

      <div className="flex justify-between items-center mt-8">

        <button
          onClick={() => dispatch(clearCart())}
          className="px-5 py-3 bg-red-600 rounded-full text-white-500  font-medium hover:underline"
        >
          Xóa toàn bộ giỏ hàng
        </button>

        <div className="text-right">

          <p className="text-gray-500 mb-1">Tổng thanh toán</p>

          <h2 className="text-3xl font-bold text-red-500">
            {tongTien.toLocaleString()} đ
          </h2>

          <button className="mt-4 bg-[#EDA415] hover:bg-[#d89612] text-white px-8 py-3 rounded-lg font-semibold">
            Thanh toán
          </button>

        </div>

      </div>

    </div>
  )
}