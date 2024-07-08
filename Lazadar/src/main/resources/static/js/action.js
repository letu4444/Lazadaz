

$('.tieude1-2-1-1').click(function() {
	$('.top-popup-wrap').removeClass('action');
	$(this).siblings('.top-popup-wrap').addClass('action');
})
$('.top-popup-wrap').mouseleave(function() {
	$(this).removeClass('action');
});
let connet = `<div class="container">
					<div class="giohang1">
						<div class="giohang1-1">
							<div class="giohang1-3">
								<div class="giohang1-2-4">
									<label class="giohang1-5"> <input type="checkbox"
										class="checkbox">
										<div class="checke"></div>
									</label> <span class="giohang1-5-1">CHỌN TẤT CẢ (0 Sản phẩm)</span>
								</div>
								<div class="giohang1-2-1">
									<div class="giohang1-2-3">
										<i class="fa-solid fa-trash-can"></i>
									</div>
									<span class="giohang1-2-2">Delete</span>
								</div>
							</div>
						</div>
					
					</div>
					<div class="giohang2">
						<div class="giohang2-1">
							<div class="giohang2-2">
								<span class="giohang2-3">Địa điểm</span>
								<div class="giohang2-4">
									<div class="giohang2-6">
										<i class="fa-solid fa-location-dot" aria-hidden="true"></i>
									</div>
									<div class="thongtin-diachi-2"></div>
								</div>
							</div>
							<div class="thanhtoan1">
								<div class="thanhtoan1-1">
									<span class="thanhtoan1-1-2">Thông tin đơn hàng</span>
								</div>
								<div class="thanhtoan1-2">
									<div class="thanhtoan1-2-1">
										<div class="thanhtoan1-2-2">
											<span class="thanhtoan1-2-3">Tạm tính (0 Sản phẩm)</span> <span
												class="thanhtoan1-2-4"></span>
										</div>
									</div>
									<div class="thanhtoan1-2-1">
										<div class="thanhtoan1-2-2">
											<span class="thanhtoan1-2-3-1">Phí vận chuyển</span> 
											<span class="thanhtoan1-2-4-1"></span>
										</div>
									</div>
									<div class="voucher-input-inner">
										<div class="voucher-input-col">
											<span
												class="next-input next-input-single next-input-medium clear voucher-input-control">
												<input type="text" id="automation-voucher-input"
												placeholder="Enter Voucher Code" value="" height="100%">
											</span>
										</div>
										<div class="voucher-input-col">
											<button id="automation-voucher-input-button" type="button"
												class="next-btn next-btn-normal next-btn-large voucher-input-button">Apply</button>
										</div>
									</div>
								</div>
							</div>
							<div class="tongthanhtoan">
								<div class="thanhtoan1-2-1">
									<div class="thanhtoan1-2-2">
										<span class="tongthanhtoan1-3">Total:</span> <span
											class="tongthanhtoan1-2"></span>
									</div>
								</div>
								<button class="tongthanhtoan1">XÁC NHẬN GIỎ HÀNG(0)</button>
							</div>
						</div>
					</div>
				</div>`;
let cartempty = `<div class="cart-empty">
                    <div class="cart-empty-text">There are no items in this cart</div>
                    <button class="cart-empty1">CONTINUE SHOPPING</button>
                </div>`;
let userid = parseFloat($(".account").attr("data-userid"));

//Mảng địa chỉ
let addres = new Array();
if (!isNaN(userid)) {



	$.ajax({
		url: `http://localhost:8484/api/cat/userid?userid=${userid}`,
		async: false,
		success: function(data) {
			console.log(data);

			order(data);
		}
	});
	$.ajax({
		url: `http://localhost:8484/api/addres?id=${userid}`,
		async: false,
		success: function(data) {
			if (data.id != null) {
				$('.thongtin-diachi-2').text("Tỉnh " + data.tinh + "-Huyện" + data.huyen + "-Xã" + data.xa);
				$('.thongtin-diachi-2').attr('data-spm-anchor-id', data.id);
			} else {
				$('.thongtin-diachi-2').text("Chưa có thông tin địa chỉ");
			}
		}
	});

	fetch(`http://localhost:8484/api/order/listuserid?userid=${userid}`)
		.then(response => {
			// Xử lý phản hồi từ máy chủ
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			listorder(data);

		})
		.catch(error => {
			// Xử lý lỗi nếu có
			console.error('There was a problem with your fetch operation:', error);
		});
}



