$(".tieude1-8-2").mouseenter(function(){
    $(this).addClass("tieude1-8-3");
    $(this).siblings(".tieude2-3").css("display","flex");
});
$(".tieude1-8-1").mouseleave(function(){
    $(".tieude1-8-2").removeClass("tieude1-8-3");
    $(".tieude2-3").hide();
});
var i=0;
var slide = $(".noidung1-2-2").length;
$(".noidung1-2-7").click(function(){
    if( i < slide){

        i++;
        if(i < slide){
            $(".noidung1-2-1").attr("style","width: 400%;transition: all 500ms ease 0s;transform: translateX("+(-i*25)+"%);");
            $(".dot2").removeClass("dot3");
            $(".dot2:nth-child("+(i+1)+")").addClass("dot3");       

    }else{
        i = parseInt(slide-1);
        return false;
     }
  }

    
});

$(".noidung1-2-6").click(function(){
    if(i <= 0){
        return false;
    }else{
        i--;
        if(i>=0){
            $(".noidung1-2-1").attr("style","width: 400%;transition: all 500ms ease 0s;transform: translateX("+(-i*25)+"%);");
            $(".dot2").removeClass("dot3");
            $(".dot2:nth-child("+(i+1)+")").addClass("dot3");       
        }
    
     }

});

$(".dot2").click(function(){
  var dot = $(this).index();
  $(".noidung1-2-1").attr("style","width: 400%;transition: all 500ms ease 0s;transform: translateX("+(-dot*25)+"%);");
  $(".dot2").removeClass("dot3");
  $(this).addClass("dot3");

  console.log(i);
});

var chon = $(".noidung1-4-4");
for( var j =0 ; j<chon.length; j++){
    var check = chon[j].querySelectorAll(".noidung1-4-4-3").length;
    if(check > 8){
        chon[j].querySelector(".noidung1-4-4-5").style.display ="block";
    }

}
$(".noidung1-4-4-5").click(function(){
    $(this).siblings(".noidung1-4-4-5-1").show();
    $(this).hide();
});
var F = new Array();
var Y = new Array();

$(".noidung1-4-5-0:last").click(function(){
    $(".noidung1-4-5-0").addClass("All");
    $(this).removeClass("All");
    var A = document.querySelectorAll(".noidung1-5-1");
      for(var e =0; e < A.length; e++){
          var B = A[e].querySelector(".tieude4-5-8").innerHTML;
          var C = A[e].querySelector(".noidung1-5-3").innerHTML;
          var D = A[e].querySelector(".noidung1-5-7-8").innerHTML;
          var G = A[e].querySelector(".noidung1-5-6-2").innerHTML;
       var E = new Array(C,G,D,B);
       F.push(E);
       var J = A[e].innerHTML;
       var P = new Array(J);
       Y.push(P);
       sessionStorage.setItem("noidung",JSON.stringify(Y));
          F.map((value,index)=>{
           var text ='<div class="noidung1-5-7-1">'+
                        '<a href="#" class="noidung1-5-7-2">'+
                                '<div class="noidung1-5-7-3">'+value[0]+'</div>'+
                                '<div class="noidung1-5-7-4">'+
                                  '<div class="noidung1-5-7-5">'+value[1]+'</div>'
                                  +value[3]+
                                '</div>'+
                                '<div class="noidung1-5-7">'+value[2]+'</div>'+
                        '</a>'+
                    '</div>';
           if(index ==0){
            document.querySelector(".noidung1-5").innerHTML = text;           
        }
          if(index >= 1){
            document.querySelector(".noidung1-5").innerHTML += text;           
        }
        });
      }
  });

  $(".noidung1-4-5-0:first").click(function(){
    $(".noidung1-4-5-0").addClass("All");
    $(this).removeClass("All");
     var U = sessionStorage.getItem("noidung");
     var O = JSON.parse(U);
     O.map((value,index)=>{
         var tet = '<div class="noidung1-5-1">'+value+'</div>';
         if(index ==0){
            document.querySelector(".noidung1-5").innerHTML = tet;           
        }
          if(index >= 1){
            document.querySelector(".noidung1-5").innerHTML += tet;           
        }
     })
  });


  $(document).on("mouseenter",".noidung1-5-5-1",function(){
      var img = $(this).find("img").attr("src");
      $(this).parents(".noidung1-5-3").find(".noidung1-5-4 img").attr("src",img);
  });


  $(".noidung1-5-4").click(function(){
      var anh = $(this).find("img").attr("src");
      var ndanh = $(this).siblings(".noidung1-5-5").html();
      var mail = $(this).parents(".noidung1-5-2").find(".noidung1-5-6-5").attr("src");
      var nd  = $(this).parents(".noidung1-5-2").find(".noidung1-5-6-2").text();
      var gia = $(this).parents(".noidung1-5-2").find(".noidung1-5-7-8").html();
      var danhgia =$(this).parents(".noidung1-5-2").find(".tieude4-5-8-3").html();
      var noidung = new Array(anh,ndanh,mail,nd,gia,danhgia);
      Y.push(noidung);
      sessionStorage.setItem("muahang",JSON.stringify(Y));

  });