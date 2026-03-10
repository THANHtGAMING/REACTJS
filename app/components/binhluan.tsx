"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "@/app/lib/store"
import { useRouter } from "next/navigation"
import { IBinhLuan } from "./cautrucdata"


export default function BinhLuan({id_sp}:{id_sp:number}){

const router = useRouter()

const { user } = useSelector((state:RootState)=>state.auth)

const [listBL,setListBL] = useState<IBinhLuan[]>([])
const [noiDung,setNoiDung] = useState("")
const [thongBao,setThongBao] = useState("")


// load bình luận
useEffect(()=>{
 loadBL()
},[id_sp])

const loadBL = async ()=>{
 const res = await axios.get(`http://localhost:3000/api/binhluan/${id_sp}`)
 setListBL(res.data)
}



// gửi bình luận
const submitBL = async ()=>{

 // chưa đăng nhập
 if(!user){

  setThongBao("⚠ Bạn cần đăng nhập để bình luận")

  setTimeout(()=>{
   router.push("/login")
  },2000)

  return
 }

 // gửi bình luận
 if(!noiDung.trim()) return
 const res = await axios.post("http://localhost:3000/api/binhluan",{
  id_sp,
  ho_ten:user.ho_ten,
  noi_dung:noiDung
 })

 setListBL(prev => [res.data, ...prev])
 setNoiDung("")
}

return(

<div className="max-w-[1330px] mx-auto mt-16">

{/* THÔNG BÁO */}

{thongBao && (
<div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-50">
{thongBao}
</div>
)}

<h2 className="text-2xl font-semibold text-[#003F62] mb-6">
Đánh giá sản phẩm
</h2>


{/* form */}

<div className="bg-gray-100 p-6 rounded-xl mb-10">

<textarea
className="w-full border rounded-lg p-3 text-black"
rows={4}
placeholder="Hãy chia sẻ cảm nhận..."
value={noiDung}
onChange={(e)=>setNoiDung(e.target.value)}
></textarea>

<button
onClick={submitBL}
className="mt-4 bg-[#EDA415] text-white px-6 py-2 rounded-lg"
>
Gửi bình luận
</button>

</div>



{/* danh sách bình luận */}

<div className="space-y-6">

{listBL.map((bl)=>(
<div key={bl.id} className="flex gap-4 border-b pb-5">

<img
src="https://i.pravatar.cc/50"
className="w-12 h-12 rounded-full"
/>

<div>

<p className="font-semibold text-gray-800">
{bl.ho_ten}
</p>

<p className="text-gray-700">
{bl.noi_dung}
</p>

</div>

</div>
))}

</div>

</div>

)

}