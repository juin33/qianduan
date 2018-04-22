$(function(){
	//defiend
	var $formLogin;
	//init views
	$formLogin = $('#formLogin');
	//init datas
	
	//init events
	$formLogin.submit(function(){
		
		var data = $formLogin.serializeObject();
//		var data=JSON.stringify({"name": "admin","password":"123456"});
		
//		data.remember = true;
		$.ajax({
			type:"post",
			data : JSON.stringify(data),
			contentType:"application/json", 
			url:"http://localhost:9080/dr/login",
			success:function(result){
				console.log(result.header.success);
				if(!result.header.success){
					alert(result.header.message);
					return;
				}
				window.location.href = '../main/main.html';
			}
		});
	});
	//state functions
	$('#btnRegister').click(function () {
        window.location.href = '../register/register.html';
    });
});
