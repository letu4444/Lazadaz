

$('.checked-icon').click(function() {
	const check = $(this).is('.checked');
	$('.lazada').removeClass('lazada-ic-sucess');
	$('.checked-icon').removeClass("checked");
	$('.lazada').addClass('lazada-__btn-check-unselect');
	$('.card-container').removeClass('selected');
	if (check === false) {
		$(this).removeClass('lazada-__btn-check-unselect');
		$(this).addClass('lazada-ic-sucess');
		$(this).addClass("checked");
		$(this).parents('.card-container').addClass('selected');
	} else {
		$(this).removeClass('lazada-ic-sucess');
		$(this).removeClass("checked");
		$(this).addClass('lazada-__btn-check-unselect');
		$(this).parents('.card-container').removeClass('selected');

	}
	load();
});


function load() {
	let text = '<div class="load">' +
		'<div class="text2">' +
		'<div class="text1"">' +
		'<span class="text">ZinTu</span>' +
		'<div class="spinner-3">' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';
	$('.tieude').after(text);
	$('.load').css({
		"height": window.innerHeight + "px"
	});
	setTimeout(function() {
		$(".load").remove();
	}, 2000);
}


//Kiểm tra xem có userid không
let userid = parseFloat($(".account").attr("data-userid"));

//Mảng địa chỉ
let addres = new Array();

//Thanh toán vnpay
const vnpay = {};

let Numberorrder = $('.id_sp').attr('data-id');
console.log(Numberorrder);
if (Numberorrder != null && !isNaN(userid)) {
	checkout();
} else if (!isNaN(userid)) {

	checkout();
}

