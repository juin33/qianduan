$(function() {
	//defiend
	var $editCategoryForm;
	var category;
	var categoryId = getUrlParameter("id");
	//init views
	$editCategoryForm = $('#editCategoryForm');
	//init datas
	if(categoryId) {
		$.ajax({
			type: "get",
			dataType: 'json',
			url: "http://localhost:9080/PharmacyManage/api/category/getCategory" + "/" + categoryId,
			success: function(result) {
				category = result.body;
				document.getElementById("id").value=category.id;
				document.getElementById("name").value=category.name;
				document.getElementById("description").value=category.description;
			}
		});
	}

	//init events
	$editCategoryForm.submit(function() {
		console.log($editCategoryForm);
		var data = $editCategoryForm.serializeObject();
		console.log(category);
		$.ajax({
			type: "put",
			data: data,
			dataType: 'json',
			url: "http://localhost:9080/PharmacyManage/api/category/updateCategory",
			success: function(result) {
//				console.log(result);
				if(!result.header.success) {
					alert(result.header.message);
					return;
				}
				window.location.href = "../category-list/list.html";
			}
		});
	});
	$("#cancer").click(function() {
		window.location.href = "../category-list/list.html";
	});

	function getUrlParameter(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
});