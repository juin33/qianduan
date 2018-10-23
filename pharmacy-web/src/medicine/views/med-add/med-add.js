$(function() {
	var $addMedicine;
	$addMedicine = $('#addMedicine');
	var medNo = getUrlParameter("medNo");
	var medId = null;
	console.log(medNo);
	if(medNo) {
		$.ajax({
			type: "get",
			dataType: 'json',
			url: "http://localhost:8080/PharmacyManage/api/medicine/getByMedNo" + "/" + medNo,
			success: function(result) {
								console.log(result.body);
				medicine = result.body;
				document.getElementById("id").value = medicine.id;
				document.getElementById("name").value = medicine.name;
				document.getElementById("description").value = medicine.description;
				document.getElementById("factoryAdd").value = medicine.factoryAdd;
				document.getElementById("price").value = medicine.price;
				document.getElementById('num').innerHTML = "药品现在库存: " + medicine.medCount;
				medId = medicine.id;
			}
		});
	}
	//init data
	init();

	function init() {
		initData();
	}

	function initData() {
		$.ajax({
			type: "get",
			url: "http://localhost:9080/PharmacyManage/api/category/getCategoryList",
			success: function(result) {
				var myArray = new Array();
				myArray = result;
				//				console.log(myArray);
				renderSelectOptions($('#category'), myArray, {
					clear: true,
					textKey: 'name',
					valueKey: 'id'
				});
			}
		});
	}

	function renderSelectOptions(select, list, params) {
		if(!(select instanceof jQuery)) {
			select = $(select);
		}
		params = $.extend({
			clear: true,
			textKey: 'text',
			valueKey: 'value'
		}, params);
		if(params.clear == true) {
			select.empty();
		}
		for(var i = 0; i < list.length; i++) {
			var data = list[i];
			var text = get(data, params.textKey);
			var value = get(data, params.valueKey);
			select.append('<option value="' + value + '">' + text + '</option>>');
		}
	}

	function get(obj, key) {
		var keys = key.split('.');
		var result = obj;
		for(var i = 0; i < keys.length; i++) {
			if(result) {
				result = result[keys[i]];
			}
		}
		return result;

	}
	$addMedicine.submit(function() {
		var data = $addMedicine.serializeObject();
		if(medId) {
			console.log(medId);
			$.ajax({
				type: "put",
				data: data,
				dataType: 'json',
				url: "http://localhost:9080/PharmacyManage/api/medicine/updateMedicine",
				success: function(result) {
					if(!result.header.success) {
						alert(result.header.message);
						return;
					}
					window.location.href = "../med-query/med-query.html";
				}
			});
		} else {
			$.ajax({
				type: "post",
				data: data,
				dataType: 'json',
				url: "http://localhost:9080/PharmacyManage/api/medicine/addMedicine",
				success: function(result) {
					console.log(result);
					if(!result.header.success) {
						alert(result.header.message);
						return;
					}
					window.location.href = "../med-query/med-query.html";
				}
			});
		}
	});
	
	$("#cancer").click(function() {
		window.location.href = "../med-query/med-query.html";
	});

	function getUrlParameter(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

});