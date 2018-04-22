$(function() {
	//defiend
	var $editPswForm;
	var user;
	var userId = getUrlParameter("id");
	//init views
	$editPswForm = $('#editPswForm');
	//init datas
	if(userId) {
		$.ajax({
			type: "get",
			dataType: 'json',
			url: "http://localhost:9080/PharmacyManage/api/user/get" + "/" + userId,
			success: function(result) {
				user = result.body;
				document.getElementById("id").value=user.id;
				document.getElementById("username").value=user.username;
			}
		});
	}

	//init events
	$editPswForm.submit(function() {
		console.log($editPswForm);
		var data = $editPswForm.serializeObject();
		console.log(user);
		$.ajax({
			type: "put",
			data: data,
			dataType: 'json',
			url: "http://localhost:9080/PharmacyManage/api/user/update",
			success: function(result) {
				if(!result.header.success) {
					alert(result.header.message);
					return;
				}
				window.location.href ="../userManager.html";
			}
		});
	});
	$("#cancer").click(function() {
		window.location.href ="../userManager.html";
	});

	function getUrlParameter(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
});