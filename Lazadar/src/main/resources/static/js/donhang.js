var urlParams = new URLSearchParams(window.location.search);
var param1Value = urlParams.get('ordernumber');
let paramid = urlParams.get('spm').split(".");
let idorder = parseFloat(paramid[1]);
let userid = parseFloat($(".account").attr("data-userid"));

let text = ` <div class="user-right1">
                        <span class="user-right1-1">Chi tiết đơn hàng</span>
                    </div>
                    <div class="user-right1-2">
                        <div id="root_order" class="page-root">
                              <div class="guarantee-container">
                                <div class="guarantee">
                                    <img class="guarantee3" src="https://laz-img-cdn.alicdn.com/imgextra/i3/O1CN01p5BJnL1INXeXY6QKF_!!6000000000881-2-tps-51-54.png" alt="">
                                    <p class="guarantee1">Bảo vệ bởi ZinTu:</p>
                                    <div class="guarantee2">Hoàn tiền 100% nếu hàng không như mô tả</div>
                                    <img class="guarantee4" src="https://lzd-img-global.slatic.net/g/tps/imgextra/i3/O1CN01cTBtRf1sSQ2RedhNX_!!6000000005765-2-tps-39-39.png" alt="">
                                </div>
                              </div>
                              <div class="shop">
                                    <div class="shop_header">
                                        <div class="shop_left">
                                            <div class="shop_left_info">
                                                <img src="https://img.alicdn.com/imgextra/i1/O1CN01eZEDlJ24LnekqQ7eQ_!!6000000007375-2-tps-72-72.png" class="shop_left_info_img" alt="">
                                                <p class="shop_left_info_name">Tên</p>
                                            </div>
                                            <div class="shop_left_chat">
                                                <span class="seller-im-icon">
                                                    <svg width="14" height="14" viewBox="0 0 19 19" class="im-icon" data-spm-anchor-id="a2o4n.pdp_revamp.icms-5000632-1511774372834.i3.386e663ckuESMa"><path d="M19.043 3.805c.134 0 .256.025.368.077.11.053.21.123.3.212.089.074.159.17.211.289A.946.946 0 0120 4.76V19l-3.805-3.805H5.761a.93.93 0 01-.378-.077.77.77 0 01-.289-.212.77.77 0 01-.212-.289.93.93 0 01-.077-.378v-1.891h12.347V3.805h1.891zM15.24 9.5a.89.89 0 01-.267.667c-.09.09-.193.16-.311.212a.893.893 0 01-.356.078h-9.5L1 14.239V.957c0-.134.027-.256.078-.368.052-.11.122-.21.212-.3.089-.089.188-.159.3-.211A.866.866 0 011.956 0h12.348c.118 0 .237.027.356.078.118.052.222.122.31.212a.89.89 0 01.268.667V9.5z" mask="url(#icon-messages_svg__mask-2)" transform="translate(-1)" fill-rule="evenodd"></path></svg>
                                                </span>
                                                <p class="shop_left_chat_name">Chat với NBH</p>
                                            </div>
                                        </div>
                                      
                                    </div>
                                    <div class="shop_boy">
                                        <div class="package">
                                            <div class="package_header">
                                                <div class="package_shipping">
                                                    <div class="shipping-delivery-info">
                                                        Nhận hàng vào Th 5 09 thg 5 - Th 2 13 thg 5
                                                    </div>
                                                    <span class="delivery-method">
                                                        <i class="delivery-split"></i>
                                                        <span class="delivery-icon">
                                                            <i class="fa-solid fa-truck-fast" aria-hidden="true"></i>
                                                        </span>
                                                        <span class="delivery-text">Tiêu chuẩn</span>
                                                    </span>

                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                              </div>
                              <div class="detail-info">
                                <div class="detail-info-wrapper">
                                  <div class="detail-info1">                              
                                    <p class="order-number">Đơn hàng 1234568876</p>
                                    <p class="desc-margin">Đặt ngày 07 thg 5 2024  09:27:58</p></div>
                                </div>
                              </div>
                              <div class="container" style="display: flex; width: 966px;">
                                  <div class="container" style="width: 480px; float: left;">
                                       <div class="delivery-summary">
                                        <div class="delivery-wrapper">
                                            <span class="username">Tên</span>
                                            <span class="address">Xã bắc phú Huyện sóc sơn Tỉnh hà nội</span>
                                            <span class="phone">09988765441</span>
                                        </div>
                                       </div>
                                  </div>
                                  <div class="container" style="width: 488px; float: right;">
                                       <div class="total-summary">
                                            <div class="text_total total_header">Tổng cộng</div>
                                            <div>
                                                <div class="row">
                                                    <div class="text_total row-left-layout">Tổng Tiền(2 Sản phẩm)</div>
                                                    <span class="text_total pull-right1">2.288.618 ₫</span>
                                                </div>
                                                <div class="row">
                                                    <div class="text_total row-left-layout">Phí vận chuyển</div>
                                                    <span class="text_total pull-right1">37.600 ₫</span>
                                                </div>
                                                <div class="row">
                                                    <div class="text_total row-left-layout">Khuyến mãi của nhà bán hàng</div>
                                                    <span class="text_total pull-right1 sale">-114.431 ₫</span>
                                                </div>
                                               
                                            </div>
                                            <hr></hr>
                                            <div class="second-header">
                                                <div class="text_total row-left-layout">Tổng cộng</div>
                                                <div class="text_total total-price">2.211.397 ₫</div>

                                            </div>
                                       </div>
                                  </div>

                              </div>
                              
                        </div>
                    </div>`;
 let trangthai=`<div class="shop_right">
                                 <div class="count-down-container">
                                               <div class="count-down-conten">
                                                   <div class="count-down-left">Đơn hàng sẽ đóng trong</div>
                                                   <div class="count-down-text">
                                                      <span class="time-conten">70</span>
                                                      <span class="colon">:</span>
                                                      <span class="time-conten">70</span>
                                                      <span class="colon">:</span>
                                                      <span class="time-conten">70</span>

                                                   </div>
                                               </div>
                                            </div>
                                            <div class="shop-right-status">Chờ thanh toán</div>
                                            <div class="shop-right-action">Thanh toán</div>
                                        </div>`;

