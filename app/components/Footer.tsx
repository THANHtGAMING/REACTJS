export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#E2F4FF] mt-16 py-10">

        {/* Subscribe */}
        <div className="max-w-[1320px] bg-white rounded-2xl mx-auto px-10 py-8 flex items-center justify-between shadow-md">

          <h2 className="text-[#1B5A7D] text-2xl font-bold">
            Đăng ký nhận bản tin
          </h2>

          <div className="relative">

            <input
              type="text"
              placeholder="Nhập địa chỉ email của bạn"
              className="w-[360px] bg-[#EDA415] text-white px-5 py-3 rounded-full placeholder:text-white outline-none"
            />

            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg">
              <i className="fa-light fa-paper-plane"></i>
            </button>

          </div>

          <div className="flex items-center gap-3 text-[#1B5A7D] font-medium">

            <i className="fa-solid fa-headphones text-xl"></i>

            <span>
              Hotline 24/7: (+84) 0123 567 789
            </span>

          </div>

        </div>


        {/* Main Footer */}
        <div className="max-w-[1320px] mx-auto mt-12 grid grid-cols-4 gap-10">

          {/* Logo + địa chỉ */}
          <div>

            <img
              src="/hinh100.png"
              className="mb-5"
              alt="logo"
            />

            <p className="text-[#1B5A7D] leading-7">
              64 St James Boulevard <br />
              Hoswick, ZE2 7ZJ
            </p>

          </div>


          {/* Danh mục sản phẩm */}
          <div>

            <h3 className="text-[#1B5A7D] font-bold text-lg mb-3">
              Danh mục sản phẩm
            </h3>

            <ul className="space-y-2 text-[#1B5A7D]">

              <li className="hover:text-[#EDA415] cursor-pointer">
                Đồng hồ thời trang
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Điện thoại thông minh
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Laptop cao cấp
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Phụ kiện công nghệ
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Thiết bị làm đẹp
              </li>

            </ul>

          </div>


          {/* Hỗ trợ */}
          <div>

            <h3 className="text-[#1B5A7D] font-bold text-lg mb-3">
              Hỗ trợ khách hàng
            </h3>

            <ul className="space-y-2 text-[#1B5A7D]">

              <li className="hover:text-[#EDA415] cursor-pointer">
                Về chúng tôi
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Liên hệ
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Chính sách đổi trả
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Chính sách bảo mật
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Chính sách thanh toán
              </li>

            </ul>

          </div>


          {/* Thông tin */}
          <div>

            <h3 className="text-[#1B5A7D] font-bold text-lg mb-3">
              Thông tin
            </h3>

            <ul className="space-y-2 text-[#1B5A7D]">

              <li className="hover:text-[#EDA415] cursor-pointer">
                Tin tức
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Dịch vụ
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Chính sách của chúng tôi
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Chăm sóc khách hàng
              </li>

              <li className="hover:text-[#EDA415] cursor-pointer">
                Câu hỏi thường gặp
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom */}
        <div className="max-w-[1320px] mx-auto mt-10 pt-6 border-t text-center text-[#1B5A7D] text-sm">

          © 2026 Bản quyền thuộc về Website bán hàng.

        </div>

      </div>
    </>
  );
}