//Xử lý khi đã có đơn hàng cần thanh toán thoe đơn đó
function checkout() {
	let url = '';
	if (Numberorrder != null && !isNaN(userid)) {
		//	const stringarray = aray.join();
		url = `http://localhost:8484/api/checkout/list?idsp=` + Numberorrder;
	} else if (!isNaN(userid)) {
		url = `http://localhost:8484/api/checkout/list?userid=` + userid;
	}
	//lấy địa chỉ
	$.ajax({
		url: `http://localhost:8484/api/addres?id=${userid}`,
		async: false,
		success: function(data) {
			console.log(data);

			addres = data;
		}
	});

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Chuyển đổi phản hồi sang JSON
		})
		.then(data => {
			inchechout(data);
			console.log(data); // Xử lý dữ liệu nhận được từ server
		})
		.catch(error => {
			console.error('There was an error!', error);
		});
}
console.log(addres);
//Nơi in ra chetout nếu có
function inchechout(data) {
	if (data.length > 0) {
		if (addres.id != null) {
			let adder = `<div>
                           <div class="v2-address-title-container">
                                        <span class="v2-address-title">`+ addres.name + `</span>
                                        <span class="v2-mobile">`+ addres.iphone + `</span>
                                    </div> 
                                </div>
                                <div class="v2-address-info-item">
                                    <span>Xã `+ addres.xa + `,Huyện ` + addres.huyen + `,Tỉnh ` + addres.tinh + `</span>
                                </div>`;
			$('.v2-checkout-address-inner').append(adder);
		} else {
			let noaddres = `<div class="v2-checkout-address-cp">
<form class="update_user">
                            <div class="update1">
                                <div class="mod-address-form-left">
                                    <div class="mod-input-name">
                                        <label >Full Name</label>
                                        <input type="text" value="" name="name" placeholder="Nhập tên">
                                        <span class="error"></span>
                                        <div class="mod-input-close-icon"></div>
                                    </div>
                                    <div class="mod-input-name">
                                        <label >Phone Number</label>
                                        <input type="tel" value="" name="iphone" placeholder="Nhập sdt">
                                        <span class="error"></span>
                                        <div class="mod-input-close-icon"></div>
                                    </div>
                                </div>
                                <div class="mod-address-form-right">
                                    <div class="mod-input-name">
                                        <label >Tỉnh</label>
                                        <input type="text" value="" name="tinh" placeholder="Nhập tỉnh">
                                        <span class="error"></span>
                                        <div class="mod-input-close-icon"></div>
                                    </div>
                                    <div class="mod-input-name">
                                        <label >Huyện</label>
                                        <input type="text" value="" name="huyen" placeholder="Nhập huyện">
                                        <span class="error"></span>
                                        <div class="mod-input-close-icon"></div>
                                    </div>
                                    <div class="mod-input-name">
                                        <label >Xã</label>
                                        <input type="text" value="" name="xa" placeholder="Nhập xã">
                                        <span class="error"></span>
                                        <div class="mod-input-close-icon"></div>
                                    </div>
                                    <div class="mod-address-tag">
                                        <p class="mod-address-tag-title">Select a label for effective delivery:</p>
                                        <div class="mod-address-tag-content">
                                            <div class="mod-address-tag-item mod-address-tag-work ">
                                                <span class="mod-address-tag-icon select-tag-work"></span>
                                                <span>OFFICE</span>
                                            </div>
                                            <div class="mod-address-tag-item mod-address-tag-home ">
                                                <span class="mod-address-tag-icon select-tag-home"></span>
                                                <span>HOME</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mod-address-form-action">
                                   
                                    <button tabindex="7" type="button" class="next-btn next-btn-primary next-btn-large mod-address-form-btn-save">SAVE</button>
                                </div>
                            </div>
                        </form>
                                
                                </div>`;
			$('.v2-checkout-address-inner').append(noaddres);
		}
		let tongthanhtoan = 0;
		let sl = 0;
		let array_order = [];
		data.forEach((element, index) => {
			let tong = document.querySelectorAll('.package').length;
			let text = `  <div class="package">
                            <div class="package-title">
                                <div class="package-title-left">
                                   <span class="package-title-name">Package  `+ element.name + `</span>
                                </div>
                                <div class="package-title-right">
                                    <span class="package-title-tips">Shipped by</span>
                                    <span class="package-title-brand">`+ element.shope + `</span>
                                </div>
                                
                            </div>
                            <div class="package-giaohang">
                                <div class="package-giaohang1">
                                    <div class="package-giaohang1-1">
                                        <div class="package-giaohang1-2">
                                            Tùy chọn giao hàng
                                        </div>
                                    </div>
                                    <div class="package-giaohang1-3">
                                        <div class="package-giaohang1-4">
                                            <div class="package-giaohang1-5">
                                                <div class="package-giaohang1-5-1">
                                                    <span class="selected-icon">
                                                        <i class="fa-solid fa-circle-check"></i>
                                                    </span>
                                                    <div class="package-giaohang1-5-2">
                                                        <span class="package-giaohang1-5-3">₫ 37,300</span>
                                                    </div>
                                                </div>
                                                <p class="delivery-item-name-wrap"><span class="delivery-item-name">Giao hàng tiêu chuẩn</span></p>
                                                <div class="package-giaohang1-6">
                                                    <p class="package-giaohang1-6-1">Nhận trước ngày 13-15 tháng 4</p>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="package-sp" data-id="`+ element.id + `">
                                <div class="package-sp1">
                                    <div class="package-sp1-1">
                                        <div class="package-sp1-2">
                                            <div class="package-sp1-2-1">
                                                <img src="`+ element.image + `" alt="">
                                            </div>
                                            <div class="package-sp-1-2-2">
                                                <a href="#" class="package-sp-1-2-3">`+ element.name + `</a>
                                                <a href="#" class="package-sp-1-2-4">`+ element.phanloai + `</a>
                                            </div>
                                        </div>
                                        <div class="package-sp1-3">
                                            <div class="package-sp1-3-1">₫ `+ element.sotien + `</div>
                                            <div class="package-sp1-3-2">₫ `+ element.sotien + `</div>
                                            <div class="package-sp1-3-3">30%</div>
                                            <div class="package-sp1-3-4">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </div>
                                        </div>
                                        <div class="package-sp1-4">
                                            <span class="package-sp1-4-1">SL:</span>
                                            <span class="package-sp1-4-2">`+ element.sl + `</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
			let text1 = `<div class="package-sp" data-id="` + element.id + `">
                                <div class="package-sp1">
                                    <div class="package-sp1-1">
                                        <div class="package-sp1-2">
                                            <div class="package-sp1-2-1">
                                                <img src="`+ element.image + `" alt="">
                                            </div>
                                            <div class="package-sp-1-2-2">
                                                <a href="#" class="package-sp-1-2-3">`+ element.name + `</a>
                                                <a href="#" class="package-sp-1-2-4">`+ element.phanloai + `</a>
                                            </div>
                                        </div>
                                        <div class="package-sp1-3">
                                            <div class="package-sp1-3-1">₫ `+ element.sotien + `</div>
                                            <div class="package-sp1-3-2">₫ `+ element.sotien + `</div>
                                            <div class="package-sp1-3-3">30%</div>
                                            <div class="package-sp1-3-4">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </div>
                                        </div>
                                        <div class="package-sp1-4">
                                            <span class="package-sp1-4-1">SL:</span>
                                            <span class="package-sp1-4-2">`+ element.sl + `</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
			//Lần đâu tiên vào đây  
			if (index == 0) {

				$('.checkout1').append(text);
			} else {
				console.log(tong);
				//Những lần tiếp theo
				for (let i = 0; i < tong; i++) {
					$('.package').eq(i).find('.package-title-name').text('Package ' + i + ' of' + tong);
					if (element.shope.toLowerCase() != $('.package').eq(i).find('.package-title-brand').text().toLowerCase()) {
						$('.checkout1').append(text);
					} else if (element.shope.toLowerCase() == $('.package').eq(i).find('.package-title-brand').text().toLowerCase()) {
						$('.package').eq(i).find('.package-sp:last').append('<div style="width: 100%; height: 1px; background-color: rgb(218, 218, 218);"></div>');
						$('.package').eq(i).append(text1);
						//Nếu đúng có sự trùng hợp thì thôi vòng lặp
						break;
					}
				}
			}
			//đây là nơi tính tôổng số tiền cần phải trả
			let sotien = element.sotien.replace(/,/g, "");
			let tongtien = parseInt(sotien) * element.sl;
			tongthanhtoan = tongthanhtoan + tongtien;
			sl = sl + element.sl;
			array_order.push(element.orderNumber);
		});

		var doitien = tongthanhtoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		let tongshipe = 0
		for (let i = 0; i < $('.package-giaohang1-5-3').length; i++) {

			let shipe = $('.package-giaohang1-5-3').eq(i).text().split(" ");
			let tienshipe = parseInt(shipe[1].replace(/,/g, ""));
			tongshipe = tongshipe + tienshipe;
			console.log(tongshipe);
		}
		var doitienshipe = tongshipe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$('.tong').text('Tạm tính (' + sl + ' Sản phẩm)');
		$('.thanhtoan1-2-4').text('₫ ' + doitien);
		$('.thanhtoan1-2-4-1').text('₫ ' + doitienshipe);
		//coins nếu có
		let coins = $('.thanhtoan1-2-4-coins').text().split(" ");
		let tongcoins = parseInt(coins[1].replace(/,/g, ""));
		let tatca = tongthanhtoan + tongshipe - tongcoins;
		let quydoi = tatca.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		$('.tongthanhtoan1-2').text('₫ ' + quydoi);

		vnpay.sotien = (tatca * 100).toString();
		vnpay.order_number = array_order;
		vnpay.userid = userid;


	} else {
		$('.root').remove();
	}
}


