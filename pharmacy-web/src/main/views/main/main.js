$(function() {
	$('#medManage').click(function(){
		window.location.href="../../../medicine/views/med-query/med-query.html";
	});
	
	$('#categonyManage').click(function(){
		window.location.href="../../../category/views/category-list/list.html";
	});
	$('#sellMedicine').click(function(){
		window.location.href="../../../sell/views/sell/list.html";
	});
	$('#sellManage').click(function(){
		window.location.href="../../../sell/views/sell-details/sell-details.html";
	});
	$('#order').click(function(){
		window.location.href="../../../order/views/order/order.html";
	});
	$('#systemSetting').click(function(){
		window.location.href="../../../setting/views/userManager.html";
	});
	$('#quit').click(function(){
		window.location.href="../login/login.html";
	});
	
});