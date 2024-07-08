function sotien() {
	var tien = $('.giohang-shop2-4').html().split(" ")
	for (var i = 0; i < sotien.length; i++) {
		var gia = sotien[i].querySelector('._A4-4-8 span').innerHTML;
		var soluong = sotien[i].querySelector('._A4-4-9').value;
		var tong = gia * parseInt(soluong);
		var doitien = tong.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',').toString();
		sotien[i].querySelector('._A5-1').innerHTML = '₫' + doitien;
	}

}
let idsp;
let slsp;

//khi nhấn tăng giảm số lượng
$(document).on('click', '.tru', function() {

	var inputValue = parseInt($(this).siblings('._A4-4-9').val());
	if (parseInt(inputValue) >= 2) {
		$(this).siblings('._A4-4-9').val(inputValue - 1);


	}
	if (parseInt(inputValue) == 2) {
		$(this).addClass("disables");
	}
	let checkdisables = $(this).siblings('.cong').is('.disables');
	if (checkdisables) {
		$(this).siblings('.cong').removeClass('disables');
	}
	load();
	idsp = parseFloat($(this).parents('.giohang-shop2-2').find('.checkbox').attr('data-idsp'));
	slsp = parseInt($(this).siblings('._A4-4-9').val());
	updateNumber(slsp, idsp);
	if ($(this).parents('.giohang-shop2-2').find('.giohang1-5').is('.giohang1-5_chekbox') == true) {
		tonggiatien();
	}
});
$(document).on('click', '.cong', function() {
	var inputValue = parseInt($(this).siblings('._A4-4-9').val());
	let max = parseInt($(this).siblings('._A4-4-9').attr("max"));
	if (inputValue >= max) {
		$(this).addClass("disables");
	} else
	//  if( parseInt(inputValue)>=1)
	{
		$(this).siblings('._A4-4-9').val(inputValue + 1);
		$(this).siblings('.tru').removeClass("disables");

	}
	load();
	idsp = parseFloat($(this).parents('.giohang-shop2-2').find('.checkbox').attr('data-idsp'));
	slsp = parseInt($(this).siblings('._A4-4-9').val());
	updateNumber(slsp, idsp);
	if ($(this).parents('.giohang-shop2-2').find('.giohang1-5').is('.giohang1-5_chekbox') == true) {
		tonggiatien();
	}

});
$(document).on('change', '._A4-4-9', function() {
	var value = parseInt(this.value);
	let min = parseInt(this.getAttribute("min"));
	let max = parseInt(this.getAttribute("max"));

	$(this).attr("value", value);
	if (value <= 1) {

		$(this).siblings('.tru').addClass("disables");
	} else {
		$(this).siblings('.tru').removeClass("disables");
	}
	if (value <= 0) {
		$('.error').addClass("loi");
		$('.error1-4').text("Sorry");
		$('.error1-5').text("Vui lòng nhập đúng số lượng");
		setTimeout(function() {
			$('.error').removeClass("loi");
		}, 4000);
		return $(this).val(min);
	}
	if (value >= 10) {
		$('.error').addClass("loi");
		$('.error1-4').text("Sorry");
		$('.error1-5').text("Vui lòng nhập đúng số lượng");
		setTimeout(function() {
			$('.error').removeClass("loi");
		}, 4000);
		return $(this).val(max);
	}
	load();
	idsp = parseFloat($(this).parents('.giohang-shop2-2').find('.checkbox').attr('data-idsp'));
	slsp = parseInt($(this).siblings('._A4-4-9').val());
	updateNumber(slsp, idsp);
	if ($(this).parents('.giohang-shop2-2').find('.giohang1-5').is('.giohang1-5_chekbox') == true) {
		tonggiatien();
	}


});

