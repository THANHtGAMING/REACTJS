

 import { ISanpham } from "@/app/components/cautrucdata";
 import BinhLuan from "@/app/components/binhluan";
import AddToCartButton from "@/app/components/butoncart";
 type Props = {
  params: Promise<{ id: string }>
}

export default async function SP({ params }: Props) {

  const { id } = await params;
  const productId = Number(id);

  const resSP = await fetch(`http://localhost:3000/api/sp/${productId}`, {
    cache: "no-store"
  });

  const kq_sp = await resSP.json();

  const sp: ISanpham = kq_sp as ISanpham;
    
     
      return(
      <>
<div className="max-w-[1300px] mx-auto mt-10 grid grid-cols-2 gap-12">

  {/* Hình ảnh sản phẩm */}
  <div className="bg-white rounded-xl shadow-md p-6">
    <img
      src={sp.hinh}
      alt={sp.ten_sp}
      className="w-full h-[450px] object-contain rounded-lg"
    />

   
  </div>


  {/* Thông tin sản phẩm */}
  <div>

    {/* Tên */}
    <h1 className="text-3xl font-semibold text-[#003F62] mb-3">
      {sp.ten_sp}
    </h1>

    {/* Đánh giá */}
    <div className="flex items-center gap-2 mb-3">

      <div className="text-yellow-500 text-lg">
        ★★★★★
      </div>

      <span className="text-gray-500 text-sm">
        (120 đánh giá)
      </span>

      <span className="text-gray-400 text-sm">
        | 320 đã bán
      </span>

    </div>


    {/* Giá */}
    <div className="flex items-center gap-4 mb-6">

      <span className="text-4xl font-bold text-red-500">
        {Number(sp.gia).toLocaleString("vi")} đ
      </span>

      <span className="text-lg text-gray-400 line-through">
        5.500.000 đ
      </span>

      <span className="bg-red-100 text-red-500 px-2 py-1 text-sm rounded">
        -10%
      </span>

    </div>


    {/* Tình trạng */}
    <div className="mb-4">
      <span className="text-gray-700 font-medium">
        Tình trạng:
      </span>

      <span className="text-green-600 font-semibold ml-2">
        ✔ Còn hàng
      </span>
    </div>


    {/* Mô tả ngắn */}
    <p className="text-gray-600 leading-relaxed mb-6">
      Sản phẩm chính hãng, chất lượng cao, bảo hành đầy đủ. 
      Phù hợp cho công việc, học tập và giải trí. 
      Thiết kế hiện đại, hiệu năng mạnh mẽ, giá thành hợp lý.
    </p>


    {/* Chọn số lượng */}
    {/* <div className="flex items-center gap-4 mb-6">

      <span className="font-medium text-black">
        Số lượng:
      </span>

      <div className="flex border rounded-lg">

        <button className="px-4 py-2 hover:bg-gray-100 text-black">
          -
        </button>

        <input
          type="text"
          value="1"
          className="w-12 text-center outline-none text-black"
        />

        <button className="px-4 py-2 hover:bg-gray-100 text-black">
          +
        </button>

      </div>

      <span className="text-gray-400 text-sm">
        34 sản phẩm có sẵn
      </span>

    </div> */}


    {/* Nút hành động */}
    <div className="flex gap-4 mb-8">
      <AddToCartButton
  product={{
    id: sp.id,
    ten_sp: sp.ten_sp,
    gia: sp.gia,
    hinh: sp.hinh,
    so_luong: 1
  }}
/>

     

      <button
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold"
      >
        ⚡ Mua ngay
      </button>

    </div>


    {/* Chính sách */}
    <div className="space-y-3 text-gray-600 text-sm">

      <div className="flex items-center gap-2">
        🚚 Miễn phí vận chuyển cho đơn từ 500k
      </div>

      <div className="flex items-center gap-2">
        🔄 Đổi trả miễn phí trong 7 ngày
      </div>

      <div className="flex items-center gap-2">
        🛡 Bảo hành chính hãng 12 tháng
      </div>

      <div className="flex items-center gap-2">
        📞 Hỗ trợ khách hàng 24/7
      </div>

    </div>

  </div>

</div>
     {/* Bình luận sản phẩm */}
<BinhLuan id_sp={sp.id}/>
     </>
      )
 }