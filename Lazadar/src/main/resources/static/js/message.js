var stompClient = null;
      var socket = new SockJS('/ws');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, onConnected, onError);
let userid = parseFloat($(".account").attr("data-userid"));
//tạo hàm cho việc đã kết nối rồi
function onConnected() {
	stompClient.subscribe("/groud/public", onMessage);
	stompClient.subscribe("/user/" +userid+ "/usermessage", onTraMessage);
	//Hàm nhận đã đăg nhập
	userJoin();
}

//HÀm đã đăng nhập
function userJoin() {
	console.log(sender1);
	var chat = {
		sender: userid,
		type: "thongbao",
		message:""
	};
	stompClient.send("/app/message", {}, JSON.stringify(chat));
}
//xử lý khi lỗi
function onError(event) {
	console.log(event);
}