$(document).on('click', '.tongthanhtoan1', function() {
	const loi = `<div class="loi1-2">
                    <div class="loi1">
                        <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                        <span class="loi1-1">
                            
                        </span>
                    </div>
                </div>`;
	if (addres.id != null) {
		//Xử lý để lưu sản phẩm vào trong data để tạo đơn hàng khi thanh toán hoặ chưa thanh toán
		let Array1 = [];
		$('.package-sp').each(function() {
			const stien = $(this).parents('.package').find('.package-sp1-3-1').text().split(' ');
			const ship = $(this).parents('.package').find('.package-giaohang1-5-3').text().split(' ');
			const Arr = {};
			Arr.idsp = parseFloat($(this).attr('data-id'));
			Arr.shope = $(this).parents('.package').find('.package-title-brand').text();
			Arr.image = $(this).parents('.package').find('.package-sp1-2-1 img').attr('src');
			Arr.name = $(this).parents('.package').find('.package-sp-1-2-3').text();
			Arr.phanloai = $(this).parents('.package').find('.package-sp-1-2-4').text();
			Arr.sotien = stien[1];
			Arr.sl = parseInt($(this).parents('.package').find('.package-sp1-4-2').text());
			Arr.shipe = ship[1];
			Arr.userId = parseFloat($(".account").attr("data-userid"));
			Arr.trangthai = "chua hoặc rồi";
			Array1.push(Arr);

		});
		console.log(Array1);
		/// Xử lý khi chưa chọn phương thứcc thanh toán
		$('.card-container').each(function() {
			console.log($(this));
			if ($('.card-container').is('.selected')) {
				if ($('.selected').find('.card-title').attr("title") == "viza") {

				} else {
					const data1 = {};
					data1.listResul = Array1;
					order(data1);


				}
				//Dừng vòng lặp thi đã chọn rồi
				return false;
			} else {
				$('.tieude').after(loi);
				$(".loi1-1").text('Vui lòng chọn phương thức thanh toán');
				setTimeout(function() {
					$('.loi1-2').remove();
				}, 3000);
			}
			console.log($(this).is('.selected'));

		});
	} else {
		$('.tieude').after(loi);
		$(".loi1-1").text('Vui lòng điền địa chỉ vào');
		setTimeout(function() {
			$('.loi1-2').remove();
		}, 3000);
	}
});


//Sử lý khi tạo đơn hàng sang bên thanh toán 
function order(data) {
	const options = {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	fetch("http://localhost:8484/api/order/save", options)
		.then(response => {
			// Xử lý phản hồi từ máy chủ
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Trả về một giá trị khác thay vì JSON
			return "daluu";
		})
		.then(data => {
			console.log(data);
			if (data == "daluu") {
				
				vnpayaction(vnpay);
			}
		})
		.catch()(error => {
			// Xử lý lỗi nếu có
			console.error('There was a problem with your fetch operation:', error);
		});
}

//hàm để đẩy sang thanh toán của vnpay
function vnpayaction(datavnpay) {
	fetch("http://localhost:8484/vnpay", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datavnpay) // Chuyển đổi đối tượng thành chuỗi JSON
	})
		.then(response => {
			// Xử lý phản hồi từ máy chủ
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			console.log(data);

			window.location.href = data;


		})
		.catch(error => {
			// Xử lý lỗi nếu có
			console.error('There was a problem with your fetch operation:', error);
		});
}