//KHi tính số tiền dự trên sự checkbox của các input
function tonggiatien() {
	var tongsp = 0;
	let tongsoluong = 0;
	if ($('.giohang1-5').is(".giohang1-5_chekbox") == true) {
		$('.thanhtoan1-2-4-1').text('₫ 76,400');
		$(".giohang-shop2-2 .giohang1-5_chekbox").each(function() {
			var tien = $(this).siblings('.giohang-shop2-3').find('.giohang-shop2-4').html().split(" ");
			var sotien = tien[1].replace(/,/g, "");
			console.log(sotien);
			var soluong = $(this).siblings(".tong1q").find('._A4-4-9').val();
			let tongtien = sotien * soluong;
			tongsoluong = tongsoluong + parseInt(soluong);
			tongsp = tongsp + parseInt(tongtien);
			var doitien = tongsp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			let thanhtoan = $('.thanhtoan1-2-4-1').text().split(' ');
			let tongthanhtoan = parseInt(thanhtoan[1].replace(/,/g, "")) + tongsp;

			console.log(doitien);
			$('.giohang1-5-1').text('Chọn tất cả (' + tongsoluong + ' Sản phẩm)');
			$('.thanhtoan1-2-3').text('Tạm tính (' + tongsoluong + ' sản phẩm)');
			$('.thanhtoan1-2-4').text('₫ ' + doitien);
			$('.tongthanhtoan1-2').text('₫ ' + tongthanhtoan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
			$('.tongthanhtoan1').text('XÁC NHẬN GIỎ HÀNG(' + tongsoluong + ')');
			$('.thanhtoan1-2-4-1').text("₫ 74,600");

		});
	} else {
		$('.giohang1-5-1').text('Chọn tất cả (0 Sản phẩm)');
		$('.thanhtoan1-2-3').text('Tính tạm (0 sản phẩm)');
		$('.thanhtoan1-2-4').text('');
		$('.tongthanhtoan1-2').text('');
		$('.thanhtoan1-2-4-1').text("");
		$('.tongthanhtoan1').text('XÁC NHẬN GIỎ HÀNG(0)');
	}

}

// tông số sản phẩm
$(".tong4").html('&ensp;(' + $(".A3-3").length + ')');

$(document).on('click', ".checkbox:first", function() {

	var ischeck = $(this).parent().is('.giohang1-5_chekbox');
	console.log($(this).parent());
	if (!ischeck) {
		$('.giohang1-5').addClass("giohang1-5_chekbox");
		load();
		tonggiatien();
	} else {
		$('.giohang1-5').removeClass("giohang1-5_chekbox");
		load();
		tonggiatien();
	}

});



$(document).on("click", '.giohang1-2 .checke', function() {
	var ischecked = $(this).parent().is('.giohang1-5_chekbox');
	if (!ischecked) {
		$(this).parents(".giohang-shop").find('.giohang1-5').addClass("giohang1-5_chekbox");

	} else {
		$(this).parents(".giohang-shop").find('.giohang1-5').removeClass("giohang1-5_chekbox");

	}
	//kiểm tra tổng thể
	if ($('.giohang1-2 > .giohang1-5_chekbox').length === $('.giohang-shop').length) {
		$('.giohang1-5').addClass('giohang1-5_chekbox');


	} else if ($('.giohang1-2 > .giohang1-5_chekbox').length === 0) {

		$('.giohang1-5').removeClass('giohang1-5_chekbox');
	} else {
		$('.giohang1-5:first').removeClass('giohang1-5_chekbox');


	}
	load();
	tonggiatien();
});
$(document).on('click', '.giohang-shop2-2 .checkbox', function() {
	var ischecked = $(this).parent('.giohang1-5').is('.giohang1-5_chekbox');
	if (!ischecked) {
		$(this).parent().toggleClass("giohang1-5_chekbox");

	} else {
		$(this).parent().removeClass("giohang1-5_chekbox");

	}
	// //    kiểm tra độ dài của A2-7 nơi chứa các sản phẩm đó
	if ($(this).parents(".giohang-shop").find('.giohang-shop2 .giohang1-5_chekbox').length == $(this).parents(".giohang-shop").find('.giohang-shop2').length) {
		$(this).parents(".giohang-shop").find('.giohang1-2 .giohang1-5').addClass("giohang1-5_chekbox");
		// $('.tong4-1').html('&ensp;('+$('.A3-3').length+')');

	}
	else {
		$(this).parents(".giohang-shop").find('.giohang1-2 .giohang1-5').removeClass("giohang1-5_chekbox");
		$('.tong4-1').html('&ensp;(' + $('.A3-3 .giohang1-5_chekbox').length + ')');

	}
	//NẾu các shope đk checkbox bằn số lượn shope thì tất cả đk checkbox
	if ($('.giohang1-2 .giohang1-5_chekbox').length == $('.giohang-shop').length) {
		$('.giohang1-5').addClass('giohang1-5_chekbox');
	}
	else {
		$('.giohang1-5:first').removeClass('giohang1-5_chekbox');
		// $('.giohang1-5:last').removeClass('giohang1-5_chekbox');
	}
	load();
	tonggiatien();
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

let remove = '<div class="remove">' +
	'<div class="remove1">' +
	'<div class="remove1-1 fadeInDown">' +
	'<span class="remove1-2">Remove from cart</span>' +
	'<div class="remove1-3">Item(s) will be removed from order</div>' +
	'<div class="remove1-4">' +
	'<button class="remove1-4-1 cancel">CANCEL</button>' +
	'<button class="remove1-4-1 delete">REMOVE</button>' +
	'</div>' +
	'<span class="remove1-5">' +
	'<span class="fa-thin fa-xmark"></span>' +
	'</span>' +
	'</div>' +
	'</div>' +
	'</div>';

$(document).on('click', '.cancel,.remove1-5', function() {
	$('.remove1-1').removeClass('fadeInDown');
	$('.remove1-1').addClass('fadeInUp');
	setTimeout(function() {
		$('.remove').remove();
	}, 500);
});
//Xóa đơn hàng đi
let aray = new Array();
$(document).on('click', '.giohang-shop2-6', function() {
	aray = [];
	let ordernumber = $(this).parents('.giohang-shop2-2').find('.checkbox').attr('data-idsp');
	aray.push(ordernumber);

	$('.tieude').after(remove);

});
//Xác nhận lại để xóa từng cái
$(document).on('click', '.delete', function() {
	deleteOrder();
})
//Xóa theo yêu cầu nhiều 
$('.giohang1-2-1').click(function() {
	aray = [];
	if ($(".giohang-shop2-2 .giohang1-5_chekbox").length == 0) {
		$('.error1-5').text('Vui lòng chọn (các) mục');
		$('.error').css('display', "flex");
		setTimeout(function() {
			$('.error').attr("style", "");
		}, 1000);
	} else {
		$(".giohang-shop2-2 .giohang1-5_chekbox").each(function(index) {
			aray.push($(this).find(".checkbox").attr('data-order'))
			deleteOrder();
		});
	}

});


//xử lý chung xóa 
function deleteOrder() {
	$.ajax({
		url: `http://localhost:8484/api/cat/delete`,
		type: "delete",
		contentType: "application/json",
		data: JSON.stringify(aray),
		dataType: 'json',
		async: false,
		success: function(data) {
			$('.remove1-1').removeClass('fadeInDown');
			$('.remove1-1').addClass('fadeInUp');
			setTimeout(function() {
				$('.remove').remove();
			}, 500);
		},
		error: function(error) {
			console.log(error);
		}
	});
	setTimeout(function() {
		window.location.reload();
	}, 3000);
}

//Đẩy sang bên thanh toán theo đơn chỉ định
$(document).on('click', '.tongthanhtoan1', function() {
	aray = [];
	const loi = `<div class="loi1-2">
    <div class="loi1">
        <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
        <span class="loi1-1">
            Vui lòng chọn ít nhất (1) sản phẩm
        </span>
    </div>
 </div>`;

	if ($(".giohang-shop2-2 .giohang1-5_chekbox").length == 0) {
		$('.tieude').after(loi);
		setTimeout(function() {
			$('.loi1-2').remove();
		}, 3000);
	} else {
		$(".giohang-shop2-2 .giohang1-5_chekbox").each(function(index) {

			aray.push($(this).find(".checkbox").attr('data-idsp'))


		});
		const stringarray = aray.join(",");
		window.location.href = "http://localhost:8484/checkout?idsp=" + stringarray;
		
	}
});

//Update số lượng mua hàng lại 
function updateNumber(sl, id) {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	fetch("http://localhost:8484/api/cat/update?sl=" + sl + "&idsp=" + id,options)
		.then(response => {
			// Xử lý phản hồi từ máy chủ
			if (!response.ok) {
				throw new Error('Báo lỗi');
			}
			// Trả về một giá trị khác thay vì JSON
			return 'successful';
		})
		.then(data => {
			console.log(data);
			if (data == "successful") {
			}
		})
		.catch()(error => {
			// Xử lý lỗi nếu có
			console.error('Lỗi:', error);
		});
}

