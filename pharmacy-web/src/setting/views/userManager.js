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
			url: "http://localhost:9080/PharmacyManage/api/user/list",
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
					field: "username",
					title: "用户名",
					align: "center",
					valign: "middle",
					sortable: "true"
				},
				{
					field: "dept",
					title: "部门",
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
	$('#add').click(function() {
		window.location.href = "../../main/views/register/register.html";
	});
	
	$('#edit').click(function() {
		var user = $table.bootstrapTable('getSelections');
		if(user.length == 1) {
			console.log(user[0].id);
		} else {
			alert("请选中一行")
		}
		window.location.href ="editPsw/editPsw.html?id=" + user[0].id;
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
			url: "http://localhost:9080/PharmacyManage/api/user/del" + "/" + ids,
			success: function(result) {
				alert("删除成功");
			}
		});
	});
	
	$('#quit').click(function() {
		window.location.href ="../../main/views/login/login.html";
	});

	$('#returnMain').click(function() {
		window.location.href ="../../main/views/main/main.html";
	});

});