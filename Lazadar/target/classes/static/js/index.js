$(".tieude2-4").mouseenter(function(){
    $(this).addClass("hover");
    $(this).siblings().removeClass("hover");
    var li = parseInt($(this).index()+1);
    $(".leve1_0"+li+"").css("display","flex");
    $(".leve1_0"+li+"").siblings(".tieude2-9").css("display","");
     $(".tieude2-7").removeClass("hover");

   
});
$(".tieude2-7").mouseenter(function(){
$(this).addClass("hover");
$(this).siblings().removeClass("hover");
});




var slideIndex =0;
showSlide();

function showSlide(){
    var i;
    var slide = document.querySelectorAll(".tieude2-1");
    for(i = 0; i < slide.length;i++){
        slide[i].style.display ="none";
    }
    var dot = document.querySelectorAll(".dot");
    slideIndex++;
    if(slideIndex >slide.length){
        slideIndex=1
    }
    for(i = 0; i < dot.length;i++){
        dot[i].classList.remove("active");
     }
    slide[slideIndex-1].style.display = "block";
    dot[slideIndex-1].classList.add("active");
    setTimeout(showSlide,1500);
}


  var img = document.querySelectorAll(".tieude3-7-2-1");
  for(var ie =0; ie < img.length; ie++){
      var anhnd = img[ie].alt;
      img[ie].parentElement.parentElement.querySelector(".tieude3-7-4").innerHTML += anhnd;
  }
var iea = document.querySelectorAll(".tieude4-3-5");
for(var ia = 0; ia < iea.length; ia++){
    var anh= iea[ia].querySelector(".tieude4-3-7").alt;
     iea[ia].nextElementSibling.innerHTML += anh;
}
var mailanh = document.querySelectorAll(".tieude4-4-5");
for(var is = 0; is < mailanh.length; is++){
    var anh1= mailanh[is].querySelector(".tieude4-4-8").alt;
    mailanh[is].nextElementSibling.nextElementSibling.innerHTML += anh1;
    mailanh[is].nextElementSibling.innerHTML += anh1;
}

