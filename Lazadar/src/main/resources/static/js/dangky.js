       var drag = document.querySelector(".dangky1-3");
        var container = document.querySelector(".dangky1-1");
        let isDrag = false;
        let offsetX = 0;
        let lastX = 0;

        drag.addEventListener("mousedown", (evt) => {
            isDrag = true;
            offsetX = evt.clientX - drag.getBoundingClientRect().left;
            evt.preventDefault();
        });

        document.addEventListener("mousemove", (evt) => {
            if (isDrag) {
                const containerRect = container.getBoundingClientRect();
                const dragRect = drag.getBoundingClientRect();
                const x = evt.clientX - containerRect.left - offsetX;
                const max = containerRect.width - dragRect.width;

                if (x >= 0 && x <= max) {
                    lastX = x;
                    requestAnimationFrame(() => {
                        drag.style.left = x + "px";
                    });
                } else if (x < 0) {
                    lastX = 0;
                    requestAnimationFrame(() => {
                        drag.style.left = "0px";
                    });
                } else if (x > max) {
                     requestAnimationFrame(() => {
                            drag.style.left = max + "px";
                        });
                    
                   
                }
            
            }
        });

        const resetPosition = () => {
            const containerRect = container.getBoundingClientRect();
            const dragRect = drag.getBoundingClientRect();
            const max = containerRect.width - dragRect.width;
            var invalid = $("#iphone");
            if(invalid.val() == ""){
                requestAnimationFrame(() => {
                    drag.style.left = "0px";
                    invalid.addClass("invalid");
                    invalid.parent().find(".dangnhap1-6-2").text("Vui lòng không để trống ! ");
                });
     
            }else if (lastX < max || invalid.is(".invalid")) {
                requestAnimationFrame(() => {
                    drag.style.left = "0px";
                });
            }else{
                $(".dangky1-6").css("display","flex");
                $(".dangky1-5").css("display","none");
                setTimeout(function(){
                    $(".dangky").remove();
                    $(".dangky1-8").css("display","flex");
                //    $(".dangnhap1-5-3").addClass("addclick");
                  
                },2000);
            }
            isDrag = false;
        };
        document.addEventListener("mouseup", resetPosition);
    // document.addEventListener("mouseleave", resetPosition);
  //hàm số đếm
 
//   var seconds =0;
//   var countdownInterval = null;
   let chay = false;
      
        function startCountdown() {
            var date1 = new Date();
            var giay = date1.getSeconds();
            var giaykhoitao = giay + 30;
            date1.setSeconds(giaykhoitao);
            var X =  setInterval(function(){
                $(".dangnhap1-5-3").removeClass("addclick");
                var con1 = new Date();
                var tinhgiay = date1 - con1;
                 //cách tính giây
                 var seconds = Math.floor((tinhgiay % (1000 * 60)) / 1000);     
                 $(".dangnhap1-5-3").html("Gửi lại (" +seconds +")") ;
                 $(".dangnhap1-5-3").css("color","#757575");
                  if(tinhgiay <= 0){
                    clearInterval(X);
                    $(".dangnhap1-5-3").removeClass("disabled");
                    $(".dangnhap1-5-3").addClass("addclick");
                      $(".dangnhap1-5-3").html("Gửi mã");
                      $(".dangnhap1-5-3").css("color","");
                    }
            
            },1000);
         
    
            
        }
            

       


  //
  $(document).on("click",'.addclick',function(){
    if(!chay){
        $(this).addClass("disabled");
        startCountdown();
    }
  })
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();

//tạo ngày tháng năm sinh
for(var e=1; e <= 31; e++){
    
    if(e === day){
        $("#day").append('<option value="'+e+'"selected>'+e+'</option>');
    }else{
        $("#day").append('<option value="'+e+'">'+e+'</option>');
    }
    if(e<=12){
       if(e === month){
        $("#month").append('<option value="'+e+'" selected>Tháng'+e+'</option>');
       }else{
        $("#month").append('<option value="'+e+'">Tháng'+e+'</option>');
       }
    }

}
//tạo năm
for(var s =1905; s <= year;year--){
    $("#year").append('<option value="'+year+'">'+year+'</option>');
}
$("#month").click(function(){
   var value = $("#month").val();
     $("#month").attr("value",value);
   console.log(value);
});