let sp = `  <div class="order-item">
                                    <div class="item-pic">
                                                    <a href="#">
                                                        <img class="item-pic-img" src="https://vn-live.slatic.net/p/7fdabc11de0023e79fe1d65b3bae334b.jpg_340x340q75.jpg_.webp" alt="">
                                                    </a>
                                                </div>
                                                <div class="item-main">
                                                    <div class="text-title item-title">
                                                        <a href="#">
                                                            Điện thoại thông minh mới 2023 SOYES S23 PRO mini siêu mỏng 3G lõi tứ 3.0 inch Màn hình HD RAM 2GB ROM 16GB Camera sau 2MP WIFI Blue
                                                        </a>
                                                    </div>
                                                    <div class="item-sku">128GB, Hồng</div>
                                                    <div class="info desc">
                                                        6 tháng Nhà cung cấp trong nước bảo hành
                                                    </div>
                                                </div>
                                                <div class="item-status">₫ 1.258.064</div>
                                                <div class="item-quantity">
                                                    <div class="multiply">Số lượng:</div>
                                                    <div class="text-quantity">1</div>
                                                </div>
                                                <div class="item-clead">
                                                    <p class="bold">Hủy</p>
                                                </div>
                                            </div>`;
                                            
if (param1Value != null) {
	fetch(`http://localhost:8484/api/order/views?userid=` + userid + `&ordernumber=` + param1Value + `&idorder=` + idorder)
		.then(req => req.json())
		.then(data => {
			console.log(data);
			sporder(data);
			
		})
		.catch(error => {
			console.log(error);
		});
 	

}

