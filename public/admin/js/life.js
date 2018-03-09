$(function() {
	function del(_id) {
		location.href = "/admin/program/del?_id=" + _id
	}
	//接受URL地址参数 
	function getQueryString(name) { //name为传入参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	if (getQueryString('page') == null) {
		var page = 1;
	} else {
		var page = getQueryString('page');
	}
	var pageTotal = $('.pageTotal').val();
	var pageCount = Math.ceil(pageTotal / 5);
	$('.M-box').pagination({
		current: page,
		pageCount: pageCount,
		showData: 5,
		totalData: pageTotal,
		homePage: '首页',
		endPage: '末页',
		prevContent: '上页',
		nextContent: '下页',
		callback: function(api) {
			// var data = {
			// 	page: api.getCurrent(),
			// 	name: 'mss',
			// 	say: 'oh',
			// 	size: 5
			// };
			// $.get('/admin/program', data, function(json) {
			// 	console.log(json);
			// });
			console.log(api.getCurrent());
			location.href = "/admin/life?page=" + api.getCurrent() + '&size=5';
		}
	});
})