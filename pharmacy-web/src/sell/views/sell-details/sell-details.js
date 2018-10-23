Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
$(function() {

	var row = null;
	var category = null;
	var $table;
	$table = $('#table');

	init();

	function init() {
		initData();
	}

	function initData() {
		$('#table').bootstrapTable({
			type: "get",
			url: "http://localhost:9080/PharmacyManage/api/sell/getSellDetailList",
			striped: true,
			pagination: true,
			pageSize: 10,
			pageNumber: 1,
			pageList: [10, 20, 50, 100, 200, 500],
			search: true,
			clickToSelect: true,
			queryParamsType: "undefined",
			queryParams: function queryParams(params) { //设置查询参数
				var param = {
					//这里是在ajax发送请求的时候设置一些参数 params有什么东西，自己看看源码就知道了
					pageNo: params.pageNumber,
					pageSize: params.pageSize
				};
				return param;
			},
			columns: [{
					field: "sellName",
					title: "药品名称",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "sellPrice",
					title: "售价",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "sellCount",
					title: "数量",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "sum",
					title: "金额",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "createTime",
					title: "销售时间",
					align: "center",
					valign: "middle",
					sortable: "true",
					formatter: function(value, row, index) {
						return new Date(value).Format('yyyy-MM-dd');
					}
				}
			],
			onPageChange: function(size, number) {}
		});
	}
	$('#viewByHistory').click(function() {
		initData();
	});

	$('#returnMain').click(function() {
		window.location.href = "../../../main/views/main/main.html";
	});

});