//Xử lý sporder
function sporder(data){
	if(data.length > 0){
		const ngaygio = data[0].ngaydat.split(',');
		const gio = ngaygio[0].split('/');
		const date =gio[1]+" "+gio[0]+" "+gio[2] +" "+ngaygio[1];
		
		$('.user-right').append(text);
		$('.guarantee1').text('Bảo vệ bởi '+data[0].shope+':');
		$('.shop_left_info_name').text(data[0].shope);
		$('.order-number').text('Đơn hàng '+data[0].orderNumber);
		$('.desc-margin').text("Đặt ngày "+gio[0]+" Tháng "+gio[1]+" "+gio[2]+" "+ngaygio[1]);
		$('.row-left-layout').eq(0).text('Tổng Tiền('+data.length+' Sản phẩm)');
		if(data[0].trangthai =="chua hoặc rồi"){
			$('.shop_header').append(trangthai);
		}
		//Lấy tiền với số lượn ra để tính
		let sotien = 0;
		let sl =0;
		let shipe =parseInt(data[0].shipe.replace(/,/g, ""));
		data.forEach((element, index) => {
			$('.package').append(sp);    
			$('.item-pic-img').eq(index).text(element.image);
			$('.item-title a').eq(index).text(element.name);
			$('.item-sku').eq(index).text(element.phanloai);
			$('.item-status').eq(index).text('₫ '+element.sotien);
			$('.text-quantity').eq(index).text(element.sl);
			let stien = parseInt(element.sotien.replace(/,/g, ""));
			sotien= sotien+stien;
			sl = sl+element.sl;
			
		});
		let tongtien =(sotien*sl)+shipe-parseInt("114431");
		let quydoi =tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$('.pull-right1').eq(0).text((sotien*sl).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+" ₫");
		$('.pull-right1').eq(1).text(data[0].shipe+" ₫");
		$('.total-price').text(quydoi+" ₫");
		initializeClock(date);
		addres();
	}
}

function initializeClock(date) {
	var targetTime = new Date(Date.parse(date) + 3 * 24 * 60 * 60 * 1000); // Ví dụ: 1 ngày nhân 24h nhân 60 phút * 60 giây  phút từ thời điểm hiện tại

	// Cập nhật đồng hồ đếm ngược mỗi giây
	var countdownInterval = setInterval(function() {
		// Thời gian hiện tại
		var currentTime = new Date().getTime();

		// Tính toán thời gian còn lại
		var remainingTime = targetTime - currentTime;

		// Chuyển đổi thời gian còn lại thành định dạng phút:giây
		var hours = Math.floor((remainingTime / (1000 * 60 * 60)));
		var seconds = Math.floor((remainingTime / 1000) % 60);
		var minutes = Math.floor((remainingTime / 1000 / 60) % 60);
		$('.time-conten').eq(0).text(("0" + hours).slice(-2));
		$('.time-conten').eq(1).text(("0" + minutes).slice(-2));
		$('.time-conten').eq(2).text(("0" + seconds).slice(-2));


		// Kiểm tra nếu thời gian còn lại đã hết
		if (remainingTime <= 0) {
			clearInterval(countdownInterval); // Dừng đồng hồ đếm ngược
			console.log("Hết thời gian!");
		}
	}, 1000);
};
//lấy điạ chỉ
function addres(){
	$.ajax({
		url: `http://localhost:8484/api/addres?id=${userid}`,
		async: false,
		success: function(data) {
			console.log(data+"địa chỉ");
			if (data.id != null) {
				$('.username').text(data.name);
				$('.address').text("Tỉnh " + data.tinh + "-Huyện" + data.huyen + "-Xã" + data.xa);
				$('.phone').text("0"+ data.iphone);
			} else {
				$('.thongtin-diachi-2').text("Chưa có thông tin địa chỉ");
			}
		}
	});
} 