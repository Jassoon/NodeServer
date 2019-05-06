function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

//文案
var words = {
	0: '亲爱的，约会的餐厅我已选好，不见不散',
	1: '我等你很久了，约吗？',
	2: '姐妹们，约起来',
	3: '两只汪，不孤单。走起。'
};
//公共数据
var commonData = {
	appid: 'wx3ec97cb5050f0a27',
	redirect_uri: encodeURIComponent('http://vplus-dev.vip.com/invitationcard-controller/web/index.html'),
	code: getUrlParam('code')
};
//编辑数据
var editData = {
	step: 0,
	openid: '',
	nickname: '',
	headimgurl: '',
	message: '亲爱滴,约会的餐厅我已选好，给你个表现的机会。',
	voice_length: '',
	restaurant_preset: '',
	restaurant_name: '',
	restaurant_addr: '',
	localId: '',
	serverId: '',
	state: ''
};
//展示数据
var showData = {
	step: 0,
	nickname: '',
	headimgurl: '',
	message: '',
	voice: '',
	voice_length: '',
	restaurant_preset: '',
	restaurant_name: '',
	restaurant_addr: '',
	localId: '',
	serverId: '',
	state: getUrlParam('state') || 1110
};
//分享配置数据
var link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + commonData.appid + '&redirect_uri=' + commonData.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=' + showData.state + '#wechat_redirect', // 分享链接
	imgUrl = '图片链接',
	desc = '分享描述',
	title = '分享标题';

var inter = function() {
	var cfg = {
		/**
		 * jssdk初始数据
		 * @return {[type]} [description]
		 */
		config: function() {
			this.url = 'http://vplus-dev.vip.com/invitationcard-controller/api/authorize';
			this.type = 'get';
			this.dataType = 'json';
			this.data = {};
		},
		commit: function() {
			this.url = "http://vplus-dev.vip.com/invitationcard-controller/api/card";
			this.type = 'post';
			this.dataType = "json";
			this.data = {};
		},
		info: function() {
			this.url = 'http://vplus-dev.vip.com/invitationcard-controller/api/card/' + showData.state;
			this.type = 'get';
			this.dataType = 'json';
			this.data = {};
		}
	};

	var inter = {
		ajax: function( data ) {
			return $.ajax(data);
		},
		execute: function( data , callback ) {
			function cb( re ) {
				if(typeof callback == 'object') {
					var func = callback[0],
						pare = callback[1];
					func.call(pare, re);
				} else {
					callback(re);
				}
			}
			this.ajax(data).done(cb);
		},
		/**
		 * 数据混合
		 * @param  {[type]} org       原始数据
		 * @param  {[type]} des       新增数据
		 * @param  {[type]} overwrite 是否覆盖
		 * @return {[type]}           合并数据
		 */
		mix: function( org , des , overwrite ) {
			overwrite = overwrite || 0; 
			for(var k in des) {
				if(!!overwrite || (!overwrite && org[k] == undefined)) {
					org[k] = des[k];
				}
			}
			return org;
		},
		/**
		 * 外部调用入口
		 * @param  {[type]}   index     调用模块
		 * @param  {Function} callback  回调函数
		 * @param  {[type]}   data      ajax请求参数
		 * @param  {[type]}   overwrite data参数是否覆盖存在的同名参数
		 * @param  {[type]}   param data参数是否覆盖存在的同名参数
		 * @return {[type]}             无返回
		 */
		request: function( index , callback , data , overwrite , param ) {
			if( !cfg[index] ) return;
			if(typeof overwrite == 'object') {
				param = overwrite;
				overwrite = 0;
			}
			var obj = new cfg[index];
			if(typeof param == "object") {
				obj = this.mix(obj, param, 1);
			}
			if(typeof data == 'object') {
				obj.data = this.mix( obj.data , data , overwrite );
			}
			this.execute( obj , callback );
		}
	};
	return inter;
}();

