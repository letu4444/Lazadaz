///delay khi nhập từ khóa cho đến khi ng dùng kh nhập nưax mới gửi đi
function debounce(func, delay) {
	let timeoutId;
	return function(...args) {
		const context = this;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}
let list=[];
function handleInput(event) {
	// Xử lý input tại đây
	console.log(event.target.value);
	//khi click chuột vào input thì phải thêm thẻ vào
	var encodedString = encodeURIComponent(event.target.value);
	 let cha = document.querySelector('.tieude1-5-1');
    let con = cha.querySelector('.search');
    console.log(con);
	if(!con){
        $('.tieude1-5-1').append(' <div class="search"></div>');
    }
	//Gửi dữ liệu đi để lấy data về 
	if(encodedString.length > 0){
	fetch(`http://localhost:8484/api/search?keyword=${encodedString}`)
  .then(response => response.json())
  .then(data => {
	//  $('.tieude1-5-1').append(' <div class="search"></div>');
	  list = data;
	   $('.search1').remove();
	   if(data != null){
		    searchList(event.target.value, list);
	   }
	 
    console.log(data); // Dữ liệu nhận được từ API
  })
  .catch(error => {
    console.error('Error:', error);
  });
	}

}

// Tạo một phiên bản debounce của hàm handleInput
const debouncedHandleInput = debounce(handleInput, 800);
document.querySelector('.tieude1-5-4').addEventListener('keyup', debouncedHandleInput);
const string = "noi-com-dien-i1780154152-s7990497925";
const a = string.split("-");
console.log(a.slice(-2));


//Khi foucs vào input
$('.tieude1-5-4').click(function(event){
 if($(this).val() != null){
    searchList($(this).val(), list);
 }else{
    $('.search').remove();
 }
});


//Tạo kí tự hoa khi tìm kiếm theo từ
function searchList(val, list) {
	var filter, txtValue;
//Lấy ra giá trị ng dùng gõ rồi so sánh với kết quả
	filter = val.toLowerCase();
	
	if (list.length) {
		$('.search').append('<div class="search1"></div>');
	}
	for (i = 0; i < list.length; i++) {
		txtValue = list[i].toLowerCase();
		// txtValue = a.textContent || a.innerText;

		// Tìm kiếm vị trí của searchTerm trong stringToSearch
		var index = txtValue.indexOf(filter);

		if (index !== -1) {

			// Tạo chuỗi mới với searchTerm được làm nổi bật
			var highlightedString = txtValue.substring(0, index) +
				"<span class='highlight'>" +
				txtValue.substring(index, index + filter.length) +
				"</span>" +
				txtValue.substring(index + filter.length);

			// Hiển thị kết quả trên giao diện
			$('.search1').append('<a href="http://localhost:8484/trangchu/tag?p='+txtValue+'" class="search1-1">' +
				'<div class="search1-2">' + highlightedString + '</div>' +
				'<img class="search1-3" src="https://lzd-img-global.slatic.net/us/media/39bc9a63526ff263735d426d1f8d928d-22-22.png" alt="">' +
				'</a>');
		} else {
			// Nếu không tìm thấy
			// document.getElementById("searchResult").innerHTML = "Không tìm thấy từ khóa.";
		}
	}
}


//xử lý khi click ra khỏi phần tử đó
var myElement = document.querySelector('.tieude1-5-1');
function handleClickOutside(event) {
    if (myElement && !myElement.contains(event.target)) {
        // Nếu click nằm ngoài 'myElement', ẩn nó đi
        let con =myElement.querySelector('.tieude1-5-4').value;
        if(con != null){
            $('.search1').remove();
        }else{
            $('.search').remove();
        }
    }
}

// Thêm event listener vào document
document.addEventListener('click', handleClickOutside);