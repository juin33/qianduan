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
			url: "http://localhost:9080/PharmacyManage/api/category/getCategoryList",
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
					title: "药品类别",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "description",
					title: "类别描述",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "createTime",
					title: "创建时间",
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
	$('#view').click(function() {
		initData();
	});

	$('#add').click(function() {
		window.location.href = "../category-add/category-add.html";
	});
	
	$('#edit').click(function() {
		var category = $table.bootstrapTable('getSelections');
		if(category.length == 1) {
			console.log(category[0].id);
		} else {
			alert("请选中一行")
		}
		window.location.href = "../category-edit/category-edit.html?id=" + category[0].id;
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
			url: "http://localhost:9080/PharmacyManage/api/category/delCategory" + "/" + ids,
			success: function(result) {
				alert("删除成功");
			}
		});
	});

	$('#returnMain').click(function() {
		window.location.href = "../../../main/views/main/main.html";
	});

});