var obj = {
	config: function( data ) {
		editData.openid = data.userinfo.openid;
		editData.nickname = data.userinfo.nickname;
		editData.headimgurl = data.userinfo.headimgurl;
		wx.config({
		    debug: false, 									// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: commonData.appid, 						// 必填，公众号的唯一标识
		    timestamp: data.js_config.timestamp, 			// 必填，生成签名的时间戳
		    nonceStr: data.js_config.nonceStr, 				// 必填，生成签名的随机串
		    signature: data.js_config.signature,			// 必填，签名，见附录1
		    jsApiList: [
		    	'startRecord',						//开始录音接口
		    	'stopRecord',						//停止录音接口
		    	'onVoiceRecordEnd', 				//监听录音自动停止接口
		    	'playVoice', 						//播放语音接口
		    	'pauseVoice',						//暂停播放接口
		    	'stopVoice', 						//停止播放接口
		    	'onVoicePlayEnd', 					//监听语音播放完毕接口
		    	'uploadVoice',						//上传语音接口
		    	'downloadVoice', 					//下载语音接口
		    	'getNetworkType'					//获取网络状态接口
		    ] 										// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		$('.doc .user_pic img').attr('src', editData.headimgurl);
	},
	commitVoice: function() {
		wx.uploadVoice({
		    localId: editData.localId, 								// 需要上传的音频的本地ID，由stopRecord接口获得
		    isShowProgressTips: 1, 									// 默认为1，显示进度提示
		    success: function (res) {
		        editData.serverId = res.serverId; 					// 返回音频的服务器端ID
		  		obj.commitData();
		    }
		});
	},
	commitData: function() {
		editData.message = $('#message').val();
		editData.restaurant_preset = nowTab + ',' + tabMap[nowTab].activeLoopIndex;
		if(nowTab == 4 || tabMap[nowTab].activeLoopIndex == 3) {
			editData.restaurant_name = $('#swiper-container' + (nowTab + 1) + ' .other_text li input').eq(0).val();
			editData.restaurant_addr = $('#swiper-container' + (nowTab + 1) + ' .other_text li input').eq(1).val();
		}
		var data = {
			openid: editData.openid,
			nickname: editData.nickname,
			headimgurl: editData.headimgurl,
			style: nowSty,
			message: editData.message,
			voice: editData.serverId,
			voice_length: editData.voice_length,
			restaurant_preset: editData.restaurant_preset,
			restaurant_name: editData.restaurant_name,
			restaurant_addr: editData.restaurant_addr
		};
		inter.request('commit', [this.initLink, this], data);
	},
	initLink: function( data ) {
		editData.state = data.id;
		link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + commonData.appid + '&redirect_uri=' + commonData.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=' + editData.state + '#wechat_redirect'; // 分享链接
		
		imgUrl = editData.headimgurl,
		desc = editData.message,
		title = editData.nickname + '给你发了一张“光棍节”邀请卡';

		shareCard();
	},
	initShow: function( re ) {

		var arr = re.restaurant_preset.split(',');
		var cardMap = {
			0: 'bj',
			1: 'sh',
			2: 'gz',
			3: 'sz'
		};
		var numMap = {
			0: 4,
			1: 4,
			2: 6,
			3: 4,
		}
		if(arr[0] * 1 == 4 || (arr[1] * 1 + 1) == numMap[arr[0]]) {
			$('.eat').hide();
			$('.eat1').show();
			$('.eat1 input').eq(0).val(re.restaurant_name);
			$('.eat1 input').eq(1).val(re.restaurant_addr);
		} else {
			$('.eat').show();
			$('.eat1').hide();
			var imgSrc = 'images/o_' + cardMap[arr[0]] + '_p' + (arr[1] * 1 + 1) + '.jpg';
			$('.eat img').attr('src', imgSrc);
		}
		$('.eat_text span').html(re.sender_nickname);
		document.getElementById("message_show").innerText = re.message;
		$('.doc_show .user_pic img').attr('src', re.sender_headimgurl);

		showData.serverId = re.voice;
		showData.voice_length = re.voice_length;
		setVoiceLen1();
		nowSty = re.style;
		setStyle();

		imgUrl = re.sender_headimgurl,
		desc = re.message,
		title = re.sender_nickname + '给你发了一张“光棍节”邀请卡';

		shareCard();
	},
	init: function() {
		if(showData.state == 0) {			//没东西展示
			//显示编辑页面
			$('.doc_select').show();
			$('.doc_show').hide();
			$('.doc').hide();
		} else {
			//显示展示界面
			$('.doc_show').show();
			$('.doc_select').hide();
			$('.doc').hide();
			inter.request('info', [this.initShow, this]);
		}
		inter.request('config', [this.config, this], {code: commonData.code});
	}
};
obj.init();

function render() {
	if(editData.step == 0) {
		$("#btn").addClass('talk_btn_qian').removeClass('talk_btn_fang').removeClass('talk_btn_zhong').removeClass('talk_btn_hou');
		$("#btn span").html('说点什么吧！点击录音');
	} else if(editData.step == 1) {
		$("#btn").addClass('talk_btn_zhong').removeClass('talk_btn_qian').removeClass('talk_btn_fang').removeClass('talk_btn_hou');
		$("#btn span").html('正在录音，点击停止');
	} else if(editData.step == 2) {
		$("#btn").addClass('talk_btn_hou').removeClass('talk_btn_qian').removeClass('talk_btn_zhong').removeClass('talk_btn_fang');
		$("#btn span").html('');
	} else if(editData.step == 3) {
		$("#btn").addClass('talk_btn_fang').removeClass('talk_btn_qian').removeClass('talk_btn_zhong').removeClass('talk_btn_hou');
		$("#btn span").html('');
	}
}

function render1() {
	if(showData.step == 0) {
		$("#btn1").addClass('talk_btn_zhong').removeClass('talk_btn_fang');
	} else if(showData.step == 1) {
		$("#btn1").addClass('talk_btn_fang').removeClass('talk_btn_zhong');
	}
}

function setStyle() {
	if (nowSty == 0) {
	} else if (nowSty == 1) {
		$(".doc,.doc_show").css("background", "#75bb4b");
		$("#head img").attr("src", "images/p_01_dsg.jpg");
		$("#footer img").attr("src", "images/p_09_dsg.jpg");
	} else if (nowSty == 2) {
		$(".doc,.doc_show").css("background", "#8461de");
		$("#head img").attr("src", "images/p_01_gm.jpg");
		$("#footer img").attr("src", "images/p_09_gm.jpg");
	} else if (nowSty == 3) {
		$(".doc,.doc_show").css("background", "#3cb6ff");
		$("#head img").attr("src", "images/p_01_hjy.jpg");
		$("#footer img").attr("src", "images/p_09_hjy.jpg");
	}
}

//处理录音秒数
function setVoiceLen() {
	$('.talk_cz').show();
	$('.talk_new').show();
	$('#voice_lenght').html(editData.voice_length + '"');
}
//处理录音是否已经播放，去掉小红点
function setVoiceRead() {
	$('.talk_cz').show();
	$('.talk_new').hide();
}

//处理录音秒数
function setVoiceLen1() {
	$('.talk_cz').show();
	$('.talk_new').show();
	$('#voice_lenght1').html(showData.voice_length + '"');
}
//处理录音是否已经播放，去掉小红点
function setVoiceRead1() {
	$('.talk_cz').show();
	$('.talk_new').hide();
}

voice_reset.addEventListener('click', function() {
	$('.talk_cz').hide();
 	editData.step = 0;
	editData.localId = null;
	render();
});

var time1 = null,
	time2 = null;
btn.addEventListener('click', function( e ) {
	if(editData.step == 0) {							//录音前 ，操作：开始录音
		editData.step = 1;
		time1 = new Date();
		wx.startRecord();					
	} else if(editData.step == 1) {						//录音中 ，操作：停止录音
		editData.step = 2;
		wx.stopRecord({
		    success: function (res) {
		        editData.localId = res.localId;
		        time2 = new Date();
		        editData.voice_length = Math.floor((time2 - time1) / 1000);
		        setVoiceLen();
		    }
		});
	} else if(editData.step == 2) {						//播放录音前 ，操作：播放录音
		editData.step = 3;
		wx.playVoice({
		    localId: editData.localId
		});
		wx.onVoicePlayEnd({
		    success: function (res) {
		        editData.step = 2;
		        render();
		    }
		});
		setVoiceRead();
	} else if(editData.step == 3) {						//播放录音中 ，操作：停止播放录音
		editData.step = 2;
		wx.stopVoice({
		    localId: editData.localId
		});
	}
	render();
});

btn1.addEventListener('click', function() {
	setVoiceRead1();

	function play() {
		showData.step = 1;
		wx.playVoice({
		    localId: showData.localId
		});
		wx.onVoicePlayEnd({
		    success: function (res) {
		        showData.step = 0;
		        render1();
		    }
		});
		render1();
	}

	if(showData.localId == '') {						//录音未下载
		wx.downloadVoice({
		    serverId: showData.serverId, 				// 需要下载的音频的服务器端ID，由uploadVoice接口获得
		    isShowProgressTips: 1, 						// 默认为1，显示进度提示
		    success: function (res) {
		        showData.localId = res.localId; 				// 返回音频的本地ID
		        play();
		    }
		});
	}
	if(showData.step == 0) {							//未播放 ，操作：播放录音
		play();
	} else if(showData.step == 1) {								//播放中 操作：停止播放录音
		showData.step = 0;
		wx.stopVoice({
		    localId: showData.localId
		});
		render1();
	}
});

wx.onVoiceRecordEnd({
    complete: function (res) {
        localId = res.localId;
        step = 2;
        render();
        time2 = new Date();
        editData.voice_length = Math.floor((time2 - time1) / 1000);
        setVoiceLen();
    }
});

function shareCard() {
	wx.onMenuShareTimeline({
	    title: title, // 分享标题
	    link: link,
	    imgUrl: imgUrl, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数

	    }
	});

	wx.onMenuShareAppMessage({
	    title: title, // 分享标题
	    desc: desc, // 分享描述
	    link: link, // 分享链接
	    imgUrl: imgUrl, // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}

summit_card.addEventListener('click', function(e) {
	obj.commitVoice();
});

summit_show.addEventListener('click', function(e) {
	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + commonData.appid + '&redirect_uri=' + commonData.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect'
});