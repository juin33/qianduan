$(function() {
	var $sellMedicine;
	var medicine;
	var medicineId = getUrlParameter("id");
	$sellMedicine = $('#sellMedicine');
	
	if(medicineId) {
		$.ajax({
			type: "get",
			dataType: 'json',
			url: "http://localhost:9080/PharmacyManage/api/medicine/getMedicine" + "/" + medicineId,
			success: function(result) {
				medicine = result.body;
				document.getElementById("id").value=medicine.id;
				document.getElementById("sellName").value=medicine.name;
				document.getElementById("sellPrice").value=medicine.price;
				document.getElementById("sellCount").value=1;
			}
		});
	}


	$sellMedicine.submit(function() {
		var data = $sellMedicine.serializeObject();
		//		data.remember = true;
		$.ajax({
			type:"post",
			data : data,
			dataType:'json',
			url:"http://localhost:9080/PharmacyManage/api/sell/sellMedicine" + "/" + medicineId,
			success: function(result) {
				console.log(result);
				if(!result.header.success) {
					alert(result.header.message);
					return;
				}
				window.location.href = "../sell/list.html";
			}
		});
	});
	$("#cancer").click(function() {
		window.location.href = "../sell/list.html";
	});
	function getUrlParameter(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

});