$(document).on("click",".img-wrap-selected ,.noidung1-5-5-1",function(){
    console.log($(".muahang1-7").parent().is($(this)));
       if($(".muahang1-7").parent().is($(this))){
        $(this).find('.muahang1-7').remove();
        $(this).attr("class","noidung1-5-5-1");
      $(this).parent().siblings('.muahang1-6-7-5').text('');

   }else{
	   //lấy tên màu
	   $(this).parent().siblings('.muahang1-6-7-5').text($(this).find('.noidung1-5-5-2').attr('alt'));
    $(this).siblings('.img-wrap-selected').attr('class',"noidung1-5-5-1");
    $(this).attr('class',"img-wrap-selected");
    $(this).siblings().children(".muahang1-7").remove();
    // $(this).addClass("_7-3").siblings().removeClass("_7-3");
    $(this).append('<div class="muahang1-7"><span class="dau"></span></div>');
   }
    
   
});


$(".noidung1-5-5-1-1").mouseenter(function(){
    var img = $(this).find("img").attr("src");
    $(this).addClass("_7-3").siblings().removeClass("_7-3");
    $(this).parents(".noidung1-5-3").find(".noidung1-5-4 img").attr("src",img);
});
//số lượng
$(document).on("click",".img-wrap-name-selected,.muahang1-7-2",function(){
    console.log($(".muahang1-7").parent().is($(this)));
       if($(".muahang1-7").parent().is($(this))){
        $(this).find('.muahang1-7').remove();
        $(this).attr("class","muahang1-7-2");
        $(this).parent().siblings('.muahang1-6-7-5').text('');

   }else{
    $(this).parent().siblings('.muahang1-6-7-5').text($(this).find('span').text());
    $(this).siblings('.img-wrap-name-selected').attr('class',"muahang1-7-2");
    $(this).attr('class',"img-wrap-name-selected");
    $(this).siblings().children(".muahang1-7").remove();
    $(this).append('<div class="muahang1-7"><span class="dau"></span></div>');
   }
    
   
});

//khi nhấn tăng giảm số lượng
$('.tru').click(function(){
   
    var inputValue = $('._A4-4-9').val();
    if(parseInt(inputValue)>=2){
        $(this).siblings('._A4-4-9').val(inputValue - 1);
 
        
    }
    if(parseInt(inputValue) ==2){
        $(this).addClass("disables");
    }
   let checkdisables = $(this).siblings('.cong').is('.disables');
   if(checkdisables){
    $(this).siblings('.cong').removeClass('disables');
   }
    // load()
});
$('.cong').click(function(){
    var inputValue = parseInt($(this).siblings('._A4-4-9').val());
    let max = parseInt( $(this).siblings('._A4-4-9').attr("max"));
    if(inputValue>=max){
        $(this).addClass("disables");
    }else
     {
        $(this).siblings('._A4-4-9').val(inputValue +1);
        $(this).siblings('.tru').removeClass("disables");
      
    }
    // load()
});
$('._A4-4-9').change(function(){
    var value = parseInt(this.value);
    let min = parseInt(this.getAttribute("min"));
    let max = parseInt( this.getAttribute("max"));

    $(this).attr("value",value);
    if(value <=1){

        $(this).siblings('.tru').addClass("disables");  
    }else{
        $(this).siblings('.tru').removeClass("disables");
    }
    if(value <= 0){
        $('.error').addClass("loi");
        $('.error1-4').text("Sorry");
        $('.error1-5').text("Vui lòng nhập đúng số lượng");
        setTimeout(function(){
            $('.error').removeClass("loi");
        },4000);
        return $(this).val(min);
    }
    if(value >= 10){
        $('.error').addClass("loi");
        $('.error1-4').text("Sorry");
        $('.error1-5').text("Vui lòng nhập đúng số lượng");
        setTimeout(function(){
            $('.error').removeClass("loi");
        },4000);
        return $(this).val(max);
    }
});
function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
$(".noidung1-5-4").mouseenter(function(){
    $(this).parent(".noidung1-5-3").after('<div id="myresult" class="img-zoom-result"></div>');
    // $(this).before('<div class="img-zoom-lens"></div>')
    imageZoom("zoom", "myresult");
});
 $('.noidung1-5-4').mouseleave(function(){
    $('.img-zoom-result').remove();
    $('.img-zoom-lens').remove();
 }); 

//Nhấn nút next hoặc prext


$('.muahang1-5').click(function(){
// let dodai = $('.noidung1-5-5-1-1').length;
$('.noidung1-5-5-6').attr("style","opacity: 1; width: 1102px; transform: translate3d(-264px, 0px, 0px);")
$(this).addClass('disabled');
$('.muahang1-4').removeClass('disabled');
});
$('.muahang1-4').click(function(){
    $('.noidung1-5-5-6').attr("style","opacity: 1; width: 1102px; transform: translate3d(0px, 0px, 0px);")
    $(this).addClass('disabled');
    $('.muahang1-5').removeClass('disabled');

});

$('.themvaogio').click(function(){
	let userid = parseFloat($(".account").attr("data-userid"));
if(!isNaN(userid)){
	let img = $('#zoom').attr('src');
	let tensanpham = $('.muahang1-6-1-1').text();
	let phanloai = $('.muahang1-6-7-5').eq(0).text() + ", " + $('.muahang1-6-7-5').eq(1).text();
	let soluong = parseInt($('._A4-4-9').val());
	let stien = $('.noidung1-5-6-3').text().split('₫');
	const tien = stien[0];
	let tenshope = $('.seller-name__detail-name').text();
	let userid = parseFloat($(".account").attr("data-userid"));
	let productid = parseFloat($(".muahang1-6-1-1").attr("data-product-id"));
	let data = {
		"image": img,
		"phanloai": phanloai,
		"sl": soluong,
		"shope": tenshope,
		"sotien": tien,
		"name": tensanpham,
		"userid": userid,
		"productid": productid
	}

	$.ajax({
        url:`http://localhost:8484/api/cat/save`,
        type: "post",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'json',
        success:function(rep){
            console.log(rep);
        },
        error:function(err){
            console.log(err);
        }

    })

  }else{
	
    var redirectUrl = 'http://localhost:8484/login?next=' + window.location.href;
    window.location.href = redirectUrl;

  }
  load();
});
function load(){
    let text ='<div class="load">'+
    '<div class="text2">'+
       '<div class="text1"">'+
            '<span class="text">ZinTu</span>'+
            '<div class="spinner-3">'+
            '</div>'+
        '</div>'+
    '</div>'+
   '</div>';
   $('.tieude').after(text);
   $('.load').css({
    "height":window.innerHeight+"px"
    });
    setTimeout(function(){
        $(".load").remove();
        location.reload();
    },2000);
}