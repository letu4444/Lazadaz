$(document).on("input", '.mod-input-name input', function() {
	check($(this));
	icon();
})
$(document).on('focusout', '.mod-input-name input', function() {
	check($(this));
	icon();
})
function check(selestor) {
	let message = "";
	$(selestor).siblings('.mod-input-close-icon').addClass('icon');
	$(selestor).attr("value", $(selestor).val().trim());
	if ($(selestor).val().trim() == "") {
		$(selestor).siblings('.mod-input-close-icon').removeClass('icon');
		message = "Vui lòng nhập trường này!";
		$(selestor).parent().addClass('error1');
	} else if ($(selestor).attr("type") == "tel") {
		var isPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
		if (isPhone.test($(selestor).val()) == false) {
			message = "Số điện thoại không đúng!";
			$(selestor).parent().addClass('error1');

		} else {
			$(selestor).parent().removeClass('error1');

		}
	} else if ($(selestor).val().length < 2) {
		if (2 <= $(selestor).val().length && $(selestor).val().length <= 20) {
		} else {
			message = `Vui lònng nhập tối thiểu 2 - 20 kí tự`;
		}
		$(selestor).parent().addClass('error1');
	} else {
		$(selestor).parent().removeClass('error1');
	}
	$(selestor).siblings('.error').text(message);

}
$(document).on('click', '.mod-address-form-btn-save', function(e) {

	var isForm = true;
	for (let index = 0; index < $('.mod-input-name input').length; index++) {
		console.log($('.mod-input-name input')[index]);
		check($('.mod-input-name input')[index]);

	}
	if ($('.mod-input-name').is('.error1') == true) {
		isForm = false;
		e.preventDefault();
	}
	if (isForm) {
		var formElement = document.querySelector('.update_user');
		var enbarInput = formElement.querySelectorAll('[name]');
		var formValid = Array.from(enbarInput).reduce(function(values, input) {
					if(input.name =="iphone"){
                            values[input.name] = parseInt(input.value);
                        }else{
                            values[input.name] = input.value;
                        }
						return values;
		}, {});
		//thêm userid vào trong đối tượng đó
		formValid.userid = parseFloat($(".account").attr("data-userid"));
		fetch('http://localhost:8484/api/addres/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValid) // Chuyển đổi đối tượng thành chuỗi JSON
		})
			.then(req => {
				if (!req.ok) {
					throw new Error('Network response was not ok');
				}
				return "successful";
			})
			.then(data => {
				console.log(data);
				if (data == "successful") {
					// Load lại trang hiện tại
					location.reload();
				}
			})
			.catch(error => {
				// Xử lý lỗi nếu có
				console.error('There was a problem with your fetch operation:', error);
			});
		console.log(formValid);
	}

});
function icon() {
	$('.icon').click(function() {
		$(this).siblings("input").val('');
		check($(this).siblings("input"));
		$(this).removeClass();

	});
};

