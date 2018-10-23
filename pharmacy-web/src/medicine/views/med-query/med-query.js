// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
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
	var medicine = null;
	var $table;
	$table = $('#table');

	init();

	function init() {
		initData();
	}

	function initData() {
		$('#table').bootstrapTable({
			type: "get",
			url: "http://localhost:9080/PharmacyManage/api/medicine/getList",
			striped: true,
			pagination: true,
			pageSize: 10,
			pageNumber: 1,
			pageList: [10, 20, 50, 100, 200, 500],
			search: true,
			clickToSelect: true,
			columns: [{
					field: 'checked',
					checkbox: true,
				}, {
					field: "name",
					title: "药品名称",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "description",
					title: "药品描述",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "medCount",
					title: "库存数量",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "price",
					title: "售价",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "category.name",
					title: "所属类别",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: 'operate',
					title: '操作',
					align: 'center',
					events: 'operateEvents',
					valign: "middle",
					sortable: "true",
					formatter: operateFormatter
				}
			],
			onPageChange: function(size, number) {}
		});
		//						$("#tbody").html("");
		//						$.ajax({
		//							type: "get",
		//							url: "http://localhost:8080/PharmacyManage/api/medicine/getList",
		//							success: function(result) {
		//								var myArray = new Array();
		//								dataFromDb = JSON.parse(result);
		//								console.log(result);
		//								for(var i in dataFromDb) {
		//									var d = dataFromDb[i];
		//									$("#tbody").append('<tr class="success" id="tr"><td>' + d.name + '</td><td>' + d.description + '</td><td>' + d.factoryAdd + '</td><td>' + d.price + '</td><td>' + d.medCount + '</td><td>' + d.createTime + '</td></tr>')
		//								}
		//							}
		//						});
	}

	function operateFormatter(value, row, index) {
		return [
			'<button type="button" class="order btn btn-default  btn-sm" style="margin-right:15px;">进货</button>',
			'<button type="button" class="sell btn btn-default  btn-sm" style="margin-right:15px;">销售</button>'
		].join('');
	}
	window.operateEvents = {
		'click .order': function(e, value, row, index) {
			var medicine = $table.bootstrapTable('getSelections');
			if(medicine.length == 1) {
				console.log(medicine[0].medNo);
			} else {
				alert("请选中一行")
			}
			window.location.href = "../med-add/med-add.html?medNo=" + medicine[0].medNo;
		},
		'click .sell': function(e, value, row, index) {
			var medicine = $table.bootstrapTable('getSelections');
			if(medicine.length == 1) {
				console.log(medicine[0].id);
			} else {
				alert("请选中一行")
			}
			window.location.href="../../../sell/views/sell/sell.html?id=" + medicine[0].id;
		}
	}
	$('#view').click(function() {
		initData();
	});
	$('#add').click(function() {
		window.location.href = "../med-add/med-add.html";
	});

	$('#edit').click(function() {
		var medicine = $table.bootstrapTable('getSelections');
		if(medicine.length == 1) {
			console.log(medicine[0].id);
		} else {
			alert("请选中一行")
		}
		window.location.href = "../med-edit/med-edit.html?id=" + medicine[0].id;
	});

	$('#delete').click(function() {
		var ids = $.map($table.bootstrapTable('getSelections'), function(row) {
			return row.id;
		});
		$table.bootstrapTable('remove', {
			field: 'id',
			values: ids
		});
		$.ajax({
			type: "DELETE",
			url: "http://localhost:9080/PharmacyManage/api/medicine/delMedicine" + "/" + ids,
			success: function(result) {
				alert("删除成功");
			}
		});
	});

	$('#returnMain').click(function() {
		window.location.href = "../../../main/views/main/main.html";
	});

});