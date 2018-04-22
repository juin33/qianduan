$(function(){
	//defiend
	var $addCatrgory;
	//init views
	$addCatrgory = $('#addCatrgory');
	//init datas
	
	//init events
	$addCatrgory.submit(function(){
		
		var data = $addCatrgory.serializeObject();
//		data.remember = true;
		$.ajax({
			type:"post",
			data : data,
			dataType:'json',
			url:"http://localhost:9080/PharmacyManage/api/category/addCategory",
			success:function(result){
				console.log(result);
				if(!result.header.success){
					alert(result.header.message);
					return;
				}
				window.location.href="../category-list/list.html";
			}
		});
	});
	$("#cancer").click(function() {
		window.location.href ="../category-list/list.html";
	});
});