function Valida(option){
    //Tạo 1 hàm chứa lỗi khí đi qua vòng lặp
    var selecterRule ={};

    //Tạo 1 hàm để thực hiện lỗi khi đi qua
    function Validation( inputElement,rules){
        var ErrorElement = inputElement.parentElement.querySelector(".dangnhap1-6-2");
        var erroMessge;
        var Rule = selecterRule[rules.selecter];
        var nam = $("#year").val();
        var date2 = new Date().getFullYear();

        //Dùng vòng lặp qua các rules
        //Nếu thấy lỗi vòng lặp lập tức duèng lại
        for(var x =0; x < Rule.length; x++){
            erroMessge = Rule[x](inputElement.value);
            if(erroMessge) break;
        }
        if(erroMessge){
            ErrorElement.innerText = erroMessge;
            inputElement.classList.add("invalid");
        }else{
            ErrorElement.innerText ="";
            inputElement.classList.remove("invalid");
           
        }
        if((date2 - nam) < 12){
            $(".error").html("Không đủ độ tuổi tham gia !");
        }else{
            $(".error").html("");
        }
    }

    var formElement = document.querySelector(option.form);
    if(formElement){
     
        $(".dangnhap1-8-1").click(function(e){
            e.preventDefault();
            var isForm = true;
             if($("#sms").val() == ""){

                    $(".dangky3-1").css("display","flex");
                    isForm = false;  
                    setTimeout(function(){
                        $(".dangky3-1").css("display","none");
                    },2500);
             }else{
                    // vòng lặp qua các rule
                    option.rule.forEach(function(rules){
                        var inputElement = formElement.querySelector(rules.selecter);
                        var Vali = Validation(inputElement, rules);
                        if(Vali){
                            isForm = false;
                        }

                    });
                
            }
            if(isForm){
                //Trường hợp Submit js
                if( typeof option.onSubmit === 'function'){
                    var giatriInput = formElement.querySelectorAll('[name]');
                    
                    var FormValid = Array.from(giatriInput).reduce(function(values,input){
                        return(giatriInput=input.value) && values;
                    }, {});
                    console.log(FormValid);  
                    option.onSubmit(FormValid);
                    formElement.submit();
                }
                //Trường hợp mặc định
               /* else{
                    formElement.submit();
                }*/
            }
        });
    }

   option.rule.forEach(function(rules){
     //Lưu lại các giá trị lỗi vào trong Mảng
     if(Array.isArray(selecterRule[rules.selecter])){
         selecterRule[rules.selecter].push(rules.test);
     }else{
         selecterRule[rules.selecter] =[rules.test];
     }  

    
    var inputElement = formElement.querySelector(rules.selecter);
    if(inputElement){
        inputElement.onblur = function(){
            Validation(inputElement,rules);
            if(inputElement.value == ""){
                inputElement.parentElement.querySelector(".dangnhap1-5-1").style.display = "none";
            }

        }
        inputElement.oninput = function(){
            Validation(inputElement,rules);
            inputElement.setAttribute("value",inputElement.value);
            inputElement.parentElement.querySelector(".dangnhap1-5-1").style.display = "block";
        
        }
    }

   })


}
Valida.isRequired =function(selecter,messge){
    return{
        selecter:selecter,
        test: function(value){
            return  value.trim()?undefined : messge || "Vui lòng không để trống !";
        }
    };
     
}
Valida.isPhone = function( selecter, messge){
    return{
        selecter:selecter,
        test: function(value){
            var isPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return isPhone.test(value) ? undefined : messge || "Số điện thoại không đúng!";
        }
    };
}
Valida.isminLength = function(selecter,min){
    return{
        selecter:selecter,
        test: function(value){
           return value.length >= min?undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}
Valida.isSms = function(selecter,max){
    return{
        selecter:selecter,
        test: function(value){
            return value.length === max?undefined :`Vui lòng nhập đúng ${max} kí tự`;
        }
    }
}

/// phần hiển thị của password
$(".dangnhap1-5-2").click(function() {
	$(this).toggleClass("_4");
	if ($(this).is("._4")) {
		$("#password").attr("type", "text");
	} else {
		$("#password").attr("type", "password");
	}
});
//phầng đang nhập khi nhấn vào input
$(".dangnhap1-5-1").click(function() {
	$(this).parent().find(".dangnhap1-6-3").attr("value", "");
	$(this).parent().find(".dangnhap1-6-3").val("");
    $(this).parent().find(".dangnhap1-6-3").focus();
	$(this).css("display", "none");
});





