$(function() {
	//defiend
	var $orderForm;
	//init views
	$orderForm = $('#orderForm');

	//init datas

	//init events
	$orderForm.submit(function() {
		 	var medNo =document.getElementById("medNo").value;  
			window.location.href = "../../../medicine/views/med-add/med-add.html?medNo="+medNo;
});
$("#cancer").click(function() {
window.location.href = "../../../main/views/main/main.html";
});

});