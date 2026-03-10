"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "../lib/cartSlice"
import { AppDispatch } from "../lib/store"
import { CartItem } from "./cautrucdata"

export default function AddToCartButton({ product }: { product: CartItem }) {

  const dispatch = useDispatch<AppDispatch>()

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Thêm vào giỏ
    </button>
  )
}