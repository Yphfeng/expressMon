$(function(){
	$('#loginForm').validate({
		submitHandler: function(form){
			form.submit();
		},
		rules:{
			name:'required',
			password: {
				required: true,
				minlength: 8
			}
		},
		messages: {
			name:'请输入用户名',
			password: {
				required: '请输入密码',
				minlength: '密码不能小于8个字符'
			}
		}
	})
})