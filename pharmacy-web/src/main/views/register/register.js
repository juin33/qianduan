$(function(){
	//defiend
	var $formRegister;
	//init views
	$formRegister = $('#formRegister');
	//init datas
	
	//init events
	$formRegister.submit(function(){
		
		var data = $formRegister.serializeObject();
//		data.remember = true;
		$.ajax({
			type:"post",
			data : data,
			dataType:'json',
			url:"http://localhost:9080/PharmacyManage/api/user/register",
			success:function(result){
				console.log(result);
				if(!result.header.success){
					alert(result.header.message);
					return;
				}
				window.location.href = '../main/main.html';
			}
		});
	});
	//state functions
});