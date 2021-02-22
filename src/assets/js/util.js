const Utils = {}

Utils.isEmpty = function ($) {
	if( $==null ||  Utils.trim($).length == 0 )
		return true;
	else
		return false;
};

Utils.isShorter = function (_, $) {
	if (_.length < $)
		return true;
	else
		return false;
};

Utils.isInteger = function (_) {
	var $ = RegExp(/^[0-9]+$/);
	return ($.test(_));
};

Utils.isFloat = function (_) {
	var $ = RegExp(/^([0-9]+(\.+))[0-9]+$/);
	return ($.test(_));
};
Utils.isSpecFloat = function (_) {
	var $ = RegExp(/^([1-9]{1}(\.+))[0-9]{1,2}$/);
	return ($.test(_));
};

Utils.isDecimal = function (_) {
	var $ = RegExp(/^([0-9]+(\.?))?[0-9]{1,2}$/);
	return ($.test(_));
};

Utils.isIntChar = function (_) {
	var $ = RegExp(/^[a-zA-Z0-9]+$/);
	return ($.test(_));
};

Utils.isNum = function (_) {
	var $ = RegExp(/^[0-9]+$/);
	return ($.test(_));
};

Utils.isOneNum = function (_) {
	var $ = RegExp(/^[1-9]{1,2}$/);
	return ($.test(_));
};

Utils.isIntCharSpecial = function (_) {
	var $ = RegExp(/^[a-zA-Z0-9(\|)(\_)(\-)(\*)(\&)(\%)(\$)(\#)(\@)(\!)(\~)(\^)(\()(\))]+$/);
	return ($.test(_));
};

Utils.containIntChar = function (_) {
	var $ = RegExp(/[a-zA-Z0-9]+/);
	return ($.test(_));
};

Utils.containSpecial = function (_) {
	var $ = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
	return ($.test(_));
};

Utils.containSpecial2 = function (_) {
	var $ = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
	return ($.test(_));
};

Utils.isEmail = function (_) {
	var $ = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
	return ($.test(_));
};

//判断是否为姓名
Utils.isName = function (_) {
	var $ = RegExp(/^([a-zA-Z]{1,20}|[\u4e00-\u9fff]{2,10})$/);
	return ($.test(_));
};

//判断是否为年份
Utils.isYear = function (_) {
	var $ = RegExp(/^[19]\d{2}$/);
	return ($.test(_));
};

//检查字符串是否为空
Utils.isEmpty = function(s){
	return (s == null || s.length == 0);
};

//判断手机号
Utils.isMobile = function(_) {
	var $ = RegExp(/^1[3456789]\d{9}$/);
	return ($.test(_));
};

//判断验证码
Utils.isCode = function(_) {
	var $ = RegExp(/^\d{6}$/);
	return ($.test(_));
};

//判断语音验证码
Utils.vsCode = function(_) {
	var $ = RegExp(/^\d{4}$/);
	return ($.test(_));
};


//判断身份证号
Utils.isCertno = function(_) {
	var $ = RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
	return ($.test(_));
};

//判断金额(充值金额校验:内容为金额、不能为负数、保留两位小数)
Utils.isAmount = function(_) {
	var $ = RegExp(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/);
	return ($.test(_));
};

//判断金额
Utils.isMoney = function(_) {
	var $ = RegExp(/^([1-9][\d]{0,8}|0)(\.[\d]{1,2})?$/);
	return ($.test(_));
};

//判断金额是整数
Utils.isMoney_int = function(_) {
  var $ = RegExp(/^([1-9][\d]{0,12})$/);
  return ($.test(_));
};
// 判断银行卡号位数
Utils.cardNum = function (_) {
  var $ = RegExp(/^(\d{6,24})$/);
  return ($.test(_));
}
// 
Utils.unicode2string = function (val) {
	val = parseInt(val)
	return String.fromCharCode(65 + val)
},
// 处理ios12、微信6.7.4+ 软键盘不自动收回的问题
Utils.closeKeyboard = function () {
	var wechatInfo = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
	console.log('微信浏览器信息:', wechatInfo)
	console.log('操作系统：', navigator.appVersion)
	// window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
	if (!wechatInfo) {
		return
	}
	var wechatVersion = wechatInfo[1].replace(/\./g, '');
	var sysVersion = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)[1];
	console.log('wechatVersion:', wechatVersion);
	console.log('iosVersion:', sysVersion);
	if ((parseInt(wechatVersion) >= 674) && (parseInt(sysVersion) >= 12)) {
		console.log('6.7.4 + 12?')
		// window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
		window.scrollTo(0, 0);
	}
}
export default Utils