// xử lý danh sách sản phẩm khi order về
function order(data) {
	if (data.length > 0) {
		let sl = 0;
		$('.root').append(connet);
		data.forEach((element, index) => {
			sl = sl + element.sl;


			let tong = document.querySelectorAll('.giohang-shop').length;
			let text = ' <div class="giohang-shop"><div class="giohang-shop1"><div class="giohang1-2">' +
				'<label class="giohang1-5"><input type="checkbox" class="checkbox">' +
				'<div class="checke"></div></label>' +
				'<div class="giohang-shop1-1">' +
				'<img src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01eZEDlJ24LnekqQ7eQ_!!6000000007375-2-tps-72-72.png_2200x2200q75.png_.webp" alt="">' +
				'<span class="giohang-shop1-2">' + element.shope + '</span>' +
				'<span class="giohang-shop1-3"></span>' +
				'</div></div></div>' +
				'<div class="giohang-shop2"><div class="giohang-shop2-1">' +
				'<div class="giohang-shop2-2"><label class="giohang1-5"><input type="checkbox" data-idsp="' + element.id + '" class="checkbox"><div class="checke"></div></label>' +
				'<div class="package-sp1-2">' +
				' <div class="package-sp1-2-1">' +
				'<img src="' + element.image + '" alt="">' +
				'</div>' +
				'<div class="package-sp-1-2-2"><a href="#" class="package-sp-1-2-3">' + element.name + '</a><a href="#" class="package-sp-1-2-4">' + element.phanloai + '</a></div>' +
				'</div>' +
				'<div class="giohang-shop2-3"><div class="giohang-shop2-4">₫ ' + element.sotien + '</div><div class="giohang-shop2-5">' +
				'<span class="giohang-shop2-7">' +
				'<i class="fa-regular fa-heart"></i>' +
				'</span>' +
				'<span class="giohang-shop2-6">' +
				'<i class="fa-solid fa-trash-can"></i>' +
				'</span>' +
				'</div>' +
				'</div>' +
				'<div class="tong1q">' +
				`<button class="tong1l-1 tru ${getSl(element.sl)}">` +
				'<svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon4"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>' +
				'</button>' +
				'<input type="text" class="tong1l-1 _A4-4-9" aria-valuenow="1" min="1" max="10" value="' + element.sl + '">' +
				'<button class="tong1l-1 cong">' +
				'<svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon4"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></button>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div> ';
			let text1 = '<div class="giohang-shop2"><div class="giohang-shop2-1">' +
				'<div class="giohang-shop2-2"><label class="giohang1-5"><input type="checkbox" data-idsp="' + element.id + '" class="checkbox"><div class="checke"></div></label>' +
				'<div class="package-sp1-2">' +
				' <div class="package-sp1-2-1">' +
				'<img src="' + element.image + '" alt="">' +
				'</div>' +
				'<div class="package-sp-1-2-2"><a href="#" class="package-sp-1-2-3">' + element.name + '</a><a href="#" class="package-sp-1-2-4">' + element.phanloai + '</a></div>' +
				'</div>' +
				'<div class="giohang-shop2-3"><div class="giohang-shop2-4">₫ ' + element.sotien + '</div><div class="giohang-shop2-5">' +
				'<span class="giohang-shop2-7">' +
				'<i class="fa-regular fa-heart"></i>' +
				'</span>' +
				'<span class="giohang-shop2-6">' +
				'<i class="fa-solid fa-trash-can"></i>' +
				'</span>' +
				'</div>' +
				'</div>' +
				'<div class="tong1q">' +
				`<button class="tong1l-1 tru ${element.sl < 0 ? 'disables' : ''}">` +
				'<svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon4"><polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon></svg>' +
				'</button>' +
				'<input type="text" class="tong1l-1 _A4-4-9" aria-valuenow="1" min="1" max="10" value="' + element.sl + '">' +
				'<button class="tong1l-1 cong">' +
				'<svg enable-background="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" class="svg-icon4"><polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon></svg></button>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			//Lần đâu tiên vào đây  
			if (index == 0) {

				$('.giohang1').append(text);
			} else {
				console.log(tong);
				//Những lần tiếp theo
				for (let i = 0; i < tong; i++) {

					if (element.shope.toLowerCase() != $('.giohang-shop').eq(i).find('.giohang-shop1-2').text().toLowerCase()) {
						$('.giohang1').append(text);
					} else if (element.shope.toLowerCase() == $('.giohang-shop').eq(i).find('.giohang-shop1-2').text().toLowerCase()) {
						$('.giohang-shop').eq(i).append(text1);
						//Nếu đúng có sự trùng hợp thì thôi vòng lặp
						break;
					}
				}
			}
		});
		$('.cart').text(sl);
		$(".cart").css("display", "block");
	} else {
		$('.cart').attr('style', "");
		$('.root').append(cartempty);
	}
}

///Listorrder
function listorder(data) {
	let text = ` <div class="my-order-show">
                                <div class="track-title">Đơn hàng gần đây</div>
                                
                               
                               
                            </div>`;
	if (data.length > 0) {
		$('.order-number .track-title').before(text);
		data.forEach((subArray) => {
			/*subArray.forEach((element, index) => {*/
				const ngaygio = subArray[2].split(',');
				let conter = `<p class="last-order">
                         <a href="/order/views?spm=id.`+subArray[0]+`&ordernumber=`+subArray[1]+`">`+ ngaygio[0] + ` - Order ` + subArray[1] + `</a>
                       </p>`;
				$('.my-order-show').append(conter);
			/*})*/

		});
	}

}
//Xử lý xem có sl bn để chỉnh sửa nút
function getSl(i) {
	if (i == 1) {
		return 'disables';
	} else {
		return '';
	}
}

